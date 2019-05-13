# AngularJS Code.Hub Greece Training Project

### Prepare project
```
npm install --save-dev
```

### Start development HTTP server (use `src` directory as source)
Server support on change `*.js` files perform `jshint` task to check syntax and `live reload` browser page on change `*.js | *.css | *.html`
```
grunt server
```
Application will be available by following link [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Build a project
Project will be build into `build` directory and apply `JavaScript uglify`, `CSS minify` and ``HTML minify
```
grunt build
```

### Start build HTTP server (use `build` directory as source)
Server support on change `*.js` files perform `jshint` task to check syntax and `live reload` browser page on change `*.js | *.css | *.html`
```
grunt server-build
```
Application will be available by following link [http://127.0.0.1:8001/](http://127.0.0.1:8001/)
