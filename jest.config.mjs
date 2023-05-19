import nextJest from 'next/jest.js';

/** @see {@link https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library} */

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
        '<rootDir>/e2e'
  ],
};

export default createJestConfig(config);
