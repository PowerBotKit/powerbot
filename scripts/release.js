// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const semver = require('semver');
const { exec, set } = require('shelljs');
const currentVersion = require('../package.json').version;
const { prompt } = require('enquirer');
const path = require('path');
const fs = require('fs');

const { fetchTargets, fetchTopologicalSorting } = require('./utils');

const preId =
	args.preId ||
	(semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]);

const isDryRun = !!args.dry;

const versionIncrements = [
	'patch',
	'minor',
	'major',
	...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : [])
];

const inc = i => semver.inc(currentVersion, i, preId);

const realRun = command => exec(command);
const dryRun = command => console.log(chalk.blue(`[dry run]: ${command}`));

const run = isDryRun ? dryRun : realRun;

const step = msg => console.log(chalk.cyan(msg));

const fetchTargetVersion = async () => {
	let targetVersion = args._[0];
	if (!targetVersion) {
		const { release } = await prompt({
			type: 'select',
			name: 'release',
			message: 'Select release version',
			choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat('custom')
		});

		if (release === 'custom') {
			targetVersion = (
				await prompt({
					type: 'input',
					name: 'version',
					message: 'Input custom version',
					initial: currentVersion
				})
			).version;
		} else {
			targetVersion = release.match(/\((.*)\)/)[1];
		}
	}

	if (!semver.valid(targetVersion)) {
		throw new Error(`invalid target version: ${targetVersion}`);
	}

	return targetVersion;
};

const confirmUpdateTargetVersion = async (targetVersion, targets) => {
	targets.forEach(target => {
		console.log(
			`${chalk.blue(target.name)}@${chalk.cyan(target.version)} => ${chalk.red(
				'v' + targetVersion
			)}`
		);
	});
	const { yes } = await prompt({
		type: 'confirm',
		name: 'yes',
		message: `Releasing v${targetVersion}. Confirm?`
	});

	return yes === true;
};

const updatePackageVersion = (pkgPath, version) => {
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
	pkg.version = version;
	if (isDryRun) {
		console.log(`${chalk.bgCyan(pkg.name + '@' + pkg.version)}`);
	} else {
		fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
	}
};

const updatePackageDeps = (pkgPath, version) => {
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
	const { dependencies } = pkg;
	Object.keys(dependencies)
		.filter(dependency => dependency.startsWith('@powerbotkit'))
		.forEach(dependency => {
			dependencies[dependency] = version;
		});
	if (isDryRun) {
		console.log(`${chalk.bgCyan(pkg.name + '@' + pkg.version)}`);
		console.log(pkg);
	} else {
		fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
	}
};

const updateRootPackage = targetVersion => {
	// root
	updatePackageVersion(
		path.resolve(__dirname, '..', 'package.json'),
		targetVersion
	);
	// TODO: lerna, will be remove
	updatePackageVersion(
		path.resolve(__dirname, '..', 'lerna.json'),
		targetVersion
	);
};

const updatePackages = (targetVersion, targets) => {
	// update root package
	updateRootPackage(targetVersion);
	targets.forEach(target => {
		target.version = targetVersion;
		updatePackageVersion(
			path.resolve(target.location, 'package.json'),
			targetVersion
		);
		updatePackageDeps(
			path.resolve(target.location, 'package.json'),
			targetVersion
		);
	});
};

async function main() {
	const targetVersion = await fetchTargetVersion();
	const targets = fetchTargets();
	// const nodes = fetchTopologicalSorting(targets);
	if (!(await confirmUpdateTargetVersion(targetVersion, targets))) {
		return;
	}

	step('\n run unit test');
	run('yarn test:ci');

	step(`\n run build`);
	run('node scripts/build.js');

	step('\n update version');
	updatePackages(targetVersion, targets);

	step('\n gentreate changelog');
	run('yarn changelog');

	step('\n commit');
	run('git add package.json lerna.json');
	targets.forEach(target =>
		run(`git add ${path.resolve(target.location, 'package.json')}`)
	);
	run(`git add CHANGELOG.md`);
	run(`git commit -m "chore(release): v${targetVersion}"`);

	step('\n tag');
	run(`git tag "v${targetVersion}"`);

	step(`\n publish github`);
	run(`git push origin develop`);
	run(`git push origin v${targetVersion}`);
}

if (require.main === module) {
	main();
}
