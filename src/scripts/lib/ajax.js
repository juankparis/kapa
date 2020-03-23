var $ = require('jquery');

var ajax = function () {
	/////////////////////shows //////////////
	
	var $Cont = $("#Cont"),
		$Headerbuscar = $("#Header-buscar");

	function renderShows(shows) {
		shows.forEach(function(show){
			var article =template
				.replace(':name:', show.name)
				.replace(':img:', show.image.original)
				.replace(':img alt:', show.name + " logo")
				.replace(':language:', show.language);

			$Cont.append($(article));
			// $(article).appendTo($Cont);

			var article2 =template2
				.replace(':name:', show.name)
				.replace(':imgl:', show.image.original)
				.replace(':img alt:', show.name + " logo")
				.replace(':language:', show.language)
				.replace(':genres:', show.genres)
				.replace(':status:', show.status)
				.replace(':Scheduled:', show.schedule.days + ' at time: '+ show.schedule.time)
				.replace(':timezone:', show.network.country.timezone)
				.replace(':summary:', show.summary)
				.replace(':weight:', show.weight)
				.replace(':rating:', show.rating.average);

			$Cont.append($(article2));
			// $(article2).appendTo($Cont);
		})
	}
	// function renderShowslib(shows) {
	// 	shows.forEach(function (show) {
	// 	})
	// }
// buscar shows
	$Headerbuscar.find("form").submit(function(ev){
		ev.preventDefault();

		var busqueda = $(this)
			.find('input[type="text"]')
			.val();
		var borrar = $(this)
			.find('input[type="text"]')
			.val('');
			// alert("buscaron " + busqueda);
			$Cont.find('.Cont-article').remove();
			var $loader = $('<div class="loader"></div>');
			$loader.appendTo($Cont);
		$.ajax({
			url: 'http://api.tvmaze.com/search/shows',
			data:{ q: busqueda },
			success: function (res, textStatus, xhr) {
				// console.log(res);
				$loader.remove();
				if(res == 0){
					template3.appendTo($Cont);
				}else{
					template3.remove();
					var shows = res.map(function(el){
						return el.show;
					})
					renderShows(shows);
				}
			}
		})
	});

// template
	var template = '<article class="Cont-article">' +
			'<figure class="Cont-articleFigure">' +
				'<img src=":img:" alt=":img alt:" width="80" height="100">' +
			'</figure>' +
			'<div class="Cont-articleInfo">' +
				'<h2 class="Cont-articleInfoTitle">:name:</h2>' +
				'<h4 class="Cont-articleInfoAutor">:language:</h4>' +
				'<a class="Cont-articleInfoButton icon-plus" id="leer">Leer</a>' +
			'</div>' +
		'</article>';

	var template2='<article class="ContInfo" id="ContInfo">' +
			'<div class="ContInfo-movie">' +
				'<img src=":imgl:" alt=":img alt:" width="50" height="50">' +
				'<div class="ContInfo-movieInfo">' +
					'<h2 class="Cont-articleInfoTitle">:name:</h2>' +
					'<h4 class="Cont-articleInfoAutor">:language:</h4>' +
					'<h4 class="Cont-articleInfoAutor"><span>genres: </span>:genres:</h4>' +
					'<h4 class="Cont-articleInfoAutor"><span>Status: </span>:status:</h4>' +
					'<h4 class="Cont-articleInfoAutor"><span>Scheduled: </span>:Scheduled:</h4>' +
					'<h4 class="Cont-articleInfoAutor"><span>timezone: </span>:timezone:</h4>' +
					'<h4 class="Cont-articleInfoAutor"><span>Official site:</span> <a href="#">www.cwtv.com</a></h4>' +
					'<div class="ContInfo-movieInfoSumary">' +
						'<p>:summary:</p>' +
					'</div>' +
					'<h4 class="ContInfo-movieInfoVotes"><span>Votes: </span>:weight:</h4>' +
					'<h4 class="ContInfo-movieInfoStars icon-star">:rating:</h4>' +
				'</div>' +
				'<div class="ContInfo-atras icon-collapse" id="ContInfo-atras"></div>' +
			'</div>' +
		'</article>';

	var template3= $('<div class="SearchNone">' +
			'<h4 class="SearchNone-face icon-sad"></h4>' +
			'<h4 class="SearchNone-info">lo sentimos no hemos encontrado en nuestra base de datos esta serie, intenta con las iniciales u otras series mas que están esperando para ti</h4>' +
		'</div>');
// ingreso de localStorage
	if(!localStorage.shows){
		// shows con ajax promises
		$.ajax('http://api.tvmaze.com/shows')
			.then(function(shows){
				$Cont.find('.loader').remove();
				localStorage.shows = JSON.stringify(shows);
				renderShows(shows);
			})
	}else{
		setTimeout(function () {
			$Cont.find('.loader').remove();
			renderShows(JSON.parse(localStorage.shows));
		}, 1);
	}
/*
// shows con ajax
	$.ajax({
		url: 'http://api.tvmaze.com/shows',
		success: function(shows, textStatus, xhr){
			// console.log(shows);
			$Cont.find('.loader').remove();
			renderShows(shows);
		}
	})
*/
}

module.exports = ajax;