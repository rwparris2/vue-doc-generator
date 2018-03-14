const _ = require('lodash');
const Meta = require('../Meta');
const AstNodeType = require('../AstNodeType');
const JsParser = require('../JsParser');
const VueDemoBlockParser = require('../VueDemoBlockParser');
const ModuleDocumentor = require('./ModuleDocumentor');
const ComponentPropertyDocumentor = require('./ComponentPropertyDocumentor');

class ComponentDocumentor extends ModuleDocumentor {
  constructor(meta) {
    super(meta);
  }

  get name() {
    if (!this._name && this.astnode.declaration) {
      const nameNode = _.find(this.astnode.declaration.properties, { key: { name: 'name' } });
      if (nameNode) {
        this._name = nameNode.value.value;
      }
    }

    return super.name;
  }

  get properties() {
    const propNodes = this._getPropsNodes();
    let props = propNodes.map(node => {
      const propMeta = new Meta(
        this.meta.filePath,
        this.meta.fileContent,
        node,
        this.meta.isVueComponent,
        this.meta.vueMeta,
        this.meta.comments,
        this.meta.basePath
      );

      return new ComponentPropertyDocumentor(propMeta);
    });

    // remove nameless properties
    props = props.filter(p => p.name);

    return props;
  }

  get demos() {
    if (!this.meta.vueMeta || !this.meta.vueMeta.customBlocks) {
      return [];
    }

    const demoParsers = this.meta.vueMeta.customBlocks
      .filter(customBlock => customBlock.type === 'demo')
      .map(demoBlock => new VueDemoBlockParser(demoBlock));

    return demoParsers;
  }

  toJSON() {
    return Object.assign(super.toJSON(), {
      demos: this.demos
    });
  }

  _getPropsNodes() {
    if (this.astnode.declaration) {
      const propsNode = _.find(this.astnode.declaration.properties, { key: { name: 'props' } });
      if (propsNode && propsNode.value) {
        if (propsNode.value.elements) {
          return propsNode.value.elements;
        } else if (propsNode.value.properties) {
          return propsNode.value.properties;
        }
      }
    }
    return [];
  }
}

module.exports = ComponentDocumentor;
