const _ = require('lodash');

const BaseDocumentor = require('./BaseDocumentor');
const AstNodeType = require('../AstNodeType');

const DocumentorFactory = {
  documentors: [],

  create(meta) {
    const documentor = new (this.getDocumentor(meta))(meta);
    return documentor;
  },

  getDocumentor(meta) {
    for (let d of this.documentors) {
      if (d.test(meta)) {
        return d.documentor;
      }
    }

    return BaseDocumentor;
  },

  defineDocumentor({ test, documentor }) {
    this.documentors.unshift({ test, documentor });
  }
};

// Vue Component Documentor
DocumentorFactory.defineDocumentor({
  test: meta => meta.isVueComponent,
  documentor: require('./ComponentDocumentor')
});

// Class Documentor
DocumentorFactory.defineDocumentor({
  test: meta => {
    if(meta.astnode.type === AstNodeType.ClassDeclaration) {
      return true;
    }

    if (_.some(meta.comments, {title:'@class'})) {
      return true;
    }
  },
  documentor: require('./ClassDocumentor')
});

module.exports = DocumentorFactory;
