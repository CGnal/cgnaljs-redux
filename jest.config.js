module.exports = {
    clearMocks: true,
    resetMocks: false,
    collectCoverageFrom: ["src/**/*.js", "!**/{__tests__,__mocks__}/**"],
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    moduleNameMapper: {
        "@cgnal/([^/]+)/(.+)": "<rootDir>/node_modules/@cgnal/$1/src/$2"
    },
    rootDir: ".",
    testEnvironment: "node",
    testRegex: "(/__tests__/.+\\.(test|spec))\\.js$",
    transformIgnorePatterns: ["node_modules/(?!@cgnal)"],
    verbose: false,
    watchPathIgnorePatterns: ["<rootDir>/node_modules/"]
};
