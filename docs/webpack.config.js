const path = require('path');

// examples
const examplesPages = {
    hello_redux: 'hello_redux',
    index: 'index',
};

//entryList
const entryList = Object.assign({}, examplesPages);

//entryArr
const entryArr = {};
for (var i in entryList) {
    entryArr[i] = path.join(__dirname, '/src/pages/' + entryList[i] + '/index.js');
}

//exports
exports.entryArr = entryArr;
