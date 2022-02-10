// Copyright (c) 2020-present PowerBotKit Team
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const colors = require('colors/safe');
const shelljs = require('shelljs');
const path = require('path');

const { fetchTargets, fetchTopologicalSorting } = require('./utils');

function publishNpm(target) {
	try {
		if (target.private === true) {
			console.log(
				`${colors.red(target.name)} is ${colors.cyan(
					'private'
				)}, ${colors.green('skip')}`
			);
		} else {
			doPublishNpm(target);
		}
	} catch (err) {
		console.log(
			`failed to puslish ${colors.red(target.name)}@${colors.brightYellow(
				target.version
			)}, error: ${colors.blue(err.message)}`
		);
	}
}

function doPublishNpm(target) {
	console.log(
		`build ${colors.red(target.name)}@${colors.yellow(target.version)}`
	);
	const packagePath = path.join(__dirname, '..', 'dist', target.folderName);
	console.log(packagePath);
	shelljs.cd(packagePath).exec('npm publish');
	console.log(
		`puslish ${colors.red(target.name)}@${colors.brightYellow(
			target.version
		)} ${colors.green('successfully')}`
	);
}

async function run() {
	const targets = fetchTargets();
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
			publishNpm(node.target);
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
