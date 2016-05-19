module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    webpack: {
      options: require('./webpack.config.js'),
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['bundle.js'],
        dest: 'dist/<%= pkg.name %>.js',
      },
    },

    nodemon: {
      dev: {
        script: 'server/server.js',
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
        },
      },
    },

    eslint: {
      target: [
        'client/**/*.js',
        'server/*.js',
      ],
      options: {
        force: 'true',
        eslintrc: '.eslintrc',
        ignores: [],
      },
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
      },
      target: {
        files: [{
          expand: true,
          cwd: 'client',
          src: ['style/style.css'],
          dest: 'dist',
          ext: '.min.css',
        }],
      },
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify',
        ],
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin'],
      },
    },

    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['eslint', 'webpack', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('test', ['eslint']);
  grunt.registerTask('build', ['webpack', 'concat', 'uglify', 'cssmin']);
  grunt.registerTask('uploadProd', ['shell:prodServer']);

  grunt.registerTask('upload', () => {
    if (grunt.option('prod')) {
      grunt.task.run(['uploadProd']);
    } else {
      grunt.task.run(['server-dev']);
    }
  });

  grunt.registerTask('server-dev', () => {
    // Running nodejs in a different process and displaying output on the main console
    const nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon',
    });

    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run(['watch']);
  });

  grunt.registerTask('deploy', ['build', 'upload']);
};

// mocha: {
  //   test: {
  //     options: {
  //       reporter: 'spec'
  //     },
  //     src: ['test/**/*.js']
  //   }
  // },
