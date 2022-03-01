// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const colors = require('colors/safe');
const fs = require('fs/promises');
const fsEx = require('fs-extra');
const path = require('path');

const shelljs = require('shelljs');

const { fetchTargets, fetchTopologicalSorting } = require('./utils');

function buildES6(target) {
	const { code } = shelljs.exec(
		`yarn tsc --project ${path.join(
			target.location,
			'tsconfig.json'
		)} --outDir ${path.resolve('./dist', target.folderName, 'lib')}`
	);

	if (code !== 0) {
		throw new Error(`fail to compile the ${target.name}`);
	}
}

function buildCommonjs(target) {
	const { code } = shelljs.exec(
		`yarn tsc --project ${path.join(
			target.location,
			'tsconfig.json'
		)} --outDir ${path.resolve(
			'./dist',
			target.folderName,
			'src'
		)} --module commonjs`
	);

	if (code !== 0) {
		throw new Error(`fail to compile the ${target.name}`);
	}
}

async function updatePackageJson(target) {
	const packageJsonPath = `${path.resolve(
		'./dist',
		target.folderName,
		'package.json'
	)}`;
	const json = await fsEx.readJson(packageJsonPath);
	json.main = './src/index.js';
	json.types = './src/index.d.ts';
	json.module = './lib/index.js';
	await fsEx.writeJson(packageJsonPath, json, { spaces: 2 });
}

async function buildTarget(target) {
	if (target.private !== true) {
		buildES6(target);
		buildCommonjs(target);
		const files = ['package.json', 'README.md', 'LICENSE'];
		const copyTasks = files
			.map(file => {
				return {
					src: path.join(target.location, file),
					dest: path.resolve('./dist', target.folderName, file)
				};
			})
			.map(f => fs.copyFile(f.src, f.dest));
		await Promise.all(copyTasks);
		console.log(`${colors.blue(target.name)} ${colors.green('success')} 🚀`);
		updatePackageJson(target);
		await fs.rm(`${path.resolve('./node_modules/' + target.name)}`, {
			force: true,
			recursive: true
		});
		await fsEx.copy(
			path.resolve('./dist', target.folderName),
			path.resolve('./node_modules/' + target.name)
		);
	} else {
		console.log(
			`${colors.blue(target.name)} ${colors.cyan('skip')} for private module`
		);
	}
}

async function run() {
	await fs.rm(`${path.resolve('./dist')}`, { force: true, recursive: true });
	const targets = await fetchTargets();
	const nodes = fetchTopologicalSorting(targets);
	const queue = [];
	nodes.forEach((v, k) => {
		if (v.indegree === 0) {
			queue.push(k);
		}
	});
	while (queue.length > 0) {
		const name = queue.shift();
		const node = nodes.get(name);
		if (node && node.target) {
			try {
				await buildTarget(node.target);
			} catch (e) {
				console.error(e.message);
				shelljs.exit(2);
			}

			node.afters.forEach(a => {
				nodes.get(a.name).indegree--;
				if (nodes.get(a.name).indegree === 0) {
					queue.push(a.name);
				}
			});
		}
	}
	shelljs.exit(0);
}

if (require.main === module) {
	run();
}
