# vue-doc-generator

> A pretty good vuejs component documentation generator

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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

## Committing

`npm run commit` launches a commit assistant to follow [commitizen guidelines](https://github.com/commitizen/cz-cli)

***

## Author

* [github/rwparris2](https://github.com/rwparris2)
* [twitter/rwparris2](http://twitter.com/rwparris2)

## License

Copyright © 2018
Licensed under the MIT license.

***