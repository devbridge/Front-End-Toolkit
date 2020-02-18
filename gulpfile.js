const fs = require('fs');
const path = require('path');

const tasksDir = './gulp-tasks';
const normalizedPath = path.join(__dirname, tasksDir);

fs.readdirSync(normalizedPath).forEach((file) => {
    const name = file.replace(/\.[^/.]+$/, '');
    // eslint-disable-next-line global-require, import/no-dynamic-require
    exports[name] = require(`${tasksDir}/${file}`);
});
