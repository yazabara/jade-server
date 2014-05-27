// Обязательная обёртка
module.exports = function (grunt) {

	// Задачи
	grunt.initConfig({

		bgShell: {
			//сервер
			supervisor: {
				cmd: 'supervisor server/server.js',
				stdout: true,
				stderr: true,
				bg: false
			},
			"sassWatch": {
				"bg": false,
				"cmd": "sass --watch scss:/public/css"
			},
			"sassCompile": {
				"cmd": "sass --update scss:/public/css"
			}
		},
		// Склеиваем
		concat: {
			main: {
				src: [
					'js/**/*.js'  // Все JS-файлы в папке
				],
				dest: 'public/js/scripts.js'
			}
		},
		// Сжимаем
		uglify: {
			main: {
				files: {
					// Результат задачи concat
					'release/js/scripts.js': '<%= concat.main.dest %>'
				}
			}
		},
		sass: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'scss',
						src: ['*.scss'],
						dest: 'public/css',
						ext: '.css'
					}
				]
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: 'sass:dist'
			},
			js: {
				files: ['<%= concat.main.src %>'],
				tasks: 'concat'
			}
		},
		copy:{
			"images": {
				"files": [{
					"expand": true,
					"cwd": "public/images/",
					"src": ["**"],
					"dest": "release/images/"
				}]
			},
			"libs": {
				"files": [{
					"expand": true,
					"cwd": "public/lib/",
					"src": ["**"],
					"dest": "release/lib/"
				}]
			},
			"css": {
				"files": [{
					"expand": true,
					"cwd": "public/css/",
					"src": ["common.css","grids.css"],
					"dest": "release/css/"
				}]
			}
		},
		jade: {
			"options": {
				"pretty" : true,
				"amd": true,
				"compileDebug": false
			},
			"compile": {
				"files": [{
					"expand": true,
					"cwd": "./jade/",
					"src": ["*.jade"],
					"dest": "./release/",
					"ext" : ".html"
				}]
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'release/css/',
				src: ['*.css'],
				dest: 'release/css/',
				ext: '.css'
			}
		},
		//чтобы работало все параллельно
		concurrent: {
			watchServer: ['watch', "bgShell:sassWatch", "bgShell:supervisor"],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	// Загрузка плагинов, установленных с помощью npm install
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Задача по умолчанию
	grunt.registerTask('default', ['concat', 'uglify']);

	grunt.registerTask('server', ['concurrent:watchServer']);

	grunt.registerTask('release', ['jade','sass','uglify','copy','cssmin']);
};
