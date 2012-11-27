(function() {

	/*///////////////////
	// BEGIN FUNCTIONS //
	///////////////////*/

	function getRandomInt(min, max) {  													// random number getting function
		var $width 	=	Math.floor(Math.random() * (max - min + 1)) + min;  

		if($width <= 0) {
			$width = 1;
		}

		return $width;
	}

	/*///////////////////
	/// END FUNCTIONS ///
	///////////////////*/

	/*///////////////////
	// BEGIN COOL SHIT //
	///////////////////*/

	$('.fancy-banner').css("height", 44);

	var appMaker	=
		{
			body		: 	$('body'),
			colors		: 	$('.color'),
			colorCount	: 	$('.color').length,
			overBanner	: 	false,
			fancyBanners: 	$('.fancy-banner')
								.on("mouseenter", function(e){
									var $this 	=	appMaker;

									$this.overBanner = true;
									$this.togglePrev();
								})
								.on("mouseleave", function(e){
									var $this 	=	appMaker;

									$this.overBanner = false;
									$this.togglePrev();
								}),
			logoBanner	:	$('#logo-wrap'),											// find the logo dealy section
			windowWidth :	window.innerWidth,											// grab the window width
			modulus		:	"",															// find how many time the number of .color items can fit into the page with
			remainder	:	this.windowWidth % this.colorCount,							// find the remainder space between the browser width and list of anchors
			variant		:	5,
			resizeDelay	: 	400,
			fancyLabel 	: $('<a></a>', {
								class: 	"fancyLabel",	// name it
								css: { left: 0 }
							}),

			init 		: 	function(){
				var $this 	=	this;
				
				function resizeStuff() {
					if($this.windowWidth != window.innerWidth) {
						$this.resize($this);
					}
				}

				var TO = false;

				$(window).resize(function(){
					if(TO !== false)
					clearTimeout(TO);
					TO = setTimeout(resizeStuff, $this.resizeDelay); //200 is time in miliseconds
				});

				this.fancyLabel
					.appendTo(this.logoBanner)
					.hide();

				this.fancyLabelWidth	=	this.fancyLabel.width();

				this.modulus = Math.floor(this.windowWidth / this.colorCount);

				this.create();

				this.fancyBanners.slideDown(500);

				$('#about-link, .paperclip-back').animate({
					top: 20
				}, 500);
			},
			create 		: 	function(){
				var $this	=	this;

				$this.linkClassList	= new Array();

				$.each($this.colors, function( k, v ){
					var $color 		=	$(v),
						$text		=	$color.attr("id"),								// <li id="$text">
						$hex		=	$color.find("h3").html();						// <h3>
						$link 		=	$('<a></a>', {
												href: "#" + $text,						// set the relative link to the the .color item
												html: $hex,								// set the html to the hex title
												css: {
													"height": 		"100%",
													"width": 		1,					// standard width
													"background": 	$hex				// color
												},
												class: "quick-link " + $text
										})
										.on("mouseenter mouseleave", function(e){
											$this.markHovering($(this), e);
										})
										.appendTo($this.fancyBanners),
						$className	=	$link.attr("class").split(" "),
						$search		=	"";

					$.each($className, function( k, v ){								// find like elements
						$search	   +=	"." + v;
					});

					$this.linkClassList.push($($search));
				});
				$this.resize($this);
			},
			resize 		: 	function($this){
				var $this 			=	this;

				$this.windowWidth 	= 	window.innerWidth;

				var $difference		=	window.innerWidth;

				$.each($this.linkClassList, function( k, v ){
					$thisWidth	=	getRandomInt(
										$this.modulus-$this.variant,				// lowest int
										$this.modulus+$this.variant					// highest int
									);

					$(v).css("width", $thisWidth);
					$difference -= $thisWidth;
				});

				$this.removeExtraSpace($this, $difference);
			},
			removeExtraSpace	: function($this, $difference){
				var $dif	=	$difference;
				$abs	=	Math.abs($difference);

				if($dif != 0) {
					if($dif < 0) {		// subtract width
						for (var i = $abs; i > 0; i--) {
							var $arrPos =	getRandomInt(1, $this.colorCount),
								$obj	=	$($this.linkClassList[$arrPos]),
								$width 	=	"";

							if($obj != undefined) {
								$width 	=	$obj.width();

								if($obj.width() >= 1) {
									$obj.css("width", $width-1 );
									$dif = $dif-1;
								}
							}
						}

					} else {
						for(var i = $abs; i > 0; i--) {
							var $arrPos =	getRandomInt(1, $this.colorCount),
								$obj	=	$($this.linkClassList[$arrPos]),
								$width 	=	"";

							if($obj != undefined) {
								$width 	=	$obj.width();

								$obj.css("width", $width+1 );

								$dif = $dif+1;
							}
						}
					}
				}
			},
			togglePrev 	: 	function(){
				var $this 	=	this;

				if($this.overBanner == true) {
					$this.fancyLabel.show();
				} else {
					$this.fancyLabel.hide();
				}
			},
			markHovering: 	function($target, $event){
				var $this 		=	this,
					$singleTar	=	$($target),
					$hex		=	$singleTar.html(),
					$colorClass	=	$singleTar.attr("class").split(" "),
					$colorName	=	$colorClass[1],
					$target		=	$('.' + $target.attr("class").replace(" ", ".")),
					$eventType	=	$event.type,
					$labelWidth =	$this.fancyLabelWidth,
					$left		=	$singleTar.position()
										.left
										-	($labelWidth / 2)
										+ 	($singleTar.width() / 2);

				if($left <= 0) {
					$left = 0;
				} else if (($left + $labelWidth) >= $this.windowWidth) {
					$left =	$this.windowWidth - $labelWidth;
				}

				if($eventType == "mouseenter") {
					$target.addClass("hovering");
				} else {
					$(".hovering").removeClass("hovering");
				}

				this.fancyLabel
					.html($colorName)
					.css({
						"background-color": $hex,
						left	: 	$left
					});
			}
		}

	appMaker.init();

	/*///////////////////
	/// END COOL SHIT ///
	///////////////////*/

	/*///////////////////
	/// BEGIN MORE JS ///
	///////////////////*/


	// var $title
	var showAbout	=	{
		aboutLink 	: 	$('#about-link')
							.on("click", function(e){
								e.preventDefault();
								showAbout.hideShow();
							}),
		aboutContent: 	$('.about-content'),
		topSpacer 	: 	$($('.fancy-banner.top')[0]),
		isShowing	: 	false,
		zIndexs		: 	{},

		init 	: 	function(){
			this.zIndexs.zlink	=	this.aboutLink.css("z-index");
			this.zIndexs.xbio	=	this.aboutContent.css("z-index");

			this.spacerHeight	= 	this.topSpacer.height();
		},
		hideShow: function() {
			var $this 	=	this;

			if($this.isShowing == false) {
				$this.aboutContent
						.stop()
						.animate({
							"height": 110
						}, 500);	
			} 

			$this.topSpacer
				.stop()
				.animate({
					height: 250
				}, 500, function(){

				if($this.isShowing == false) {
					$this.isShowing 	= 	true;

					$this.aboutLink
						.css("z-index", 31);

					$this.aboutContent
						.css({
							"z-index": 10
						});	

				} else {
					$this.isShowing	=	false;

					$this.aboutLink
						.css("z-index", $this.zIndexs.zlink);

					$this.aboutContent
						.css({
							"z-index": $this.zIndexs.xbio
						})
						.stop()
						.animate({
							"height": 0
						}, 500);
				}

				$this.topSpacer
						.stop()
						.animate({
							height: 44
						}, 500);
			});
		}
	}

	showAbout.init();

	/*
	// preload images
	*/
	$.fn.preload = function() {
	    this.each(function(){
	        $('<img/>')[0].src = this;
	    });
	}

	$( ['/img/fancyBanner.png', 
		'/img/fancyBanner@2x.png',
		'/img/fancyAbout.png',
		'/img/fancyAbout@2x.png',
		'/img/fancyAbout-hovering.png',
		'/img/fancyAbout-hovering@2x.png',
		'/img/fancyAbout-active.png',
		'/img/fancyAbout-active@2x.png',
		'/img/fancyAbout-clipBG.png',
		'/img/fancyAbout-clipBG@2x.png']).preload();
})(jQuery);


