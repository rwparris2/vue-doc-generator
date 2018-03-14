const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const sanitizeFilename = require('sanitize-filename');

const LEADING_SLASH = /^\//gi;
const TRAILING_SLASH = /\/$/gi;

function getFileName(documentor) {
  return documentor.name + '.json';
}

function getFileDir(documentor) {
  return path.dirname(path.relative(documentor.meta.basePath, documentor.meta.filePath));
}

function write(documentors, destinationDirectory) {
  const dest = path.join(destinationDirectory, '_api_json');
  let toc = {};
  rimraf.sync(dest);

  for (let documentor of documentors) {
    const dir = path.join(dest, getFileDir(documentor, dest));
    const destPath = path.join(dir, getFileName(documentor));
    mkdirp.sync(dir);

    console.log('OUTPUT: ', destPath);
    fs.writeFileSync(destPath, JSON.stringify(documentor, null, 2), 'utf-8');

    toc[documentor.group] = toc[documentor.group] || [];
    toc[documentor.group].push({
      name: documentor.name,
      documentorType: documentor.documentorType,
      longName: documentor.longName
    });
  }

  toc = _(toc)
    .keys()
    .map(key => {
      return { key: key, items: toc[key] };
    })
    .sortBy(x => x.key)
    .value();

  fs.writeFileSync(path.join(dest, 'toc.json'), JSON.stringify(toc, null, 2), 'utf-8');
}

module.exports = { write };
