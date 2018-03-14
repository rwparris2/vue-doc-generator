class Meta {
  constructor(filePath, fileContent, astnode, isVueComponent, vueMeta, comments, basePath) {
    this.filePath = filePath;
    this.fileContent = fileContent;
    this.astnode = astnode;
    this.isVueComponent = isVueComponent;
    this.vueMeta = vueMeta;
    this.comments = comments;
    this.basePath = basePath;
  }
}

module.exports = Meta;
