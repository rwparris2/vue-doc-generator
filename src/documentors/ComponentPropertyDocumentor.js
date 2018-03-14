const _ = require('lodash');
const BaseDocumentor = require('./BaseDocumentor');
const AstNodeType = require('../AstNodeType');

class ComponentPropertyDocumentor extends BaseDocumentor {
  constructor(meta) {
    super(meta);

    this.types = [];
    this.defaultValue = null;
    this.required = false;

    // props: ['prop1', 'prop2']
    if (this.astnode.type === AstNodeType.Literal) {
      this.name = this.astnode.value;
    }

    // props: {...}
    if (this.astnode.type === AstNodeType.Property) {
      this.name = this.astnode.key.name;

      let typeNode;
      let defaultNode;
      let requiredNode;
      let validatorNode;

      // props: {prop1: {type:..., required:true, default: 'apples'}}
      if (this.astnode.value.type === AstNodeType.ObjectExpression) {
        typeNode = _.find(this.astnode.value.properties, { key: { name: 'type' } });
        defaultNode = _.find(this.astnode.value.properties, { key: { name: 'default' } });
        requiredNode = _.find(this.astnode.value.properties, { key: { name: 'required' } });
        validatorNode = _.find(this.astnode.value.properties, { key: { name: 'validator' } });
      } else {
        typeNode = this.astnode;
      }

      // type: Boolean
      if (typeNode && typeNode.value.name) {
        this.types = [typeNode.value.name];
      }

      // type: [Boolean, String]
      if (typeNode && typeNode.value.elements) {
        this.types = typeNode.value.elements.map(e => e.name);
      }

      // default: 'apple'
      if (defaultNode && defaultNode.value.type === AstNodeType.Literal) {
        this.defaultValue = String(defaultNode.value.raw);
      }

      // const SOME_VALUE = 'motherfucker'; ... default: SOME_VALUE
      if (defaultNode && defaultNode.value.type === AstNodeType.Identifier) {
        this.defaultValue = `\`${defaultNode.value.name}\``;
      }

      // default: function () { return 'boobs'; }
      if (defaultNode && !this.defaultValue) {
        this.defaultValue = `\`${defaultNode.value.type}\``;
      }

      // required: true
      if (requiredNode) {
        this.required = requiredNode.value.value;
      }
    }
  }

  toJSON() {
    return Object.assign(super.toJSON(), {
      types: this.types,
      defaultValue: this.defaultValue,
      required: this.required
    });
  }
}

module.exports = ComponentPropertyDocumentor;
