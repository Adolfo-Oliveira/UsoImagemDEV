module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'linebreak-style': 'off',
        'no-plusplus': 'off',
        'no-console': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'class-methods-use-this': 'off',
    },
};