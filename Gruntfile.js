/*global module:false*/
const sass = require('node-sass');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
	  copy: {
		  main: {
			  files: [
				  {expand: true, cwd: 'source-files/', src: ['**'], dest: 'dist/assets'},
			  ],
		  },
	  },
	  uglify: {
		  options: {
			  mangle: true
		  },
		  my_target: {
			  files: [{
				  expand: true,
				  cwd: 'dist/assets/js',
				  src: '*.js',
				  dest: 'dist/assets/js'
			  }]
		  }
	  },
	  sass: {
		  options: {
			  implementation: sass,
		  },
		  dist: {
			  files: {
				  'dist/assets/css/conditional-style.css': 'dist/assets/css/conditional-style.scss',
				  'dist/assets/css/style.css': 'dist/assets/css/style.scss'
			  }
		  }
	  },
	  clean: {
		  obsolete_scss: ['dist/assets/css/*.scss']
	  }
  });

  // Load tasks here.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Define aliases here.
  grunt.registerTask('artifact', [ 'copy', 'uglify', 'sass', 'clean' ] );

};
