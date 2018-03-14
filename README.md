# vue-doc-generator

> A pretty good vuejs component documentation generator

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i vue-doc-generator --save-dev
```

## Usage

```js
const VueDocGenerator = require('vue-doc-generator');
const docGenerator = new VueDocGenerator({ 
	src: [path.join(__dirname, '..', './src/**/*.+(js|vue)')] 
});
const docs = docGenerator.runDocs();
```

You can use the above lines in conjunction with webpack's 
[DefinePlugin](https://webpack.js.org/plugins/define-plugin/) to provide docs 
to the rest of your app.

***

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/rwparris2/vue-doc-generator/issues)

***

## Author

* [github/rwparris2](https://github.com/rwparris2)
* [twitter/rwparris2](http://twitter.com/rwparris2)

## License

Copyright © 2018
Licensed under the MIT license.

***