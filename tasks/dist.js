'use strict';

module.exports = (grunt) => {

    let os = require('os');
    let path = require('path');
    let spawn = require('child_process').spawn;

    grunt.registerTask('dist', function() {

        let done = this.async();

        let spawned = spawn('npm', [
            'run',
            'dist'
        ], {
        });

        spawned.stdout.on('data', (data) => {
            grunt.log.writeln(data);
        });

        spawned.stderr.on('data', (data) => {
            grunt.log.writeln(data);
        });

        spawned.on('close', (code) => {
            switch (code) {
                case 0:
                    return done();
                break;
                default:
                    return grunt.fail.fatal(new Error('Distribution process exited with status code: ' + code.toString()));
                break;
            }
        });

    });

};
