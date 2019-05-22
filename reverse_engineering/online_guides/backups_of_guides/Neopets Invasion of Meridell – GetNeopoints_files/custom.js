(function($){

	$.shopIsleShopPage = {
		sidebarToggle: function ( ) {
			if ( $( '.sidebar-shop' ).length <= 0 ) {
				return;
			}

			var sidebarOrientation = 'left';

			if ( $( 'body.rtl' ).length !== 0 ) {
				sidebarOrientation = 'right';
			}

			$( '.shop-isle-sidebar-open' ).click(function(){
				$( '.sidebar-shop' ).css( sidebarOrientation, '0' );
			});

			$( '.shop-isle-sidebar-close' ).click(function(){
				$( '.sidebar-shop' ).css(sidebarOrientation, '-100%');
			});

			$(window).resize(function (  ) {
				$( '.sidebar-shop' ).css( sidebarOrientation, '-100%' );
				if( $(window).width() > 768 ){
					$( '.sidebar-shop' ).css( sidebarOrientation, '0' );
				}
			});
		}
	};
	$( window ).load(function(){
		$.shopIsleShopPage.sidebarToggle();
	});

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$( window ).load(
		function() {
			$( '.loader' ).fadeOut();
			$( '.page-loader' ).delay( 350 ).fadeOut( 'slow' );
		}
	);



	$( document ).ready(
		function() {

			/* ---------------------------------------------- /*
			* Initialization General Scripts for all pages
			/* ---------------------------------------------- */

			var homeSection = $( '.home-section' ),
			navbar          = $( '.navbar-custom' ),
			navHeight       = navbar.height(),
			width           = Math.max( $( window ).width(), window.innerWidth ),
			mobileTest;

			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent )) {
				mobileTest = true;
			}

			buildHomeSection( homeSection );
			navbarAnimation( navbar, homeSection, navHeight );
			navbarSubmenu( width );
			hoverDropdown( width, mobileTest );

			$( window ).resize(
				function() {
					var width = Math.max( $( window ).width(), window.innerWidth );
					buildHomeSection( homeSection );
					hoverDropdown( width, mobileTest );
				}
			);

			$( window ).scroll(
				function() {
					effectsHomeSection( homeSection, this );
					navbarAnimation( navbar, homeSection, navHeight );
				}
			);

			/* ---------------------------------------------- /*
			* Home section height
			/* ---------------------------------------------- */

			function buildHomeSection(homeSection) {
				if (homeSection.length > 0) {
					if (homeSection.hasClass( 'home-full-height' )) {
						homeSection.height( $( window ).height() );
					} else {
						if ( ! homeSection.hasClass( 'home-slider-plugin' ) ) {
							homeSection.height( $( window ).height() * 0.85 );
						}
					}
				} else {
					if ( $( 'body.home' ).length > 0 && homeSection.length < 1 ) {
						// $('.main').css('margin-top', $('.navbar-custom').outerHeight() );
					}
				}
			}

			/* ---------------------------------------------- /*
			* Home section effects
			/* ---------------------------------------------- */

			function effectsHomeSection(homeSection, scrollTopp) {
				if (homeSection.length > 0) {
					var homeSHeight = homeSection.height();
					var topScroll   = $( document ).scrollTop();
					if ( ( homeSection.hasClass( 'home-parallax' ) ) && ( $( scrollTopp ).scrollTop() <= homeSHeight ) ) {
						$( '.home-slider-overlay' ).css( 'opacity', ( 0.3 + 0.7 * topScroll / $( window ).height() ) );
					}
					if (homeSection.hasClass( 'home-fade' ) && ($( scrollTopp ).scrollTop() <= homeSHeight)) {
						var caption = $( '.caption-content' );
						caption.css( 'opacity', (1 - topScroll / homeSection.height() * 1) );
					}
				}
			}

			/* ---------------------------------------------- /*
			* Intro slider setup
			/* ---------------------------------------------- */

			if ( $( '.hero-slider' ).length > 0 ) {
				$( '.hero-slider' ).flexslider(
					{
						animation: 'fade',
						animationSpeed: 1000,
						animationLoop: true,
						prevText: '',
						nextText: '',
						before: function(slider) {
							$( '.hs-caption' ).fadeOut().animate( {top:'-80px'},{queue:false, easing: 'swing', duration: 700} );
							slider.slides.eq( slider.currentSlide ).delay( 500 );
							slider.slides.eq( slider.animatingTo ).delay( 500 );
						},
						after: function() {
							$( '.hs-caption' ).fadeIn().animate( {top:'0'},{queue:false, easing: 'swing', duration: 700} );
						},
						useCSS: true
					}
				);
			}
			
			/* ---------------------------------------------- /*
			* Youtube video background
			/* ---------------------------------------------- */

			$(
				function(){
					$( '.video-player' ).YTPlayer();
				}
			);

			$( '#video-play' ).click(
				function(event) {
					event.preventDefault();
					if ($( this ).hasClass( 'fa-play' )) {
						$( '.video-player' ).playYTP();
					} else {
						$( '.video-player' ).pauseYTP();
					}
					$( this ).toggleClass( 'fa-play fa-pause' );
					return false;
				}
			);

			$( '#video-volume' ).click(
				function(event) {
					event.preventDefault();
					$( '.video-player' ).toggleVolume();
					$( this ).toggleClass( 'fa-volume-off fa-volume-up' );
					return false;
				}
			);

			/* ---------------------------------------------- /*
			* Transparent navbar animation
			/* ---------------------------------------------- */

			function navbarAnimation(navbar, homeSection, navHeight) {

				var topScroll = $( window ).scrollTop();
				if (navbar.length > 0 && homeSection.length > 0) {
					if (topScroll >= navHeight) {
						navbar.removeClass( 'navbar-transparent' );
					} else {
						navbar.addClass( 'navbar-transparent' );
					}
				} else {
					navbar.removeClass( 'navbar-transparent' );
				}
			}

			/* ---------------------------------------------- /*
			* Navbar submenu
			/* ---------------------------------------------- */

			function navbarSubmenu(width) {
				if (width > 768) {
					$( '.navbar-custom .navbar-nav > li.menu-item-has-children' ).on(
						'click mouseover', function() {
							var MenuLeftOffset  = $( '.sub-menu', $( this ) ).offset().left;
							var Menu1LevelWidth = $( '.sub-menu', $( this ) ).width();
							if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
								$( this ).children( '.sub-menu' ).addClass( 'leftauto' );
							} else {
								$( this ).children( '.sub-menu' ).removeClass( 'leftauto' );
							}
							if ($( '.menu-item-has-children', $( this ) ).length > 0) {
								var Menu2LevelWidth = $( '.sub-menu', $( this ) ).width();
								if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
									$( this ).children( '.sub-menu' ).addClass( 'left-side' );
								} else {
									$( this ).children( '.sub-menu' ).removeClass( 'left-side' );
								}
							}
						}
					);
				}
			}

			/* ---------------------------------------------- /*
			* Navbar hover dropdown on desktop
			/* ---------------------------------------------- */

			function hoverDropdown(width, mobileTest) {
				if ((width > 768) && (mobileTest !== true)) {
					$( '.navbar-custom .navbar-nav > li, .navbar-custom li.dropdown > ul > li' ).removeClass( 'open' );
					var delay = 0;
					var setTimeoutConst;
					$( '.navbar-custom .navbar-nav > li, .navbar-custom li > ul > li' ).hover(
						function() {
							var $this       = $( this );
							setTimeoutConst = setTimeout(
								function() {
									$this.addClass( 'open' );
									$this.find( '.dropdown-toggle' ).addClass( 'disabled' );
								}, delay
							);
						},
						function() {
							clearTimeout( setTimeoutConst );
							$( this ).removeClass( 'open' );
							$( this ).find( '.dropdown-toggle' ).removeClass( 'disabled' );
						}
					);
				} else {
					$( '.navbar-custom .navbar-nav > li, .navbar-custom li > ul > li' ).unbind( 'mouseenter mouseleave' );
					$( '.navbar-custom [data-toggle=dropdown]' ).not( '.binded' ).addClass( 'binded' ).on(
						'click', function(event) {
							event.preventDefault();
							event.stopPropagation();
							$( this ).parent().siblings().removeClass( 'open' );
							$( this ).parent().siblings().find( '[data-toggle=dropdown]' ).parent().removeClass( 'open' );
							$( this ).parent().toggleClass( 'open' );
						}
					);
				}
			}

			/* ---------------------------------------------- /*
			* Navbar collapse on click
			/* ---------------------------------------------- */

			$( document ).on(
				'click','.navbar-collapse.in',function(e) {
					if ( $( e.target ).is( 'a' ) && $( e.target ).attr( 'class' ) !== 'dropdown-toggle' && ! $( 'body' ).hasClass( 'mega-menu-primary' ) ) {
						$( this ).collapse( 'hide' );
					}
				}
			);

			/* ---------------------------------------------- /*
			* Set sections backgrounds
			/* ---------------------------------------------- */

			var module = $( '.home-section, .module, .module-small, .side-image' );
			module.each(
				function() {
					if ($( this ).attr( 'data-background' )) {
						$( this ).css( 'background-image', 'url(' + $( this ).attr( 'data-background' ) + ')' );
					}
				}
			);

			/* ---------------------------------------------- /*
			* Testimonials, Post sliders
			/* ---------------------------------------------- */

			if ($( '.testimonials-slider' ).length > 0 ) {
				$( '.testimonials-slider' ).flexslider(
					{
						animation: 'slide',
						smoothHeight: true,
					}
				);
			}

			$( '.post-images-slider' ).flexslider(
				{
					animation: 'slide',
					smoothHeight: true,
				}
			);	

			/* ---------------------------------------------- /*
			* Owl slider
			/* ---------------------------------------------- */

			$( '.owl-carousel' ).each(
				function() {

					// Check items number
					var items = 5;
					if ($( this ).data( 'items' ) > 0) {
						items = $( this ).data( 'items' );
					}
					
					// Check pagination true/false
					var pagination;
					if (($( this ).data( 'pagination' ) > 0) && ($( this ).data( 'pagination' ) === true)) {
						pagination = true;
					} else {
						pagination = false;
					}

					// Check navigation true/false
					var navigation;
					if (($( this ).data( 'navigation' ) > 0) && ($( this ).data( 'navigation' ) === true)) {
						navigation = true;
					} else {
						navigation = false;
					}

					// Check rtl true/false
					var rtl;
					if (($( this ).data( 'rtl' ) > 0) && ($( this ).data( 'rtl' ) === true)) {
						rtl = true;
					} else {
						rtl = false;
					}

					// Build carousel
					$( this ).owlCarousel(
						{
							loop: (items > 5) ? true:false,
							autoplay:true,
							autoplayTimeout: 5000,
							autoplayHoverPause: true,
							dots: pagination,
							dotsSpeed: 400,
							items: items,
							rtl: rtl,
							nav: false,
							dotsEach: 1,
							navText: ['',''],
							responsiveClass: true,
							responsive:{
								0:{
									items:2,
								},
								768: {
									items: 2,
								},
								992: {
									items: 5,
								}
							}
						}
					);
				}
			);

			/* ---------------------------------------------- /*
			* Video popup, Gallery
			/* ---------------------------------------------- */

			$( '.video-pop-up' ).magnificPopup(
				{
					type: 'iframe',
				}
			);

			$( 'a.gallery' ).magnificPopup(
				{
					type: 'image',
					gallery: {
						enabled: true,
						navigateByImgClick: true,
						preload: [0,1]
					},
					image: {
						titleSrc: 'title',
						tError: 'The image could not be loaded.',
					}
				}
			);

			/* ---------------------------------------------- /*
			* A jQuery plugin for fluid width video embeds
			/* ---------------------------------------------- */

			$( 'body' ).fitVids();

			/* ---------------------------------------------- /*
			* Open tabs by external link
			/* ---------------------------------------------- */

			$( '.open-tab' ).click(
				function (e) {
					var pattern   = /#.+/gi;
					var contentID = e.target.toString().match( pattern )[0];
					$( '.nav-tabs a[href="' + contentID + '"]' ).tab( 'show' );
				}
			);

			/* ---------------------------------------------- /*
			* Scroll Animation
			/* ---------------------------------------------- */

			$( '.section-scroll' ).bind(
				'click', function(e) {
					var anchor = $( this );
					$( 'html, body' ).stop().animate(
						{
							scrollTop: $( anchor.attr( 'href' ) ).offset().top - 50
						}, 1000
					);
					e.preventDefault();
				}
			);

			/* ---------------------------------------------- /*
			* Scroll top
			/* ---------------------------------------------- */

			$( window ).scroll(
				function() {
					if ($( this ).scrollTop() > 100) {
						$( '.scroll-up' ).fadeIn();
					} else {
						$( '.scroll-up' ).fadeOut();
					}
				}
			);

			$( 'a[href="#totop"]' ).click(
				function() {
					$( 'html, body' ).animate( { scrollTop: 0 }, 'slow' );
					return false;
				}
			);

			/* ---------------------------------------------- /*
			* Dropdown mennu on tablet
			/* ---------------------------------------------- */

			var $menuBtnChildren = $( '.menu-item-has-children' ),
			submenuOpenClass     = 'open',
			$thisParent,
			$menuWrap            = $( '.header-menu-wrap' );
			$menuBtnChildren.click(
				function(event){
					if ( mobileTest && ! $( this ).hasClass( submenuOpenClass ) && window.innerWidth > 768 ) {
						$thisParent = $( this ).parent( 'ul' ).parent( 'li' );
						if ( $thisParent.hasClass( submenuOpenClass ) ) {
							$thisParent.find( '.' + submenuOpenClass ).removeClass( submenuOpenClass );
						} else {
							$menuWrap.find( '.' + submenuOpenClass ).removeClass( submenuOpenClass );
						}
						$( this ).addClass( submenuOpenClass );
						event.stopPropagation();
						return false;
					}
				}
			);

			$( 'html,body,.main,.navbar-custom,.bottom-page-wrap' ).click(
				function(){
					$menuWrap.find( '.' + submenuOpenClass ).removeClass( submenuOpenClass );
				}
			);

			/* Visible arrow on mobile */
			if ( mobileTest === true && $( '.flex-direction-nav' ).length > 0 && $( 'ul.slides > li' ).length > 1 ) {
				$( '.flex-direction-nav' ).addClass( 'visible-arrow' );
			}

		}
	);

	// fix rating on iOS
	document.addEventListener("touchstart",function() {}, false);

	// turn lables into placeholders on review form
	$( '#review_form form :input' ).not('#subscribe_blog').each(
		function(index, elem) {
			var eId   = $( elem ).attr( 'id' );
			var label = null;
			if (eId && (label = $( elem ).parents( 'form' ).find( 'label[for=' + eId + ']' )).length === 1) {
				$( elem ).attr( 'placeholder', $( label ).text() );
				$( label ).remove();
			}
		}
	);

	$( '#map' ).click(
		function(event){
			$( '.shop_isle_pro_map_overlay' ).css( 'display','none' );
			event.stopPropagation();
		}
	);

	$( 'html' ).click(
		function(){
			$( '.shop_isle_pro_map_overlay' ).css( 'display','block' );
		}
	);

	if (typeof $( '.wr-megamenu-container' ) !== 'undefined') {
		$( '.wr-megamenu-container' ).addClass( 'bg-tr' );
	}

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match( /Android/i );
		},
		BlackBerry: function() {
			return navigator.userAgent.match( /BlackBerry/i );
		},
		iOS: function() {
			return navigator.userAgent.match( /iPhone|iPad|iPod/i );
		},
		Opera: function() {
			return navigator.userAgent.match( /Opera Mini/i );
		},
		Windows: function() {
			return navigator.userAgent.match( /IEMobile/i );
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	if ( isMobile.iOS() ) {
		$( '#ribbon' ).addClass( 'ribbon-ios' );
	}

	if ( isMobile.Windows() && $( '.navbar-cart' ).length > 0 ) {
		$( '.navbar-header' ).css(
			{
				'float': 'left',
				'padding-left': '100px',
				'margin-left': '-100px',
			}
		);
	}

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args        = arguments;
            clearTimeout( timeout );
            timeout = setTimeout(
                function () {
                    timeout = null;
                    if ( ! immediate) {
                        func.apply( context, args );
                    }
                }, wait
            );
            if (immediate && ! timeout) {
                func.apply( context, args );
            }
        };
    }

	var transparent = true;

	if ($( '.navbar-color-on-scroll' ).length !== 0) {

		var navbarHome       = $( '.navbar-color-on-scroll' ),
			headerWithTopbar = 0;

		if ( navbarHome.hasClass( 'header-with-topbar' ) ) {
			headerWithTopbar = 40;
		}

		$( window ).on(
			'scroll', debounce(
				function () {
					if ($( document ).scrollTop() > headerWithTopbar) {
						if (transparent) {
							transparent = false;
							navbarHome.removeClass( 'navbar-transparent' );
							navbarHome.addClass( 'navbar-not-transparent' );
						}
					} else {
						if ( ! transparent) {
							transparent = true;
							navbarHome.addClass( 'navbar-transparent' );
							navbarHome.removeClass( 'navbar-not-transparent' );
						}
					}
				}, 17
			)
		);
	}

	// Check if header has topbar and add extra class
	var navbar            = $( '.navbar' ),
		navbarScrollPoint = 0;

    // Get window width
    function getWidth() {
        if (this.innerWidth) {
            return this.innerWidth;
        }

        if (document.documentElement && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        }

        if (document.body) {
            return document.body.clientWidth;
        }
    }

	function checkNavbarScrollPoint() {
		if ( $( '.navbar-header' ).length !== 0 ) {

			// Window width bigger or equal with 768px
			if (getWidth() >= 768) {
				if (typeof $( '.navbar-header' ).offset() !== 'undefined') {
					navbarScrollPoint = $( '.navbar-header' ).offset().top; // Distance from top to the bottom of the logo
				}

				// Check if topbar is active when navbar is left aligned
				if ( $( '.shop_isle_left.header-with-topbar' ).length !== 0 || $( '.full-screen-menu.header-with-topbar' ).length !== 0 ) {
					navbarScrollPoint = 40;
				}

				// Window width less than 768px
			} else {
				// Check if topbar is active
				if ($( '.header-with-topbar' ).length !== 0) {
					navbarScrollPoint = 40; // Topbar height
					// Topbar disabled
				} else {
					navbarScrollPoint = 0;
				}
			}
		}
	}
	checkNavbarScrollPoint();

	// On screen resize recalculate navbarScrollPoint
	$( window ).resize(
		function () {
			checkNavbarScrollPoint();
		}
	);
	
	// On screen scroll add scroll-related class
	$( window ).on(
		'scroll', function () {
			if ($( document ).scrollTop() >= navbarScrollPoint) {
				navbar.addClass( 'navbar-scroll-point' );
				if ( typeof $( '#home .hero-slider' ) !== 'undefined' ) {
                    $('#home .hero-slider').addClass('slider-scroll-point');
                }
			} else {
				navbar.removeClass( 'navbar-scroll-point' );
                if ( typeof $( '#home .hero-slider' ) !== 'undefined' ) {
                    $('#home .hero-slider').removeClass('slider-scroll-point');
                }
			}
		}
	);

})( jQuery );