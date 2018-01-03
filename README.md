# Minimal React
A command line tool to create a minimal react web application.

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