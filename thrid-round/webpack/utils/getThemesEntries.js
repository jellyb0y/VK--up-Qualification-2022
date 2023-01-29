const fg = require('fast-glob');

const themesEntries = ['src/themes/entries/*'];

/**
 * Собирает entries цветовых тем проекта
 */
const getThemesEntries = () => fg
    .sync(themesEntries)
    .reduce((entries, entryPath) => {
        const themeName = entryPath.match(/\/([^\/]+)\.(?:scss|tsx?)$/)?.[1];
        const entryName = `theme_${themeName}`;
        entries[entryName] = entryPath;
        return entries;
    }, {});

module.exports = {
  getThemesEntries,
};
