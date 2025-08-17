import antfu from '@antfu/eslint-config'

export default antfu({
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
})
