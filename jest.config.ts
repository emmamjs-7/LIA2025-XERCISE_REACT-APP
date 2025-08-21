import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,

    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },

    transformIgnorePatterns: [
        'node_modules/(?!(axios|react-router-dom)/)',

    ],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs",
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};

export default config;
