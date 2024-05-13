# Hayato's new 2024 Portfolio

- After many years of having a disappointing, quickly-made portfolio, I have decided to create a proper one which I will be proud of.
- While the portfolio should technically be just HTML/CSS, I am also using this as an opportunity to improve the relevant skills for my job. That's why my tech stack is really overkill for such a small project.

### Stack:

- Vite
- Styled Components
- Zod
- React Hook Form
- Typescript
- Redux Toolkit
- Axios
- Vitest
- Dayjs

---

### TODOS:

- [] Update Movie-Lab's upcoming movies to update properly
- [] Update outing app to have a proper demo version
- [] Finish the party-stream app

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
