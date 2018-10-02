# Minimal React
[![npm version](https://badge.fury.io/js/minimal-react.svg)](https://badge.fury.io/js/minimal-react)  
  
A command line tool to create a minimal react web application.

Minimal React is a tool just like Create React App but just simpler and with more control over your package.json and webpack configuration files.
- It is a boilerplate to create a simple React application setup.
- It is quick and smaller in size compared to Create React App.
- It is a starter kit that builds you a minimal React app with bare minimum configuration that just works.

Did Minimal React help you create your project? Consider buying me a coffee!<br/><a href="https://www.buymeacoffee.com/kTI9b0xj1" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Usage
- Install `minimal-react`
```shell
npm install -g minimal-react
```
- Create app
```shell
minimal-react my-simple-react-example
```
- Change directory
```shell
cd my-simple-react-example
```
- Start development server
```shell
npm run dev
```

## Production build
- Create production bundle
```shell
npm run build
```
- Change script src in `./index.html` (line 13) to point to output bundle
```html
<script src="./output/bundle.min.js" type="text/javascript"></script>
```
### Size
Production build: `98 kb`

## Release notes
### v1.0.4 - Updated README to include SEO friendly keywords
### v1.0.3 - Added project-name validation checks
- `project-name` should now follow NPM naming convention
- `project-name` should not be same as an existing directory at that location
### v1.0.2 - Added README
- Added README file for npmjs.com
### v1.0.1 - Minor bug fix
- Fixed async function related minor bug
### v1.0.0 - Initial release
- Use `minimal-react my-simple-react-example` to create a minimal react application.