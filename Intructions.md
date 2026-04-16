# Frontend Starter Template for SIT HelloWorld 2026 Project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Project Structure Guideline

```
vue-app/
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── api/                # All API-related code
│   ├── assets/             # Images, fonts, global styles
│   ├── components/         # Reusable UI components
│   ├── views/              # Page-level components
│   ├── router/             # Vue Router config
│   ├── stores/             # State management (Pinia/Vuex)
│   ├── composables/        # Reusable logic (hooks)
│   ├── services/           # API calls / external services
│   ├── utils/              # Helper functions
│   ├── App.vue             # Root component
│   └── main.js             # Entry point
├── package.json
└── vite.config.js
```

## Branching Strategy

Do **not** push every change directly to the `main` branch.  
This may overload the build server.

Recommended workflow:

- Use a development branch such as `dev` or `development`
- Commit and test your changes there
- Once your code is production-ready, merge it into `main`

After merging to `main`, your project will be built and available at: https://hw26.sit.kmutt.ac.th/app/teams/your_team_name

## Support

If you have any questions or run into issues, please contact your mentor for assistance.

## For Backend API Integration

`${import.meta.env.API_BASE_URL || ''}`

as the base URL for all API calls.

Example:

```js
fetch(`${import.meta.env.API_BASE_URL || ''}/users`)
```

---

Enjoy coding and have a great day! ChatGPT is your best friend 😄
