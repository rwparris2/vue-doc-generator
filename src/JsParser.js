const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const babylon = require('babylon');
const vueTemplateCompiler = require('vue-template-compiler');

const AstNodeType = require('./AstNodeType');
const Meta = require('./Meta');

class Parser {
	static parse(filePath) {
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const isVueComponent = this.isVueSingleFileComponent(filePath);
		let vueMeta = null;
		let script = null;
		let ast = null;
		let meta;

		if (isVueComponent) {
			vueMeta = this.getVueMeta(fileContent);
			if (vueMeta.script) {
				script = vueMeta.script.content;
			}
		} else {
			script = fileContent;
		}
		
		if (script) {
			ast = this.getAst(filePath, script);
		}

		meta = new Meta(filePath, fileContent, ast, isVueComponent, vueMeta);
		return meta;
	}

	static isVueSingleFileComponent(filepath) {
		const ext = path.extname(filepath);
		return (ext || '').toLocaleLowerCase() === '.vue';
	}

	static getVueMeta(source) {
		const output = vueTemplateCompiler.parseComponent(source);

		const isPlainScript = _(output).values().filter(v => !_.isEmpty(v)).compact().isEmpty();

		if (isPlainScript) {
			output.script = { content: source };
		}

		if (!output.script) {
			// throw new Error('Could not parse document. No script tag found.');
			// jsdoc.util.
		} else if (!!output.script.src) {
			// jsdoc.util.logger.warn('Could not parse script with "src" tag.');
		}

		return output;
	}

	static getAst(filePath, script) {
		if (!filePath) throw new Error('filepath must be provided');
		if (!script) throw new Error('script must be provided');

		const parserOptions = _.defaults({}, BABYLON_PARSE_OPTIONS, { sourceFilename: filePath });
		const ast = babylon.parse(script, parserOptions);
		return ast;
	}

  /**
   * Checks whether an AST node represents a function.
   * @param {(Object|string)} node - The AST node to check, or the `type` property of a node.
   * @return {boolean} Set to `true` if the node is a function or `false` in all other cases.
   */
	static isFunction(node) {
		if (!node) return false;

		let isFunction;
		const type = _.isString(node) ? node : node.type;

		switch (type) {
			case AstNodeType.FunctionDeclaration:
			case AstNodeType.FunctionExpression:
			case AstNodeType.MethodDefinition:
			case AstNodeType.MethodBase:
			case AstNodeType.ArrowFunctionExpression:
			case AstNodeType.TSDeclareMethod:
				isFunction = true;
				break;
			default:
				isFunction = false;
		}

		return isFunction;
	}

  /**
   * Checks whether an AST node represents an export.
   * @param {(Object|string)} node - The AST node to check, or the `type` property of a node.
   * @return {boolean} Set to `true` if the node is an export or `false` in all other cases.
   */
	static isExport(node) {
		if (!node) return false;

		let isExport;
		const type = _.isString(node) ? node : node.type;

		switch (type) {
			case AstNodeType.ExportNamedDeclaration:
			case AstNodeType.ExportDefaultDeclaration:
			case AstNodeType.ExportAllDeclaration:
			case AstNodeType.TsExportAssignment:
				isExport = true;
				break;
			case AstNodeType.ExpressionStatement:
				if (
					node.expression &&
					node.expression.left &&
					node.expression.left.object &&
					node.expression.left.object.name === 'module' &&
					node.expression.left.property &&
					node.expression.left.property.name === 'exports' &&
					node.expression.operator === '='
				) {
					isExport = true;
				}
				break;
			default:
				isExport = false;
		}

		return isExport;
	}
}

// @see https://github.com/babel/babylon
const BABYLON_PARSE_OPTIONS = Object.freeze({
	allowImportExportEverywhere: true,
	allowReturnOutsideFunction: true,
	ranges: true,
	sourceType: 'module', //script|module
	// basically, all of them minus languages we don't use
	plugins: [
		'estree',
		// 'jsx',
		// 'flow',
		// 'typescript','
		'doExpressions',
		'objectRestSpread',
		'decorators',
		'classProperties',
		'classPrivateProperties',
		'exportExtensions',
		'asyncGenerators',
		'functionBind',
		'functionSent',
		'dynamicImport',
		'numericSeparator',
		'optionalChaining',
		'importMeta',
		'bigInt'
	]
});

module.exports = Parser;
