/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
  });

	grunt.loadNpmTasks('grunt-string-replace');

  // Define aliases here.
  grunt.registerTask('default', [ 'update-version' ] );
  grunt.registerTask('update-version', "Update version number", function( newVersion ) {
    const filesAndRegexes = [
        {
          file: "source-files/index.php",
	      regex: /(\* version:\s+)(\d\.\d\.\d(-RC\d+)*)(\n)/ig,
        },
	    {
	      file: "source-files/classes/class.php",
          regex: /(\t+const\sversion\s=\s\")(\d\.\d\.\d(-RC\d+)*)(\";\n)/ig,
	    },
	    {
		  file: "source-files/js/script.js",
		  regex: /(window\.plugin\.version\s=\s\")(\d\.\d\.\d(-RC\d+)*)(\";\n)/ig,
	    }
    ];

    filesAndRegexes.forEach( ( combination ) => {
      let file = grunt.file.read( combination.file );
      file = file.replace( combination.regex, "$1" + newVersion + "$4" );
      grunt.file.write( combination.file, file );
      } );
  } );

};
