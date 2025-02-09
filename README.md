# Figma Component Filter Plugin

This Figma plugin allows users to filter and select components in their Figma files based on name and type. It's built using React, Vite, Tailwind CSS, and Radix UI, providing a modern and accessible user interface.

## Features

-   Filter components by name
-   Filter components by type (All, Components, or Instances)
-   Select and zoom to filtered components in the Figma canvas

## Project Structure

```mermaid
graph TD
    A[Project Root] --> B[src]
    A --> C[public]
    A --> D[package.json]
    A --> E[vite.config.ts]
    A --> F[tailwind.config.js]
    A --> G[postcss.config.js]
    A --> H[tsconfig.json]
    A --> I[manifest.json]
    B --> J[main.tsx]
    B --> K[App.tsx]
    B --> L[code.ts]
    B --> M[index.css]
```

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
	languageOptions: {
		// other options...
		parserOptions: {
			project: ['./tsconfig.node.json', './tsconfig.app.json'],
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
```

-   Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
-   Optionally add `...tseslint.configs.stylisticTypeChecked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
	// Set the react version
	settings: { react: { version: '18.3' } },
	plugins: {
		// Add the react plugin
		react,
	},
	rules: {
		// other rules...
		// Enable its recommended rules
		...react.configs.recommended.rules,
		...react.configs['jsx-runtime'].rules,
	},
});
```
