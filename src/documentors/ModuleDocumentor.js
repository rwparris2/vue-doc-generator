const path = require('path');
const BaseDocumentor = require('./BaseDocumentor');

class ModuleDocumentor extends BaseDocumentor {
  constructor(meta) {
    super(meta);
  }

  get importStatement() {
    return `import ${this.name} from '${this.importPath}';`;
  }

  get properties() {
    return [{ name: 'property:todo' }];
  }

  // used by JSON.stringify
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior
  toJSON() {
    return Object.assign(super.toJSON(), {
      importStatement: this.importStatement,
      properties: this.properties
    });
  }
}

module.exports = ModuleDocumentor;
