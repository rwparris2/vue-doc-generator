const ModuleDocumentor = require('./ModuleDocumentor');

class ClassDocumentor extends ModuleDocumentor {
  constructor(meta) {
    super(meta);
  }

  get name() {
    if (!this._name) {
      if (this.meta.astnode.id && this.meta.astnode.id.name) {
        this.name = this.meta.astnode.id.name;
      }
    }

    return super.name;
  }
  set name(value) {
    super.name = value;
  }
}

module.exports = ClassDocumentor;
