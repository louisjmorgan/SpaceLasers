module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ], // finds test
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  modulePaths: [
    '<rootDir>/src',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFiles: [
    'react-app-polyfill/jsdom',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
};
