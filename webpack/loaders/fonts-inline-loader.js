const path = require('path');
const { readFileSync } = require('fs');

module.exports = function(content, meta) {
  const { sources } = meta;

  // Кешируем уже преобразованные импорты
  const filesCache = {};

  return content.replace(/url\(([^)]*\.(?:woff|woff2|eot|ttf|svg))\?inline\)/g, (_, staticFile) => {
    const sourceDir = sources[0].replace(/^(.*)(?:\/|\\)[^\/\\]*$/, '$1');
    const filePath = path.resolve(sourceDir, staticFile);

    filesCache[filePath] = filesCache[filePath] || `data:application/font;charset=utf-8;base64,${
      readFileSync(filePath).toString('base64')
    }`;

    return `url(${filesCache[filePath]})`;
  });
}
