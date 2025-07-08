# Saqaya Ecommerce app
A modern eCommerce frontend built with **Vue 3**, **TypeScript**, **Pinia**, and **Vue Router**. This app is designed with scalability, reusability, and performance in mind, showcasing product listings, cart functionality, and a responsive layout.

## Project Structure

```bash
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # UI components
│   │   ├── products/
│   │   ├── ProductsModal/
│   ├── data/               # Product/entity models
│   ├── shared/
|   |---|--components/        # UI components
│   │   ├──-- atoms/
│   │   ├──-- molecules/
│   │   ├──-- organisms/
|   |---|--store/           #pinina store
│   ├── pages/              # Page views
│   ├── router/             # Vue Router config
│   ├── tests/              # Unit tests (Vitest)
│   ├── App.vue             # Root component
│   └── main.ts             # App bootstrap
├── vite.config.ts          # Vite config
└── package.json



## Components and functionality
#### Layout 
- Layout consists of Header and Footer, it Ensures all app content is placed between them
- <router-view /> dynamically renders route components in the main content area.
