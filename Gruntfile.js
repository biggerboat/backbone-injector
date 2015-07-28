module.exports = function (grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; \n*/\n',

		uglify: {
			dist: {
				files: {
					'<%= pkg.name %>.min.js': '<%= pkg.name %>.js'
				},
				options: {
					banner:'<%= banner %>'
				}
			}
		},

		copy: {
			backboneInjector: {
				src: ['<%= pkg.name %>.js', '<%= pkg.name %>.min.js'],
				dest: 'public/js/dist/'
			}
		},

		watch: {
			files: ['public/js/*.js'],
			tasks: ['uglify:dist', 'copy:backboneInjector']
		},

		bump: {
			options: {
				files: ['package.json', 'bower.json'],
				updateConfigs: ["pkg","banner"],
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json', 'bower.json', '<%= pkg.name %>.min.js', '<%= pkg.name %>.js', 'public/js/dist/<%= pkg.name %>.min.js', 'public/js/dist/<%= pkg.name %>.js'], // '-a' for all files
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin master',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['uglify', 'copy']);

	grunt.registerTask('release', ['default','bump-commit']);
	grunt.registerTask('release:patch', ['bump-only:patch','release']);
	grunt.registerTask('release:minor', ['bump-only:minor','release']);
	grunt.registerTask('release:major', ['bump-only:major','release']);
};
