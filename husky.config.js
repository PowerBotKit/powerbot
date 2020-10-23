const tasks = arr => arr.join(' && ');

module.exports = {
	hooks: {
		'pre-push': tasks(['yarn tslint', 'yarn audit']),
		'pre-commit': tasks(['ls-lint', 'lint-staged']),
		'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
	}
};
