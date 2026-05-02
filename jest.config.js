'use strict';

module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.globals.js'],
    setupFilesAfterEnv: ['./jest.setup.matchers.js'],
    testMatch: ['**/tests/specs/**/*_spec.js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
};
