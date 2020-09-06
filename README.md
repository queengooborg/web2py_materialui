# web2py_materialui

A web2py app that integrates ReactJS and Material UI.

## Setup

```sh
cd web2py/applications/web2py_materialui
cd static
yarn
yarn build
```

## Auto-Rebuild

```sh
yarn watch
```

## Current Known Caveats

- Integration between web2py and ReactJS/Material UI is _very_ minimal at the moment.  There is no login, no database connection, no parameters passed back and forth...nothing.
- Routing must be performed in both controllers and ReactJS; there is no synchonized routing yet.

(If you are reading this and would like to fix these caveats, don't hesitate to send a PR!)

