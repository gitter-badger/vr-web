module.exports = function(grunt) {

	// configuracion del proyecto
	grunt.initConfig({
		// metadatos
		leerJson: grunt.file.readJSON('package.json'),
		banner: '/**\n' +
				'* <%= leerJson.name %> v<%= leerJson.version %> por @fizzvr\n' +
				'*/\n',
		frontendConfig: {
			webroot: './out',
			srcWebroot: './src/public'
		},
		// tarea de copia de los archivos 3rd party desde bower
		copy: {
			main: {
				files: [
				//bauserif fuente
				{
					expand: true,
					flatten: true,
					src: ["./src/public/css/tipo/bauserif.*"],
					dest: './out/cvr'
				},
				//jquery bower list --path
				{
					expand: true,
					flatten: true,
					src: ["bower_components/jquery/dist/jquery.min.js",
					"bower_components/jquery/dist/jquery.min.map"],
					dest: './out/act/jquery/'
				},
				//bootstrap bower list --path
				{
					expand: true,
					flatten: true,
					src: ["bower_components/bootstrap/dist/js/bootstrap.min.js"],
					dest: './out/act/bs3/'
				},
				{
					expand: true,
					flatten: true,
					src: ["bower_components/bootstrap/dist/css/bootstrap.min.css",
						"bower_components/bootstrap/dist/css/bootstrap-theme.min.css"],
					dest: './out/act/bs3/css/'
				},
				{
					expand: true,
					flatten: true,
					src: ["bower_components/bootstrap/dist/fonts/*"],
					dest: './out/act/bs3/fonts/'
				},
				//flexslider bower list --path
				{
					expand: true,
					flatten: true,
					src: ["bower_components/flexslider/flexslider.css",
					"bower_components/flexslider/jquery.flexslider.js"],
					dest: './out/act/fs/'
				},
				{
					expand: true,
					flatten: true,
					src:["bower_components/flexslider/fonts/*"],
					dest: './out/act/fs/fonts/'
				},
				//prettyPhoto bower list --path
				{
					expand: true,
					flatten: true,
					src: ["bower_components/jquery-prettyPhoto/js/jquery.prettyPhoto.js"],
					dest: './out/act/pp/'
				},
				{
					expand: true,
					flatten: true,
					src: ["bower_components/jquery-prettyPhoto/css/*"],
					dest: './out/act/pp/css/'
				},
				{
					expand: true,
					cwd: 'bower_components/jquery-prettyPhoto/images/prettyPhoto/',
					src: ['**'],
					dest: './out/act/pp/images/prettyPhoto/'
				}

				]
			}
		},
		// tarea de distribucion JS y CSS minified
		frontend: {
			main: {
				css: {
					src: 'src/public/css/',
					dest: 'out/cvr/'
				},
				js: {
					files: {
						'out/jvr/vrweb.js': [
							'src/public/js/ana.js',
							'src/public/js/jsvr.js'
						]
					}

				}
			}
		},
		// validacion HTML
		validation: {
			options: {
				reset: true
			},
			files: {
				src:['out/**/*.html']
			}
	    }
		/*compress: {
      		target: {
        			files: {
          				'pack/<%= pkg.name %>.v<%= pkg.version %>.zip': ['prod/**']
        			}
      			}
    	}*/
	});

	// carga de los plugins para el proyecto
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-frontend');
	grunt.loadNpmTasks('grunt-html-validation');

	// validar html
	grunt.registerTask('validar-html', ['validation']);
	// distribucion JS y CSS
	grunt.registerTask('dist-jscss', ['frontend']);
	// distribucion de los activos
	grunt.registerTask('dist-activos', ['copy']);
	// distribucion FULL
	grunt.registerTask('dist-full', ['dist-activos', 'dist-jscss', 'validar-html']);
	// tarea por default
	grunt.registerTask('default', ['dist-full']);
};
