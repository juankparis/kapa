var $ = require('jquery');
	
	var $Header = $("#Header"),
		$HeadericonMenuInput = $( ".Header-iconMenuInput" ),
		$Menu = $("#Menu"),
		$inicio = $("#inicio"),
		$home = $("#home"),
		$creditos = $("#creditos"),
		$menuClick = $("#menuClick"),
		$Headerbuscar = $("#Header-buscar"),
		$abrirBuscar = $("#abrirBuscar"),
		$from = $("#from"),
		$Leer = $("#leer"),
		$Cont = $("#Cont"),
		$ingresar = $("#ingresar"),
		$ContInfo = $("#ContInfo"),
		$ContInfoMovie = $(".ContInfo-movie"),
		$ContInfoAtras = $("#ContInfo-atras");

(function(){

	var loadCSS = require('./lib/loadCSS');
	loadCSS('https://fonts.googleapis.com/css?family=Open+Sans|Lato:700italic');

	var loadHeadImg = require('./lib/loadHeadImg');
	loadHeadImg('./images/logoWebmagazine.png');

	var ajax = require('./lib/ajax');
	ajax();

	//menu
	$menuClick.on('click', menuAbrir);

	function menuAbrir(){
		$Menu.toggleClass("U-toggleMenu");
	}
	//barra de buscar
	$abrirBuscar.on('click', abrirBuscar);

	function abrirBuscar() {
		$from.toggleClass("U-toggleBuscar")
			.find("input").toggleClass("U-toggleWidth");
	}

	$ingresar.on('click', entrar);
	$home.on('click', entrar); 

	function entrar(){
		$Menu.removeClass("U-toggleMenu");
		$HeadericonMenuInput.prop( "checked", false );
		$Cont.find(".Cont-inicio").addClass("U-borderEntrar");
		$Header.removeClass("U-z-index")
		$Cont.find(".Cont-contCreditos").removeClass("U-topCero");
			setTimeout(
					function() {
						$Header.removeClass("U-creditos");
						$Cont.find(".Cont-inicioHeader").addClass("U-displayNone");
						$Headerbuscar.removeClass("U-visibility");
						$Cont.find(".Cont-inicioInfo").fadeOut();
						$Cont.find(".Cont-inicio").addClass("U-widhtCero");
						$Cont.find(".Cont-inicioLogo").addClass("U-logo");
					}, 300);
	}

	$inicio.on('click', inicio);

	function inicio(){
		$Menu.removeClass("U-toggleMenu");
		$HeadericonMenuInput.prop( "checked", false );
		$Cont.find(".Cont-inicioInfo").fadeIn();
		$Cont.find(".Cont-inicio").removeClass("U-widhtCero");
		$Cont.find(".Cont-inicioLogo").removeClass("U-logo");
		$Cont.find(".Cont-contCreditos").removeClass("U-topCero");		
		$Header.removeClass("U-z-index");
			setTimeout(
					function () {
						$Header.removeClass("U-creditos");
						$Headerbuscar.removeClass("U-visibility");
						$Cont.find(".Cont-inicio").removeClass("U-borderEntrar");
						$Cont.find(".Cont-inicioHeader").removeClass("U-displayNone");	
					},300);
	}

	$Cont.find(".Header-iconMenu").on('click',mensaje)
	
	function mensaje() {
		alert("ingresa primero y conoce nuestros servicios");
	}

	$creditos.on('click', creditos);
	
	function creditos(){
		$Menu.removeClass("U-toggleMenu");
		$HeadericonMenuInput.prop( "checked", false );
		$Header.addClass("U-creditos");
		$Headerbuscar.addClass("U-visibility");
		$Cont.find(".Cont-inicio").removeClass("U-widhtCero");
		$Cont.find(".Cont-inicioLogo").addClass("U-logo2");
		setTimeout(
			function(){
				$Cont.find(".Cont-inicio").removeClass("U-borderEntrar");
				$Cont.find(".Cont-contCreditos").addClass("U-topCero");
			},300);
	}

	$Cont.on('click', '.Cont-articleInfoButton', function(e){
		e.preventDefault();
		var $contThis = $(this);
		var pos = $contThis.offset();
		var posY = (e.pageY)
		posY -=90;
		// console.log(posY);
		$contThis.parent().parent().next(".ContInfo").css("margin-top", posY);

		// console.log($(this).parent().parent().next('.ContInfo'));
		$contThis.parent().parent().next(".ContInfo").addClass("U-expandirArticleMovie");
		setTimeout(
				function(){
					// console.log($cont_this.parent().parent().next('.ContInfo'));
					$contThis.parent().parent().next(".ContInfo").addClass("U-expandirArticleMovie2");
					$contThis.parent().parent().next(".ContInfo").children().fadeIn("slow");
				}, 300);
	});

	$Cont.on('click', '.ContInfo-atras', function(e){
		e.preventDefault();
		var $contThisBack = $(this);
		// console.log($(this).parent().parent());

		$contThisBack.parent().parent().removeClass("U-expandirArticleMovie2");
		$contThisBack.parent().parent().children().fadeOut('slow');
		setTimeout(
				function(){
					$contThisBack.parent().parent().removeClass("U-expandirArticleMovie");
				}, 300);
	});

}());