const fs = require('fs');
const path = require('path');
const globby = require('globby');
const _ = require('lodash');
const AstNodeType = require('./AstNodeType');
const JsParser = require('./JsParser');
const Meta = require('./Meta');
const DocumentorFactory = require('./documentors/DocumentorFactory');
const DocWriter = require('./DocWriter');
const CommentParser = require('./comments/CommentParser');

class VDoc {
	constructor(config) {
		this.config = Object.assign({ src: [process.cwd()] }, config);
	}

	runDocs() {
		console.log(this.config.src);
		const filePaths = globby.sync(this.config.src);
		const basePaths = this._getBasePaths();
		const metas = [];

		for (let filePath of filePaths) {
			process.stdout.write('PARSING ' + filePath + '\n');

			let exportCount = 0;
			const fileMeta = JsParser.parse(filePath);
			fileMeta.basePath = this._getBasePath(basePaths, filePath);

			if (fileMeta.astnode) {
				for (let astnode of fileMeta.astnode.program.body) {
					if (!JsParser.isExport(astnode)) continue;
					exportCount++;

					if (astnode.expression) {
						if (astnode.expression.right.type === AstNodeType.Identifier) {
							const matchingNode = _.find(fileMeta.astnode.program.body, {
								id: { name: astnode.expression.right.name }
							});
							if (matchingNode) astnode = matchingNode;
						} else {
							astnode = astnode.expression.right;
						}
					}

					// handle export being separate from actual declaration
					// e.g. class X {}; export default X;
					if (astnode.declaration && astnode.declaration.type === AstNodeType.Identifier) {
						const matchingNode = _.find(fileMeta.astnode.program.body, {
							id: { name: astnode.declaration.name }
						});
						if (matchingNode) astnode = matchingNode;
					}

					const comments = CommentParser.parseLeadingComments(astnode.leadingComments);

					const exportNodeMeta = new Meta(
						fileMeta.filePath,
						fileMeta.fileContent,
						astnode,
						fileMeta.isVueComponent,
						fileMeta.vueMeta,
						comments,
						fileMeta.basePath
					);

					metas.push(exportNodeMeta);
				}
			}

			// if (exportCount) {
			// console.log(`  ✓ found ${exportCount} export${exportCount > 1 ? 's' : ''}`);
			// } else {
			//   console.log();
			// }
		}

		const documentors = metas.map(meta => DocumentorFactory.create(meta));

		// console.log('Writing docs to', this.config.dest);
		// DocWriter.write(documentors, this.config.dest);

		return documentors;
	}

	_getBasePath(basePaths, filePath) {
		filePath = path.normalize(filePath);
		return _.find(basePaths, bp => filePath.startsWith(bp));
	}

	_getBasePaths() {
		const paths = _.isArrayLike(this.config.src) ? this.config.src : [this.config.src];
		const basePaths = paths.map(p => p.replace(/\*\*?.*/g, '')).map(path.normalize);
		return basePaths;
	}
}

module.exports = VDoc;
