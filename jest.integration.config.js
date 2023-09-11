module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",

  testMatch: ['**/*.integration.spec.ts'],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"]
  },
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
    "vue"
  ],

  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    '^.+\\.(js|jsx|mjs|cjs)$': 'babel-jest',
    '^.+\\.ts': 'ts-jest',
  },
  moduleNameMapper: {
    "@vueuse/integrations/useCookies": "<rootDir>/node_modules/@vueuse/integrations/useCookies.cjs",
    "axios": "axios/dist/node/axios.cjs",
    "^vuetify/components$": "<rootDir>/node_modules/vuetify/lib/components/index.mjs",
    "^vuetify/directives$": "<rootDir>/node_modules/vuetify/lib/directives/index.mjs",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1"
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transformIgnorePatterns: [
    '/node_modules/(?!(vuetify)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
};
