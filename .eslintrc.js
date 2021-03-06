module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2019, // Node.js 12の場合は2019、他のバージョンのNode.jsを利用している場合は場合は適宜変更する
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.eslint.json']
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    rules: {
        "@typescript-eslint/no-floating-promises": 1,
        "@typescript-eslint/no-unsafe-assignment": 1,
        "@typescript-eslint/no-unsafe-member-access": 1,
        "@typescript-eslint/no-unsafe-call": 1,
        "@typescript-eslint/no-var-requires": 1
    }
};
