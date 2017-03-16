/**
 * Created by MEAN Factory on 6/28/16.
 */

var fs      = require('fs'),
    path    = require('path'),
    pkg     = require('./package.json');

var folders = {
    build       : './build/',
    dist        : './dist/',
    root        : './',
    temp        : './.tmp/',
};

var files = {
    js : {
        all : [
            folders.root + '**/*.js',
            '!' + folders.dist + '**/*.*',
            '!' + folders.root + 'docker/**/*.*',
            '!' + folders.root + 'node_modules/**/*.*',
            '!' + folders.root + 'bower_components/**/*.*'
        ],
        included : [
            '**/*.module.js',
            '**/*.js'
        ],
        excluded : [
            '!' + folders.root + 'docker/**/*.*',
            '!' + folders.root + 'node_modules/**/*.*',
            '!' + folders.root + 'bower_components/**/*.*'
        ],
        mine : [
            folders.root + 'src/**/*.module.js',
            folders.root + 'src/**/*.js'
        ],
    }
};

var config = {

    solutionName    : pkg.name,

    files: files,
    folders: folders,

    packages: [
        folders.root + 'bower.json',
        folders.root + 'package.json'
    ],

};

config.getDirectories = getDirectories;
config.getFilePaths = getFilePaths;

module.exports = config;

function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(function(file) {
        return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
}

function getFilePaths (fileNode, appPath) {
    if (!config.files[fileNode].included && !config.files[fileNode].excluded) { return null; }
    var result = [];
    [].concat(config.files[fileNode].included).forEach(function(suffixOrPath){
        if (suffixOrPath.indexOf('*') === 0) {
            result.push(path.join(appPath, suffixOrPath));
        } else if (suffixOrPath.length > 0) {
            result.push(suffixOrPath);
        }
    });
    [].concat(config.files[fileNode].excluded).forEach(function(suffixOrPath){
        if (suffixOrPath.indexOf('*') === 0) {
            result.push('!' + path.join(appPath, suffixOrPath));
        } else if (suffixOrPath.length > 1 && suffixOrPath.indexOf('!') === 0) {
            result.push(suffixOrPath);
        } else if (suffixOrPath.length > 1) {
            result.push('!' + suffixOrPath);
        }
    });
    return result;
}
