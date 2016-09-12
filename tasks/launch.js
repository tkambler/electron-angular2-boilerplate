'use strict';

module.exports = (grunt) => {

    let os = require('os');
    let path = require('path');
    let spawn = require('child_process').spawn;

    grunt.registerTask('launch', function() {

        let done = this.async();

        grunt.option('env', grunt.option('env') || 'development');

        if (['production', 'development'].indexOf(grunt.option('env')) < 0) {
            return grunt.fatal(new Error(`Unknown environment: ${grunt.option('env')}`));
        }

        let electronBinary;

        switch (os.platform()) {
            case 'darwin':
                electronBinary = path.resolve('node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron');
            break;
            case 'win32':
                electronBinary = path.resolve('node_modules/electron-prebuilt/dist/electron.exe');
            break;
            default:
                return grunt.fatal(new Error(`Unknown platform: ${os.platform()}`));
            break;
        }

            let spawned = spawn(electronBinary, [
                '.'
            ], {
                'env': {
                    'ELECTRON_ENABLE_LOGGING': 1,
                    'ELECTRON_ENABLE_STACK_DUMPING': 1,
                    'NODE_ENV': 'development'
                },
                'cwd': 'app'
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
                        return grunt.fail.fatal(new Error('Electron exited normally.'));
                    break;
                    default:
                        return grunt.fail.fatal(new Error('Electron exited with status code: ' + code.toString()));
                    break;
                }
            });

    });

};
