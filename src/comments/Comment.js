const TagManager = require('./TagManager');

class Comment {
  constructor(title, value, raw) {
    this.title = title;
    this.value = value;
    this.raw = raw;
  }

  get tagDefinition() {
    return TagManager.lookup(this.title);
  }

  onTagged(documentor) {
    const tagDefinition = this.tagDefinition;
    if (tagDefinition && tagDefinition.onTagged) {
      tagDefinition.onTagged(this, documentor);
    }
  }
}

module.exports = Comment;
