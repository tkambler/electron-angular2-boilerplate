'use strict';

const path = require('path');
require('module').globalPaths.push(path.resolve(__dirname, 'build'));
require('./build');
