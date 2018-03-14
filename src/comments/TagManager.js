const _ = require('lodash');

class TagManager {
  constructor() {
    /** @type {Tag} */
    this.tags = {};
    this.synonyms = {};
  }

  /**
   * 
   * @param {any} title 
   * @param {object} opts 
   * @param {object} opts.synonyms
   * @returns 
   * @memberof TagManager
   */
  defineTag(title, opts) {
    title = this.normalizeTitle(title);
    opts = opts || {};

    if (opts.synonyms) {
      opts.synonyms = opts.synonyms.map(this.normalizeTitle);
      opts.synonyms.forEach(s => this.defineSynonym(s, title));
    }
    const tag = new Tag(title, opts);
    this.tags[title] = tag;
    return this;
  }

  defineSynonym(synonym, title) {
    synonym = this.normalizeTitle(synonym);
    title = this.normalizeTitle(title);

    this.synonyms[synonym] = title;

    return this;
  }

  /**
   * @param {String} title 
   * @returns {Tag}
   */
  lookup(title) {
    title = this.normalizeTitle(title);
    return this.tags[title] || this.tags[this.synonyms[title]];
  }

  normalizeTitle(title) {
    if (title) {
      if (title.charAt(0) !== '@') {
        title = '@' + title;
      }
      title = title.toLowerCase();
    }
    return title;
  }
}

class Tag {
  constructor(title, opts) {
    this.title = title;
    Object.assign(this, opts);
  }
}

// Returning an instance instead of the constructor makes this act as a a
// singleton. In node, multiple requires will return the same instance because
// of how node handles require/module caching
const instance = new TagManager();
require('./TagDefinitions').defineStandardDefinitions(instance);
module.exports = instance;
