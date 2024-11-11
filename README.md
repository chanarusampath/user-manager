# User Manager

## Table of Contents

- [Project Description](#features)
- [Architecture](#features)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)

## Project Description

User Manager is a modern web application built using React, Vite, and TypeScript, designed to provide a smooth interface for managing user information within an organization. Leveraging a component-based architecture and React’s powerful rendering capabilities, the app offers a robust and interactive platform for adding, editing, viewing, and deleting users with a focus on usability and performance.

The project uses Redux Toolkit and RTK Query to handle state management efficiently. Redux Toolkit is used to store and manage application states such as the currently selected user, modals for creating and updating user data, and the overall state of user data fetched from the server. This approach ensures that the application’s core data, like user lists and modal states, is centrally managed, making it easy to maintain, debug, and extend.

The user data is served by a mock API created with json-server, providing realistic API endpoints to support the core functionalities of viewing, adding, updating, and deleting users. This setup helps simulate real-world scenarios in development without the need for a full backend.

## Architecture

The application architecture has been designed to ensure a clean, modular, and scalable codebase. Key aspects of the architecture include:

1. Frontend - ReactJS
   The user interface is built with ReactJS, utilizing a component-based architecture that promotes reusability and maintainability.
   Each page and UI feature, such as the user list, user creation and editing forms, and modals, is developed as independent components.
   React’s powerful hooks, like useState, useEffect, and custom hooks, enable the application to handle UI state and lifecycle methods seamlessly.
2. State Management - Redux Toolkit & RTK Query
   Redux Toolkit is used for application-wide state management. It provides a structured approach to managing UI and data states, ensuring that changes in one part of the application are reflected across the entire app.
   RTK Query, an advanced data-fetching and caching solution, is used to handle API interactions. It manages the asynchronous logic for fetching, caching, and updating user data, making the application’s data layer efficient and performant.

   **The Redux store is configured with the following slices:**

- User API State: Managed using RTK Query, this state handles all server interactions for user data, including fetch, add, update, and delete operations.
- Selected User State: Holds the information of the user currently selected for viewing or editing. This state makes it easy to pass user data across components without prop-drilling.
- Create and Update Modal State: Stores the visibility state of the modals used for creating and updating user data. This state ensures a smooth, modal-based user experience across different parts of the app.

3. UI Styling - Tailwind CSS
   Tailwind CSS is used for styling the components, allowing a utility-first approach to design that makes the UI customizable and responsive.
   This approach keeps the codebase clean and ensures that the styles are encapsulated within components, which helps avoid global style conflicts.
4. Data Presentation - @tanstack/react-table
   The application leverages @tanstack/react-table for rendering user data in a tabular format, providing flexible table functionalities such as sorting, pagination, and filtering.
   This library is headless, meaning it only provides the core table logic, which is then styled with Tailwind CSS, giving complete control over the look and feel.
5. Icons - Lucide React
   Lucide React icons are integrated into the UI for a consistent and visually appealing iconography across the application. They enhance the user experience by adding visual cues to actions and features.
6. Mock API - json-server
   For development and testing, json-server is used to create a mock API that simulates backend endpoints. This setup allows for realistic API calls, helping developers test the app’s core features without needing a live server.
   This API mockup can easily be replaced with a production server in the future with minimal changes to the data layer, thanks to RTK Query’s adaptable architecture.

## Features

- **User List**: View a list of users with essential details.
- **Add User**: Add new users to the list with form validation.
- **Edit User**: Edit existing user details.
- **Search**: Quickly find users by name. and this only support full match.

## Technologies

This application is built with the following technologies:

- [Vite](https://vitejs.dev/) - Fast build tool for frontend development.
- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript for type safety.
- [Redux](https://redux.js.org/) - State management library.
- [React-Redux](https://react-redux.js.org/) - Official bindings for Redux with React.
- [Redux Toolkit](https://redux-toolkit.js.org/) - Simplified and structured way to use Redux.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- [json-server](https://github.com/typicode/json-server) - Simple mock API for testing data interactions.
- [@tanstack/react-table](https://tanstack.com/table/v8) - Headless utility for building fast and flexible tables and data grids.
- [Lucide React](https://lucide.dev/) - A set of beautiful, open-source icons for React applications.
- [Visx](https://airbnb.io/visx) - A collection of reusable low-level visualization components for building custom charts and visualizations in React.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or higher recommended)

### Installation

1. Clone the repository:

```bash
   git clone https://chanarus@bitbucket.org/chanarus/user-manager.git
```

2. Change into the project directory:

```bash
  cd user-manager
```

3. Change into the project directory:

```bash
  # Using npm
   npm install
```

3. Start the development server:

```bash
  # Using npm
   npm run dev
```

## Scripts

1. Start the development website:

```bash
  # Using npm
   npm run dev:web
```

2. Start the development server:

```bash
  # Using npm
   npm run dev:server
```

3. Start both development web and server:

```bash
  # Using npm
   npm run dev
```

## Folder Structure

```
user-manager
├── public              # Static assets
├── src
│   ├── assets          # Images, icons, etc.
│   ├── components      # Reusable components
│   ├── services        # Services to call backend apis with rtk query.
│   ├── pages           # Page components
│   ├── store           # Redux store configuration
│   ├── features        # Redux slices and feature-specific logic
│   ├── types           # TypeScript type definitions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration

```
