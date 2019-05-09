var generateRandomString = require( "./source-files/js/generateRandomString");

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	  // Metadata.
	  pkg: grunt.file.readJSON('package.json'),
	  clean: ['dist/**', 'artifact.zip'],
	  copy: {
		  main: {
			  files: [
				  {expand: true, cwd: 'source-files/', src: ['**', '!js/generateRandomString.js'], dest: 'dist/assets'},
			  ],
		  },
	  },
	  compress: {
		  main: {
			  options: {
				  archive: 'artifact.zip'
			  },
			  files: [
				  {src: ['./dist/**'], dest: '/'},
			  ]
		  }
	  },
  });

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');


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

	grunt.registerTask('licensed-artifact', "Creates licensed-artifact", function() {
		grunt.task.run( "clean", "copy", "set-secret-key", "compress" );
	} );

	grunt.registerTask('set-secret-key', "Sets a (super) secret key", function() {
		let superSecretKey = generateRandomString(64);

		let file = grunt.file.read( "dist/assets/classes/class.php");
		file = file.replace( /(\t+const\slicense_key\s=\s\")(super_secret_key_here)(\";\n)/ig, "$1" + superSecretKey + "$3" );
		grunt.file.write( "dist/assets/classes/class.php", file );

		if( ! grunt.file.exists( "license-keys.json" ) ) {
			grunt.file.write( "license-keys.json", "[]" )
		}

		let licenseKeyList = grunt.file.readJSON( "license-keys.json" );
		licenseKeyList.push( superSecretKey );
		grunt.file.write( "license-keys.json", JSON.stringify( licenseKeyList ) );
	} );
};
