/*global module:false*/
var sass = require('node-sass');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
      copy: {
	      main: {
		      files: [
			      {expand: true, cwd: './source-files', src:'**/*.js', dest: 'dist/assets/', filter: 'isFile'},
			      {expand: true, src: ['./index.html'], dest: 'dist/', filter: 'isFile'},
		      ],
	      },
      },
	  sass: {
		  options: {
			  implementation: sass,
			  outputStyle: 'expanded',
		  },
		  dist: {
			  files: {
				  './dist/assets/style.css': './source-files/style.scss'
			  }
		  }
	  },
	  compress: {
		  main: {
			  options: {
				  archive: 'archive.zip'
			  },
			  files: [
				  {src: ['./dist/**'], dest: '/'},
			  ]
		  }
	  }
  });

  // Load tasks here.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', ['copy', 'sass', 'compress']);

};
