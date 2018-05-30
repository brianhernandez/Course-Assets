module.exports = function(grunt) {

  // Project configuration.
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Config will go here
    cssmin: {
      all: {
        files: {
          'dest/app.min.css': ['styles/*.css']
        }
      }
    },
    uglify: {
      all: {
        files: {
          'dest/app.min.js': ['js/*.js']
        }
      }
    },
    htmllint: {
      all: ['*.html']
    },
    csslint: {
      all: {
        src: ['styles/*.css']
      }
    },
    sass: {
      all: {
        files: {
          'styles/style.css': 'sass/style.scss'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/*.js'],
      options: { /* ... */ },
      // Note the new target here
      dev: {
        force: true
      }
    },
    jasmine: {
      all: {
        src: ['js/*.js'],
        options: {
          specs: ['spec/**/*Spec.js']
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,                  // Enable globbing
          src: ['img/*.{png,jpg,gif}'],  // Glob patterns to match
          dest: 'dest/'                  // Destination directory
        }]
      }
    },
    version: {
      src: ['package.json', 'index.html'],
      options: {
        prefix: '[\\?]?version[\\\'"]?[=:]\\s*[\\\'"]?'
      }
    },
    exec: {
      add: 'git add .', // Add all changed files in this directory to the commit
      commit: 'git commit -am "Releasing <%= pkg.version %>"', // Actually make the commit
      push: 'git push' // Send our changes to the repository
    },
    // ... Rest of the config
    watch: {
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint:dev'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', function () {
    console.log('Grunt has run');
  });
  grunt.registerTask('minify', function (full) {
    if (full) {
      grunt.task.run(['cssmin', 'uglify', 'imagemin']);
    } else {
      grunt.task.run(['cssmin', 'uglify']);
    }
  });
  grunt.registerTask('deploy', function (releaseType) {
    if (!releaseType) {
      releaseType = 'patch';
    }
    grunt.task.run(['version::' + releaseType, 'exec:add', 'exec:commit', 'exec:push']);
  });
};
