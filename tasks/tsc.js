'use strict';

module.exports = (grunt) => {

    grunt.registerTask('tsc', function() {

        const done = this.async();
        const path = require('path');

        grunt.util.spawn({
            'cmd': path.resolve(__dirname, '../node_modules/.bin/tsc')
        }, (err, res, code) => {
            if (err) {
                return grunt.fatal(new Error(res.stderr + "\n" + res.stdout));
            }
            done();
        });

    });

};
