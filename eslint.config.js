'use strict';

const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'script',
            globals: {
                ...globals.browser,
            },
        },
    },
    {
        files: ['tests/specs/**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...globals.jquery,
                ...globals.jest,
                jasmine: 'readonly',
                loadFixtures: 'readonly',
                setupContext: 'readonly',
                spyOnEvent: 'readonly',
            },
        },
    },
];
