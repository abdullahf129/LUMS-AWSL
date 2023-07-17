# Front End Scaffold 

Keywords: Typescript, React, Tailwind, DaisyUI

Welcome to the front-end scaffold of the PAWject. Before you go around scratching posts, here are some things you should know. Remember, failure to follow these instructions will result in the kitty litter placed outside the house for the entire weekend.  (take that as a threat, please!)

## Contents

- [Guidelines and Links](#guidelines)
- [Setting Up](#setting-up)
- [Running The App](#running-the-app)
- [Naming Conventions](#naming-conventions)
- [Branching](#branching)
- [Ticketing](#ticketing)


## Guidelines and Links

The **Figma Design** will be strictly followed.
Find the Design Link here: https://www.figma.com/file/EWPubK6BC17QxuoZNwjXgc/PAWject?t=7YY8tlFxziqukdwj-1

All folders and files will be made within the **frontend** directory in the **src** folder.

Please make sure to follow the **Naming Conventions**.

While using Git or yarn, be sure your'e in the correct directory.


Using Tailwind CSS - https://tailwindcss.com/

tailwind css is a utility-first css framework. It is a collection of classes that can be used to style your components. It is a very powerful tool that can be used to create beautiful and responsive UIs.


Using DaisyUI - https://daisyui.com/

DaisyUI is a Tailwind CSS plugin that provides a set of ready-to-use, fully customizable, accessible and responsive UI components. It is a collection of components that can be used to create beautiful UIs. It is a very powerful tool that can be used to create beautiful and responsive UIs.


Using React - https://reactjs.org/

React is a JavaScript library for building user interfaces. It is a very powerful tool that can be used to create beautiful and responsive UIs.


Using Typescript - https://www.typescriptlang.org/

Typescript is a typed superset of JavaScript that compiles to plain JavaScript. It is a very powerful tool that can be used to create beautiful and responsive UIs.

## Setting Up

To install required dependencies and run the following command in the **frontend** directory:

To go to the frontend directory, run the following command:

```bash
cd frontend
```

and then run the following command:

```bash
yarn install
```

In case you are already in the frontend directory, you can simply run the following command:

```bash
yarn install
```

The above command will install all the required dependencies for the project, and you can simply run the project. 

**VSCode Extentions**

The following extentions aren't required, but are recommended and will greatly improve your performance:

- Extention for Tailwind - https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
- Extention for Typescript - https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin
- Prettier Code Formatter - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- Extention for React Snippets - https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

- Extention for GitLens - https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
- Extention for JavaScript (ES6) code snippets - https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets


To install anything new, which would be a rare occurance (so go over it with the leads in that case) run the following command:

```bash
yarn add <package-name>
```


## Running The App

You can run the app by running the following command in the frontend directory:

```bash
yarn dev
```

This command will start **vite** at the http://127.0.0.1:5173/

This is the default port, in case the port varies, it will display the port number and the link in the terminal. Any changes, once saved, will be reflected in the browser.


## Naming Conventions

- All components should be named in PascalCase.
- All folders within src should be named in kebab-case.
- All files within src should be named in kebab-case.
- All React components should be named in PascalCase.
- All variables should be named in camelCase.
- All constants should be named in SCREAMING_SNAKE_CASE.
- All functions should be named in camelCase.

- All media will be in the assets folder in src.

- All interfaces should be named in PascalCase.
- All enums should be named in PascalCase.
- All types should be named in PascalCase.
- All classes should be named in PascalCase.

## Branching

- The naming convention for branches is described in the README.md file in the root directory of the project.

## Ticketing

- The naming convention and labeling for tickets is described in the README.md file in the root directory of the project.

The following is the heiraarchy of the labels:

Epic > Story > Task > SubTask

with Epic being the highest/biggest task which is broken down further

The Epic, in our case for example would be the "Frontend" and the Story would be "Login Page" and the Task would be "Login Form" and the SubTask would be "Login Form Validation".