const DEFAULT_ACCESS = 'public';

module.exports = {
  defineStandardDefinitions(tagManager) {
    tagManager.defineTag('@component');

    tagManager.defineTag('@class', {
      synonyms: ['@constructor', '@classdesc'],
      onTagged: (comment, documentor) => {
        if (comment.value) {
          documentor.name = comment.value;
        }
      }
    });

    tagManager.defineTag('@description', {
      synonyms: ['desc'],
      onTagged: (comment, documentor) => {
        if (comment.value) {
          documentor.description = comment.value;
        }
      }
    });

    tagManager.defineTag('@event', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @event onTagged Handler');
        // console.log('@event', comment);
      }
    });

    tagManager.defineTag('@emits', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @emits onTagged Handler');
        // console.log('@emits', comment);
      },
      synonyms: ['@fires']
    });

    tagManager.defineTag('@listens', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @listens onTagged Handler');
        // console.log('@listens', comment);
      }
    });

    tagManager.defineTag('@property', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @property onTagged Handler');
        // console.log('@property', comment);
      }
    });

    tagManager.defineTag('@mixin', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @mixin onTagged Handler');
        // console.log('@mixin', comment);
      }
    });

    tagManager.defineTag('@router', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @router onTagged Handler');
        // console.log('@router', comment);
      }
    });

    tagManager.defineTag('@route', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @route onTagged Handler');
        // console.log('@route', comment);
      }
    });

    tagManager.defineTag('@store', {
      onTagged: (comment, documentor) => {
        // console.log('TODO: @store onTagged Handler');
        // console.log('@store', comment);
      }
    });

    tagManager.defineTag('@access', {
      onTagged: (comment, documentor) => {
        if (/^(package|private|protected|public)$/i.test(tag.value)) {
          documentor.access = tag.value.toLowerCase();
          documentor.isPrivate = /private/i.test(tag.value);
        } else {
          documentor.access = DEFAULT_ACCESS;
        }
      }
    });

    tagManager.defineTag('@public', {
      onTagged: (comment, documentor) => {
        documentor.access = 'public';
      }
    });

    tagManager.defineTag('@private', {
      onTagged: (comment, documentor) => {
        documentor.access = 'private';
      }
    });

    tagManager.defineTag('@protected', {
      onTagged: (comment, documentor) => {
        documentor.access = 'protected';
      }
    });

    tagManager.defineTag('@package', {
      onTagged: (comment, documentor) => {
        documentor.access = 'package';
      }
    });

    // tagManager.defineTag('@abstract', {
    //   synonyms: ['virtual'],
    //   onTagged: (comment, documentor) => {
    //     documentor.virtual = true;
    //   }
    // });

    // tagManager.defineTag('@alias', {
    //   onTagged: (comment, documentor) => {
    //     doclet.alias = tag.value;
    //   }
    // });

    // tagManager.defineTag('@async', {
    //   onTagged: (comment, documentor) => {
    //     doclet.async = true;
    //   }
    // });

    // tagManager.defineTag('@augments', {
    //   synonyms: ['extends'],
    //   onTagged: (doclet, tag) => {
    //     doclet.augment(firstWordOf(tag.value));
    //   }
    // });

    // tagManager.defineTag('@default', {
    //   synonyms: ['defaultvalue'],
    //   onTagged: (comment, documentor) => {
    //     var nodeToValue = jsdoc.src.astnode.nodeToValue;

    //     if (tag.value) {
    //       doclet.defaultvalue = tag.value;
    //     } else if (
    //       doclet.meta &&
    //       doclet.meta.code &&
    //       typeof doclet.meta.code.value !== 'undefined'
    //     ) {
    //       switch (doclet.meta.code.type) {
    //         case Syntax.ArrayExpression:
    //           doclet.defaultvalue = nodeToValue(doclet.meta.code.node);
    //           doclet.defaultvaluetype = 'array';
    //           break;

    //         case Syntax.Literal:
    //           doclet.defaultvalue = doclet.meta.code.value;
    //           break;

    //         case Syntax.ObjectExpression:
    //           doclet.defaultvalue = nodeToValue(doclet.meta.code.node);
    //           doclet.defaultvaluetype = 'object';
    //           break;

    //         default:
    //           // do nothing
    //           break;
    //       }
    //     }
    //   }
    // });

    // tagManager.defineTag('@deprecated', {
    //   onTagged: (comment, documentor) => {
    //     doclet.deprecated = true;
    //   }
    // });

    // tagManager.defineTag('@event', {
    //   isNamespace: true,
    //   onTagged: (comment, documentor) => {
    //     setDocletKindToTitle(doclet, tag);
    //     setDocletNameToValue(doclet, tag);
    //   }
    // });

    // tagManager.defineTag('@fires', {
    //   onTagged: (comment, documentor) => {
    //     doclet.fires = doclet.fires || [];
    //     applyNamespace('event', tag);
    //     doclet.fires.push(tag.value);
    //   },
    //   synonyms: ['emits']
    // });

    // tagManager.defineTag('@listens', {
    //   onTagged: (comment, documentor) => {
    //     doclet.listens = doclet.listens || [];
    //     applyNamespace('event', tag);
    //     doclet.listens.push(tag.value);
    //   }
    // });

    // tagManager.defineTag('@example', {
    //   keepsWhitespace: true,
    //   removesIndent: true,
    //   onTagged: (comment, documentor) => {
    //     doclet.examples = doclet.examples || [];
    //     doclet.examples.push(tag.value);
    //   }
    // });

    // tagManager.defineTag('@function', {
    //   onTagged: (comment, documentor) => {
    //     setDocletKindToTitle(doclet, tag);
    //     setDocletNameToValue(doclet, tag);
    //   },
    //   synonyms: ['func', 'method']
    // });

    // tagManager.defineTag('@global', {
    //   onTagged: (comment, documentor) => {
    //     doclet.scope = jsdoc.name.SCOPE.NAMES.GLOBAL;
    //     delete doclet.memberof;
    //   }
    // });

    // tagManager.defineTag('@hideconstructor', {
    //   onTagged: (comment, documentor) => {
    //     doclet.hideconstructor = true;
    //   }
    // });

    // tagManager.defineTag('@ignore', {
    //   onTagged: (comment, documentor) => {
    //     doclet.ignore = true;
    //   }
    // });

    // tagManager.defineTag('@instance', {
    //   onTagged: (comment, documentor) => {
    //     setDocletScopeToTitle(doclet, tag);
    //   }
    // });

    // tagManager.defineTag('@kind', {});

    // tagManager.defineTag('@member', {
    //   canHaveType: true,
    //   canHaveName: true,
    //   onTagged: (comment, documentor) => {
    //     setDocletKindToTitle(doclet, tag);
    //     setDocletNameToValueName(doclet, tag);
    //     setDocletTypeToValueType(doclet, tag);
    //   },
    //   synonyms: ['var']
    // });

    // // this symbol mixes in all of the specified object's members
    // tagManager.defineTag('@mixes', {
    //   onTagged: (comment, documentor) => {
    //     var source = firstWordOf(tag.value);

    //     doclet.mix(source);
    //   }
    // });

    // tagManager.defineTag('@mixin', {
    //   onTagged: (comment, documentor) => {
    //     setDocletKindToTitle(doclet, tag);
    //     setDocletNameToValue(doclet, tag);
    //   }
    // });

    // tagManager.defineTag('@module', {
    //   canHaveType: true,
    //   isNamespace: true,
    //   onTagged: (comment, documentor) => {
    //     setDocletKindToTitle(doclet, tag);
    //     setDocletNameToValue(doclet, tag);
    //     if (!doclet.name) {
    //       setDocletNameToFilename(doclet);
    //     }
    //     // in case the user wrote something like `/** @module module:foo */`:
    //     doclet.name = stripModuleNamespace(doclet.name);

    //     setDocletTypeToValueType(doclet, tag);
    //   }
    // });

    // tagManager.defineTag('@name', {});

    // tagManager.defineTag('@namespace', {
    //   canHaveType: true,
    //   onTagged: (comment, documentor) => {
    //     setDocletKindToTitle(doclet, tag);
    //     setDocletNameToValue(doclet, tag);
    //     setDocletTypeToValueType(doclet, tag);
    //   }
    // });

    // tagManager.defineTag('@param', {
    //   canHaveType: true,
    //   canHaveName: true,
    //   onTagged: (comment, documentor) => {
    //     doclet.params = doclet.params || [];
    //     doclet.params.push(tag.value || {});
    //   },
    //   synonyms: ['arg', 'argument']
    // });

    // tagManager.defineTag('@property', {
    //   canHaveType: true,
    //   canHaveName: true,
    //   onTagged: (comment, documentor) => {
    //     doclet.properties = doclet.properties || [];
    //     doclet.properties.push(tag.value);
    //   },
    //   synonyms: ['prop']
    // });

    // tagManager.defineTag('@readonly', {
    //   onTagged: (comment, documentor) => {
    //     doclet.readonly = true;
    //   }
    // });

    // tagManager.defineTag('@returns', {
    //   canHaveType: true,
    //   onTagged: (comment, documentor) => {
    //     doclet.returns = doclet.returns || [];
    //     doclet.returns.push(tag.value);
    //   },
    //   synonyms: ['return']
    // });

    // tagManager.defineTag('@see', {
    //   onTagged: (comment, documentor) => {
    //     doclet.see = doclet.see || [];
    //     doclet.see.push(tag.value);
    //   }
    // });

    // tagManager.defineTag('@static', {
    //   onTagged: (comment, documentor) => {
    //     setDocletScopeToTitle(doclet, tag);
    //   }
    // });

    // tagManager.defineTag('@summary', {
    //   onTagged: (comment, documentor) => {
    //     doclet.summary = tag.value;
    //   }
    // });

    // tagManager.defineTag('@this', {
    //   onTagged: (comment, documentor) => {
    //     doclet.this = firstWordOf(tag.value);
    //   }
    // });

    // tagManager.defineTag('@todo', {
    //   onTagged: (comment, documentor) => {
    //     doclet.todo = doclet.todo || [];
    //     doclet.todo.push(tag.value);
    //   }
    // });

    // tagManager.defineTag('@throws', {
    //   canHaveType: true,
    //   onTagged: (comment, documentor) => {
    //     doclet.exceptions = doclet.exceptions || [];
    //     doclet.exceptions.push(tag.value);
    //   },
    //   synonyms: ['exception']
    // });

    // tagManager.defineTag('@tutorial', {
    //   onTagged: (comment, documentor) => {
    //     doclet.tutorials = doclet.tutorials || [];
    //     doclet.tutorials.push(tag.value);
    //   }
    // });

    // tagManager.defineTag('@type', {
    //   mustNotHaveDescription: true,
    //   canHaveType: true,
    //   onTagText: function(text) {
    //     var closeIdx;
    //     var openIdx;

    //     var OPEN_BRACE = ', {';
    //     var CLOSE_BRACE = '}';

    //     // remove line breaks
    //     text = text.replace(/[\f\n\r]/g, '');

    //     // Text must be a type expression; for backwards compatibility, we add braces if they're
    //     // missing. But do NOT add braces to things like `@type {string} some pointless text`.
    //     openIdx = text.indexOf(OPEN_BRACE);
    //     closeIdx = text.indexOf(CLOSE_BRACE);

    //     // a type expression is at least one character long
    //     if (openIdx !== 0 || closeIdx <= openIdx + 1) {
    //       text = OPEN_BRACE + text + CLOSE_BRACE;
    //     }

    //     return text;
    //   },

    //   onTagged: (comment, documentor) => {
    //     if (tag.value && tag.value.type) {
    //       setDocletTypeToValueType(doclet, tag);

    //       // for backwards compatibility, we allow @type for functions to imply return type
    //       if (doclet.kind === 'function') {
    //         doclet.addTag('returns', tag.text);
    //       }
    //     }
    //   }
    // });

    return tagManager;
  }
};
