// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const shelljs = require('shelljs');

async function runParallel(maxConcurrency, source, iteratorFn) {
	const ret = [];
	const executing = [];
	for (const item of source) {
		const p = Promise.resolve().then(() => iteratorFn(item, source));
		ret.push(p);

		if (maxConcurrency <= source.length) {
			const e = p.then(() => executing.splice(executing.indexOf(e), 1));
			executing.push(e);
			if (executing.length >= maxConcurrency) {
				// eslint-disable-next-line no-await-in-loop
				await Promise.race(executing);
			}
		}
	}
	return Promise.all(ret);
}

function fetchTargets() {
	return fs
		.readdirSync('packages')
		.filter(f => fs.statSync(`packages/${f}`).isDirectory())
		.map(f => {
			const pkg = require(path.join(
				__dirname,
				'..',
				'packages',
				f,
				'package.json'
			));
			pkg.location = path.join(__dirname, '..', 'packages', f);
			return pkg;
		});
}

function publishNpm(target) {
	try {
		console.log(
			`build ${chalk.red(target.name)}@${chalk.yellow(target.version)}`
		);
		shelljs.cd(target.location).exec('yarn build');
		shelljs.cd(target.location).exec('npm publish');
		console.log(
			`puslish ${chalk.red(target.name)}@${chalk.yellowBright(
				target.version
			)} ${chalk.green('successfully')}`
		);
	} catch (err) {
		console.log(
			`failed to puslish ${chalk.red(target.name)}@${chalk.yellowBright(
				target.version
			)}, error: ${chalk.blue(err.message)}`
		);
	}
}

async function run() {
	const targets = fetchTargets();
	targets.forEach(target => {
		if (target.private === true) {
			console.log(
				`${chalk.red(target.name)} is ${chalk.cyan('private')}, ${chalk.green(
					'skip'
				)}`
			);
		} else {
			// console.log(`publish ${chalk.red(target.name)}: ${target.location}`);
			publishNpm(target);
		}
	});
}

if (require.main === module) {
	run();
}
