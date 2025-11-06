module.exports = {
  // TypeScript and JavaScript files
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],

  // JSON, Markdown, CSS, and other config files
  '*.{json,md,mdx,css,html,yml,yaml,scss}': [
    'prettier --write',
  ],

  // TypeScript type checking (only for TS files)
  '**/*.ts?(x)': () => 'pnpm run type-check',
};
