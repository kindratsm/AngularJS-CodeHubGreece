module.exports = function (grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // HTTP server on http://localhost:8000
        connect: {
            'server': {
                options: {
                    port: 8000,
                    protocol: 'http',
                    hostname: '127.0.0.1',
                    base: 'src',
                    livereload: true
                }
            },
            'server-build': {
                options: {
                    port: 8001,
                    protocol: 'http',
                    hostname: '127.0.0.1',
                    base: 'build',
                    livereload: true
                }
            }
        },
        // check JavaScript files syntax
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                esversion: 6,
                node: true,
                browser: true
            }
        },
        // watches
        watch: {
            // watch changes in JavaScript files to perform jshint
            scripts: {
                files: '**/*.js',
                tasks: ['jshint'],
                options: {
                    interrupt: true,
                },
            },
            // watch changes in html/js/css files to perform livereload
            livereload: {
                files: ['**/*.html', '**/*.js', '**/*.css'],
                options: {
                    livereload: true
                }
            }
        },
        // clean directories
        clean: {
            build: ['build/'],
            temp: ['temp/']
        },
        uglify: {
            my_target: {
                files: {
                    'build/lib/script.min.js': ['src/lib/*.js']
                }
            }
        },
        // concat and minify CSS
        cssmin: {
            target: {
                files: {
                    'build/lib/style.min.css': ['src/lib/*.css']
                }
            }
        },
        // copy stream files (images, etc.)
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/files', src: ['**'], dest: 'build/files' }
                ],
            },
        },
        // process index.html to apply concat and minified js/css files
        processhtml: {
            dist: {
                files: {
                    'temp/index.html': ['src/index.html']
                }
            }
        },
        // minify index.html
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'temp/index.html'
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-processhtml');

    // Tasks
    grunt.registerTask('server', ['connect:server', 'watch']);
    grunt.registerTask('server-build', ['connect:server-build', 'watch']);
    grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'cssmin', 'processhtml', 'htmlmin', 'copy', 'clean:temp']);
};