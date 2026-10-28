import antfu from '@antfu/eslint-config'
import css from '@zinkawaii/eslint-config-css'

export default antfu({
	pnpm: false,
	stylistic: {
		indent: 'tab',
	},
	// @keep-sorted
	rules: {
		'jsonc/indent': ['error', 2],
		'vue/block-lang': ['warn', {
			script: { lang: ['ts', 'tsx'] },
		}],
		'vue/enforce-style-attribute': ['warn', { allow: ['scoped'] }],
		'vue/html-indent': ['error', 'tab', { baseIndent: 0 }],
		'vue/singleline-html-element-content-newline': ['error', {
			// @keep-sorted
			externalIgnores: ['ZLink', 'ZRawLink'],
		}],
		'yaml/indent': ['error', 2],
	},
}, {
	files: ['**/*.json'],
	rules: {
		'style/eol-last': ['warn', 'never'],
	},
}).append(css, {
	files: ['**/*.css'],
	rules: {
		'css-stylistic/indentation': ['error', 'tab'],
	},
}).setDefaultIgnores(previous => [...previous, '**/*.css'])
