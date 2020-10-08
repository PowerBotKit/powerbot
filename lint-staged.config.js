const path = require('path');

module.exports = {
	'*.ts?(x)': filenames => {
		const tslint =
			filenames.length > 10
				? 'yarn lint'
				: `tslint --format verbose ${filenames.join(' ')}`;
		const prettier = `prettier --parser=typescript --write -- ${filenames.join(
			' '
		)}`;
		const git = `git add ${filenames.join(' ')}`;
		return [tslint, prettier, git];
	},
	'*.{md,json,js}': filenames => {
		const prettier = `prettier --write -- ${filenames.join(' ')}`;
		const git = `git add ${filenames.join(' ')}`;
		return [prettier, git];
	}
};
