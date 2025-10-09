# Rapa Nui Website

This repository contains the Rapa Nui website, built with SvelteKit and powered by Vite, managed with npm.

SvelteKit is a full-stack application framework for Svelte that provides routing, server-side rendering, and modern web app primitives. Vite is a fast build tool and dev server that optimizes development and production builds. npm is the Node.js package manager used here to install dependencies and run project scripts.

## Requirements

- Node.js 20 LTS (matches CI). Use `nvm` or your preferred manager.
- npm 10+ recommended.

## Commands

- `npm install`: install dependencies
- `npm run dev`: start the dev server
- `npm run build`: create a production build
- `npm run preview`: preview the production build
- `npm run check`: Svelte + TypeScript checks
- `npm run lint`: Prettier check and ESLint (matches CI)
- `npm run format`: auto-format with Prettier
- `npm run check:watch`: run type checks in watch mode

## Contributing

Below are the guidelines to follow when contributing; let's try to stick to them:

Branch names should follow `name_of_contributor/name_of_feature` (e.g., `max/tooltips-to-pruebas`).
There is a CI that must pass before merge (type check, lint, build). Also CodeRabbit will review your open a PR so see what it says along with one of the other devs review.

We will try our best to follow clean code practices (https://blog.codacy.com/what-is-clean-code#WhatIsCleanCode) and Conventional Commits (https://www.conventionalcommits.org/en/v1.0.0/). Keep the code readable, focused, and typed where possible. Run `npm run check` and `npm run lint` before pushing; `npm run lint` already verifies formatting with Prettier. Use `npm run format` if you need to apply formatting changes.

Also, please run `npm audit` every so often (for example, once a month or when updating dependencies) and fix issues when reasonable. When dependencies change, commit the updated `package-lock.json` so everyone and CI install the same versions. You can use `npm outdated` to see what can be updated and prefer patch/minor updates when possible. In the future this will be automated but for now its worth mentioning.
