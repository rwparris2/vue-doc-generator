const _ = require('lodash');
const TagManager = require('./TagManager');
const Comment = require('./Comment');

class CommentParser {
  static parseLeadingComments(leadingComments) {
    /** @type {Comment[]} */
    var tags = [];

    if (!leadingComments) return tags;

    for (let lc of leadingComments) {
      if (lc.type !== 'CommentBlock') continue;

      const commentChunks = lc.value
        // split on `@` (preserve the `@` and any leading asterisks and spaces)
        .split(/([*\s]+?@.*)/g)
        // remove empty strings that happen as a result of the split
        .filter(x => !!x);

      for (let chunk of commentChunks) {
        const comment = this.parseComment(chunk);
        if (comment) tags.push(comment);
      }
    }

    return tags;
  }

  static parseComment(input) {
    if (!input) return;

    let title;
    let value;
    const parts = this.clean(input).split(/(^@[a-z]+)/i).filter(x => !!x);

    if (parts.length) {
      // if no tag provided, assume it is a description
      if (!parts[0].startsWith('@')) {
        title = '@description';
        value = parts[0];
      } else {
        title = parts[0];
        if (parts.length === 2) {
          value = parts[1].trim();
        }
      }
    }

    if (title) {
      return new Comment(title, value, input);
    }
    return null;
  }

  static clean(input) {
    return (input || '').replace(/^[*\s]*/g, '').replace(/[*\s]*$/g, '');
  }
}

module.exports = CommentParser;
