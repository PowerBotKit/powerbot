import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import path from 'path';
import pkg from './package.json';

const paths = {
	input: path.join(__dirname, 'index.ts'),
	output: path.join(__dirname, '/dist')
};

const packageConfigs = pkg.buildOptions.formats.map(format => {
	return {
		input: paths.input,
		output: {
			file: path.join(
				paths.output,
				`index.${format === 'cjs' ? '' : format}.js`
			),
			name: pkg.name,
			format
		},
		external: ['botbuilder'],
		plugins: [commonjs(), typescript()]
	};
});

export default packageConfigs;
