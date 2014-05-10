// Обязательная обёртка
module.exports = function(grunt) {

	// Задачи
	grunt.initConfig({

		bgShell: {
			//Запускаем приложение с помощью supervisor'a
			//Теперь при изменении серверного кода
			//сервер перезапускается автоматически
			supervisor: {
				cmd: 'supervisor server/server.js',
				stdout: true,
				stderr: true,
				bg: true
			}
		},
		//настраиваем reload
		//сервер приложения крутится на localhost:3000
		//переходим на localhost:6001 и получаем то же приложение только с LiveReload
		reload: {
			port: 6001,
			proxy: {
				host: 'localhost',
				port: 3000
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
			js: {
				files: ['<%= concat.main.src %>'],
				tasks: 'concat'  // Можно несколько: ['lint', 'concat']
			},
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}

		},
		connect: {
			test: {
				options: {
					port: 8009,
					base: '.'
				}
			}
		}
	});

//  Загрузка плагинов, установленных с помощью npm install
//	grunt.loadNpmTasks('grunt-contrib-concat');
//	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-watch');
//	grunt.loadNpmTasks('grunt-contrib-connect');
	// Загрузка плагинов, установленных с помощью npm install
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Задача по умолчанию
	grunt.registerTask('default', ['concat', 'uglify']);
	//стартуем приложение
	//reload и на клиенте и на сервере
	grunt.registerTask('server', ['bgShell:supervisor', 'watch']);
};
