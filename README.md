# Webpack 2 notes

- In single page app (SPA) the reliance on JS code to assemble a full webpage
- No calls to server on i.e. click, this is handled on client side i.e. React page rerenders on click and return HTML
- Server Side Rendering v Single Page App, latter has a lot more code to run in browser (JS)

## Problems with a lot of JS code
- a few large files are difficult to navigate, understanding code base - JS modules as antidote to that e.g. many small JS files (clearer where code is in the project i.e. header.js, footer.js vs one main.js)
- many seperate files (modules) - problem is order of execution, reliance of one module on another (load order)
- multiple HTTP call is generally a bad idea from perfomance standpoint - the more calls the slower load of the page

## Webpack comes to rescue
- merging the collection of multiple JS files and merge them into one larger file, all executed in correct order i.e. bundle.js
- single or much less HTTP calls as a result - good for site performance

