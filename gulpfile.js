var gulp = require('gulp'),
	minifyHTML = require('gulp-minify-html'),
	webserver = require('gulp-webserver'),
	livereload =require('gulp-livereload'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
	minifyCSS = require('gulp-minify-css'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer =require('vinyl-buffer'),
	uglify = require('gulp-uglifyjs'),
	imageOP = require('gulp-image-optimization'),
	smoosher = require('gulp-smoosher');

config ={
	rutserver:{
		watch: './build'
	},
	html:{
		main: './src/index.html',
		watch: './src/**/*.html',
		output: './build'
	},
	styles:{
		main: './src/styles/estilos.styl',
		watch: ['./src/styles/**/*.styl','./src/styles/**/*.css'],
		output: './build/css'
	},
	scripts:{
		main: './src/scripts/main.js',
		watch: './src/scripts/**/*.js',
		output: './build/js'
	},
	images:{
		watch: ['./build/images/**/*.png','./build/images/**/*jpg'],
		output: './dist/images'
	},
	smooshtml:{
		main: './build/index.html',
		output: './dist'
	}
}

gulp.task('server', function(){
	gulp.src(config.rutserver.watch)
		.pipe(webserver({
			host: '0.0.0.0',
			port: 9000,
		}));
});

gulp.task('build:html', function(){
	gulp.src(config.html.main)
		.pipe(minifyHTML())
		.pipe(gulp.dest(config.html.output))
		.pipe(livereload());
});

gulp.task('build:css', function(){
	gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css': true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output))
		.pipe(livereload());
});

gulp.task('build:js', function(){
	return browserify(config.scripts.main)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output))
		.pipe(livereload());
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(config.html.watch, ['build:html']);
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.scripts.watch, ['build:js']);
});

gulp.task('imageOP', function(){
	gulp.src(config.images.watch)
		.pipe(imageOP({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(config.images.output));
});
// smoother lo estoy utilizando para el utimo paso antes de el despliege al servidor
// gulp smoosh    (antes de ejecutar entrar a build y poner las etiquetas <!--smoosh --><!-- endsmoosh -->)
gulp.task('smoosh', function(){
	gulp.src(config.smooshtml.main)
		.pipe(smoosher())
		.pipe(gulp.dest(config.smooshtml.output));
});

gulp.task('build',['build:html', 'build:css', 'build:js']);
gulp.task('default', ['server','watch', 'build']); ///mirar watch