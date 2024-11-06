# User Manager

User Manager is a web application built with Vite, React, TypeScript, and Redux. It provides a simple and efficient interface for managing user data within an organization. This project demonstrates best practices for building a scalable, maintainable React application with TypeScript and state management using Redux.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)

## Features

- **User List**: View a list of users with essential details.
- **Add User**: Add new users to the list with form validation.
- **Edit User**: Edit existing user details.
- **Delete User**: Remove users from the list.
- **Search**: Quickly find users by name or other criteria.

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
│   ├── types           # TypeScript type definitions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration

```
