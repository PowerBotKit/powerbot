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

function fetchTopologicalSorting(targets) {
	const nodes = new Map();
	targets.forEach(target => {
		const { name, dependencies } = target;
		if (!nodes.has(name)) {
			nodes.set(name, { target, indegree: 0, afters: [] });
		}
		const keys = Object.keys(dependencies).filter(dependency =>
			dependency.startsWith('@powerbotkit')
		);

		keys.forEach(key => {
			if (!nodes.has(key)) {
				nodes.set(key, {
					target: targets.find(t => t.name === key),
					indegree: 0,
					afters: []
				});
			}
			nodes.get(name).indegree = nodes.get(key).indegree + 1;
			nodes.get(key).afters.push(target);
		});
	});
	return nodes;
}

function buildTarget(target) {
	if (target.scripts && target.scripts.build) {
		console.log(
			`${chalk.blue(target.name)}: $ ${chalk.cyan(target.scripts.build)}`
		);
		shelljs.cd(target.location).exec(target.scripts.build);
		console.log(`${chalk.blue(target.name)} ${chalk.green('success')} 🚀`);
	} else {
		console.log(
			`${chalk.blue(target.name)} ${chalk.cyan('skip')} for no build script`
		);
	}
}

async function run() {
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
			buildTarget(node.target);
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
