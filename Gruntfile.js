// Обязательная обёртка
module.exports = function(grunt) {

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
					'build/scripts.min.js': '<%= concat.main.dest %>'
				}
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'scss',
					src: ['*.scss'],
					dest: 'public/css',
					ext: '.css'
				}]
			}
		},
		watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
			js: {
				files: ['<%= concat.main.src %>'],
				tasks: 'concat'
			}
		},
		//чтобы работало все параллельно
		concurrent: {
			watchServer: ["watch", "bgShell:sassWatch", "bgShell:supervisor"],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	// Загрузка плагинов, установленных с помощью npm install
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Задача по умолчанию
	grunt.registerTask('default', ['concat', 'uglify']);
	//стартуем приложение
	//reload и на клиенте и на сервере
	grunt.registerTask('server', ['concurrent:watchServer']);
};
