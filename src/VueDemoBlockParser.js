const vueTemplateCompiler = require('vue-template-compiler');
const _ = require('lodash');

class VueDemoBlockParser {
  constructor(demoBlock) {
    if (demoBlock.content) {
      demoBlock = demoBlock.content;
    }

    this.vueMeta = vueTemplateCompiler.parseComponent(demoBlock);
  }

  get title() {
    const titleBlock = _.find(this.vueMeta.customBlocks, { type: 'title' });
    if (titleBlock) {
      return titleBlock.content;
    }
    return '';
  }

  get description() {
    const descriptionBlock = _.find(this.vueMeta.customBlocks, { type: 'description' });
    if (descriptionBlock) {
      return descriptionBlock.content;
    }
    return '';
  }

  get template() {
    if (this.vueMeta.template) {
      return this.vueMeta.template.content;
    }
    return '';
  }

  get script() {
    if (this.vueMeta.script) {
      return this.vueMeta.script.content;
    }
    return '';
  }

  toJSON() {
    return {
      title: this.title,
      description: this.description,
      template: this.template,
      script: this.script
    };
  }
}

module.exports = VueDemoBlockParser;
