'use strict';

module.exports = (grunt) => {

    require('load-grunt-tasks')(grunt, {
        'pattern': [
            'grunt-*',
            'grunt-contrib-*'
        ]
    });

    grunt.config.init({
        'compass': {
            'all': {
                'options': {
                    'httpPath': '/',
                    'cssDir': 'app/css',
                    'sassDir': 'app/scss',
                    'imagesDir': 'app/images',
                    'cacheDir': 'app/.sass-cache',
                    'relativeAssets': true,
                    'outputStyle': 'compressed',
                    'importPath': [
                        'node_modules',
                        'app/node_modules'
                    ],
                    'specify': [
                        'app/scss/style.scss'
                    ]
                }
            }
        },
        'clean': {
            'js': {
                'src': [
                    'app/build/**/*',
                ]
            },
            'css': {
                'src': [
                    'app/css',
                    'app/.sass-cache'
                ]
            },
            'fonts': {
                'src': [
                    'app/fonts'
                ]
            }
        },
        'copy': {
            'font-awesome-fonts': {
                'expand': true,
                'cwd': 'app/node_modules/font-awesome/fonts',
                'src': '**',
                'dest': 'app/fonts'
            },
            'bootstrap-fonts': {
                'expand': true,
                'cwd': 'app/node_modules/bootstrap-sass/assets/fonts/bootstrap',
                'src': '**',
                'dest': 'app/fonts'
            },
            'js': {
                'expand': true,
                'cwd': 'app/src',
                'src': '**/*.js',
                'dest': 'app/build'
            }
        },
        'watch': {
            'options': {
                'interrupt': true
            },
            'css': {
                'files': [
                    'app/scss/**/*.scss'
                ],
                'tasks': ['compass']
            },
            'typescript': {
                'options': {
                },
                'files': [
                    'app/src/**/*.ts',
                    'app/src/**/*.js'
                ],
                'tasks': ['clean:js', 'tsc', 'copy:js']
            }
        },
        'concurrent': {
            'serve': {
                'tasks': ['watch', 'launch'],
                'options': {
                    'logConcurrentOutput': true
                }
            }
        }
    });

    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['clean', 'tsc', 'copy', 'compass']);
    grunt.registerTask('default', ['build', 'concurrent']);

};
