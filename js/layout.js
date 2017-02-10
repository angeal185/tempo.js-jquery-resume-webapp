jQuery(document).ready(function($) {

    "use strict";
    var title = $('html head').find('title').text();
    var Page = (function() {

        var $container = $('#hs-container'),
                $scroller = $container.find('div.hs-content-scroller'),
                $menu = $container.find('aside'),
                $links = $menu.find('nav > a'),
                $articles = $container.find('div.hs-content-wrapper > article'),
                $toTop = $container.find('a.hs-totop-link'),
                History = window.History,
                animation = {speed: 800, easing: 'easeInOutQuad'},
        scrollOptions = {verticalGutter: 0, hideFocus: false, contentWidth: '0px'},
        init = function() {
            _initCustomScroll();
            _initEvents();
            _layout();
            _goto();

        },
                _initCustomScroll = function() {
                    if ($(window).width() > 755) {
                        $articles.jScrollPane(scrollOptions);
                    }
                    $menu.children('nav').jScrollPane(scrollOptions);
                },
                _goto = function(section) {

                    var section = section || History.getState().url.queryStringToJSON().section,
                            isHome = (section === undefined),
                            $article = $(section ? '#' + 'section' + section : '#' + 'section1');
                    if ($article.length) {
                        var left = $article.position().left,
                                top = $article.position().top,
                                is_v = ($(document).height() - $(window).height() > 0),
                                param = (is_v) ? {scrollTop: (isHome) ? top : top + $menu.outerHeight(true)} : {scrollLeft: left},
                        $elScroller = (is_v) ? $('html, body') : $scroller;
                        $elScroller.stop().animate(param, animation.speed, animation.easing);
                        $('nav a').removeClass('active-sec');
                        $('.hs-content .sec-icon').removeClass('active-sec');
                        $('[href="' + "#" + $article.attr("id") + '"]').addClass('active-sec');
                        $("#" + $article.attr("id") + ' .sec-icon').addClass('active-sec');
                    }
                    $('html head').find('title').text(title);
                },
                _saveState = function(section) {

                    if (History.getState().url.queryStringToJSON().section !== section) {

                        History.pushState(null, null, '?section=' + section);
                    }
                },
                _layout = function() {
                    var windowWidth = $(window).width();
                    switch (true) {

                        case (windowWidth <= 755) :
                            $scroller.scrollLeft(0).css('overflow', 'visible');
                            break;
                        case (windowWidth <= 1024):
                            $scroller.css('overflow-x', 'scroll');
                            break;
                        case (windowWidth > 1024) :
                            $scroller.css('overflow', 'hidden');
                            break;
                    }
                    ;
                },
                _initEvents = function() {

                    _initWindowEvents();
                    _initMenuEvents();
                    _initArticleEvents();
                    _initArrowEvents();
                },
                _initWindowEvents = function() {

                    $(window).on({
                        // depending on the screen size
                        'smartresize': function(event) {
                            _layout();
                            $('article.hs-content').each(function() {

                                var $article = $(this),
                                        aJSP = $article.data('jsp');

                                if ($(window).width() > 755) {

                                    (aJSP === undefined) ? $article.jScrollPane(scrollOptions) : aJSP.reinitialise();

                                    _initArticleEvents();
                                }
                                else {
                                    if (aJSP !== undefined)
                                        aJSP.destroy();
                                    $container.off('click', 'article.hs-content');
                                }

                            });
                            var nJSP = $menu.children('nav').data('jsp');
                            nJSP.reinitialise();
                            _goto();
                        },
                        'statechange': function(event) {

                            _goto();
                        }
                    });
                },
                _initMenuEvents = function() {

                    $links.on('click', function(event) {

                        var href = $(this).attr('href'),
                                section = (href.search(/section/) !== -1) ? href.substring(8) : 0;
                        _saveState(section);

                        return false;
                    });

                    $('.home').on('click',function() {
                        _saveState(1);
                    });

                    $('.contact-button').on('click',function() {
                        _saveState(8);
                    });

                    $(window).on('scroll',function() {
                        if ($(this).scrollTop() > 100) {
                            $toTop.fadeIn();
                        } else {
                            $toTop.fadeOut();
                        }
                    });
                    $toTop.on('click', function(event) {

                        $('html, body').stop().animate({scrollTop: 0}, animation.speed, animation.easing);

                        return false;
                    });
                    $('html head').find('title').text(title);
                },
                _initArticleEvents = function() {

                    $container.on('click', 'article.hs-content', function(event) {

                        var id = $(this).attr('id'),
                                section = (id.search(/section/) !== -1) ? id.substring(7) : 0;
                        _saveState(section);
                    });
                },
                _initArrowEvents = function() {

                    $container.on("click", ".previous-page", function(event) {
                        $(".next-page").css("color", "#878e98");
                        var section = section || History.getState().url.queryStringToJSON().section;
                        if (section == undefined) {
                            _saveState(1);
                        } else {
                            if (section != 1) {
                                _saveState(section - 1);
                                
                                if ((section - 1) == 1) {
                                    console.log("kayna");
                                    $(".previous-page").css("color", "#D2D6DB");
                                }
                            }
                        }
                        return false;
                    });
                    $container.on("click", ".next-page", function(event) {
                        $(".previous-page").css("color", "#878e98");
                        var section = section || History.getState().url.queryStringToJSON().section;

                        if (section == undefined) {
                            _saveState(2);
                        } else {
                            if (section != $articles.length) {
                                _saveState(section + 1);
                                if ((section + 1) == $articles.length) {
                                    $(".next-page").css("color", "#D2D6DB");
                                }
                            }
                        }
                        return false;
                    });

                    $(".hs-content-scroller").on('scroll',function() {
                        var section = section || History.getState().url.queryStringToJSON().section;

                        if ((section) != 1 || (section != $articles.length)) {
                            $(".previous-page").css("color", "#878e98");
                            $(".next-page").css("color", "#878e98");
                        }
                        if ((section) == 1) {
                            $(".previous-page").css("color", "#D2D6DB");
                            $(".next-page").css("color", "#878e98");
                        }
                        if (section == $articles.length) {
                            $(".previous-page").css("color", "#878e98");
                            $(".next-page").css("color", "#D2D6DB");
                        }
                    });

                        var section = section || History.getState().url.queryStringToJSON().section;
                        if (section == undefined)
                        {
                            section = 1;
                        }
                        if ((section) != 1 || (section != $articles.length)) {
                            $(".previous-page").css("color", "#878e98");
                            $(".next-page").css("color", "#878e98");
                        }
                        if ((section) == 1) {
                            $(".previous-page").css("color", "#D2D6DB");
                            $(".next-page").css("color", "#878e98");
                        }
                        if (section == $articles.length) {
                            $(".previous-page").css("color", "#878e98");
                            $(".next-page").css("color", "#D2D6DB");
                        }

                };
        return {init: init};
    })();
    Page.init();
});