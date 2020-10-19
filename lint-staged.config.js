const path = require('path');

module.exports = {
	'*.ts?(x)': filenames => {
		const tslint =
			filenames.length > 10
				? 'yarn tslint'
				: `tslint --format verbose ${filenames.join(' ')}`;
		const prettier = 'prettier --parser=typescript --write **/*.ts';
		const git = `git add ${filenames.join(' ')}`;
		return [tslint, prettier, git];
	},
	'*.js': filenames => {
		const prettier = 'prettier --write **/*.js';
		const git = `git add ${filenames.join(' ')}`;
		return [prettier, git];
	}
};
