module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended'
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'semi': ['error', 'always'],
		'semi-spacing': ['error', {'after': true, 'before': false}],
		'semi-style': ['error', 'last'],
		'no-extra-semi': 'error',
		'no-unexpected-multiline': 'error',
		'no-unreachable': 'error',
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'space-before-function-paren': ['error', 'always']
	}
};
