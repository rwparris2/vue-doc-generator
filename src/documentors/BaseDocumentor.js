const process = require('process');
const path = require('path');
const NamingUtil = require('../util/NamingUtil');
const CommentParser = require('../comments/CommentParser');

class BaseDocumentor {
	constructor(meta) {
		this.meta = meta;
		this.astnode = meta.astnode;
		this.isPrivate = false;

		this._initializeComments();
	}

	get access() {
		return this._access || 'public';
	}
	set access(value) {
		this._access = value;
	}

	get absolutePath() {
		path.resolve(this.meta.filePath);
	}

	get group() {
		let parts = this.importPath.split(path.sep);
		parts.shift();
		parts.pop();

		return parts.join('/');
	}

	get longName() {
		return path.join(this.group, this.name);
	}

	get importPath() {
		// todo ??
		let importPath = path.relative(process.cwd(), this.meta.filePath);
		importPath = importPath.replace(path.extname(importPath), '');
		return importPath;
	}

	get documentorType() {
		const documentorType = (this.constructor.name || 'Module')
			.replace(/documentor$/i, '')
			.replace(/^base/i, 'Module')
			.toLocaleLowerCase();
		return documentorType;
	}

	get name() {
		if (!this._name) {
			this._name = NamingUtil.default.filePathToName(this.meta.filePath);
		}
		return this._name;
	}
	set name(value) {
		this._name = value;
	}

	get description() {
		return this._description;
	}
	set description(value) {
		this._description = value;
	}

	// used by JSON.stringify
	// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior
	toJSON() {
		return {
			documentorType: this.documentorType,
			access: this.access,
			name: this.name,
			description: this.description,
			longName: this.longName,
			absolutePath: this.absolutePath
		};
	}

	_initializeComments() {
		const commentTags = CommentParser.parseLeadingComments(this.astnode.leadingComments);
		for (let commentTag of commentTags) {
			commentTag.onTagged(this);
		}
	}
}

module.exports = BaseDocumentor;
