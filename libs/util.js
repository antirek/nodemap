var fs = require('fs'),
    _ = require('underscore');

/**
 * Make directory if it doesn't exist already.
 *
 * @param {String} path The path to the directory.
 */
module.exports.mkdir = function (path) {
    try {
        fs.statSync(path);
    } catch (e) {
        if (e.code === 'ENOENT') {
            fs.mkdirSync(path);
        }
    }
};

module.exports.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
};

module.exports.isEmpty = function (obj) {
    if (obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
};

module.exports.deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);

        files.forEach(function(file){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

module.exports.anonymousName = function() {
    var items = [
        'Ферхунде',
        'Сафрида',
        'Мехмед',
        'Онур',
        'Агадия',
        'Асылбубу',
        'Бибик',
        'Гвидон',
        'Гугуш',
        'Замзам',
        'Уии',
        'Йолопуки',
        'Какули',
        'Момик',
        'Кунигунда',
        'Педро',
        'Калистрат',
        'Ривчик'
    ];
    return items[Math.floor(Math.random()*items.length)];
};

module.exports.textValid = function(text, count) {
    if (!count) count = 998;
    return _.escape(text.substring(0, count));
};

module.exports.makeFileName = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

module.exports.errorHandler = function (err, text) {
    var error = new Date() + ': ' + text + ': ' + err + '\n';
    console.error(error);

    fs.appendFile('log.txt', error, function (err) {
        if (err) throw err;
        console.log('Error log updated');
    });
};