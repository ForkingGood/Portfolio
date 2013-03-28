$(document).ready(function() {
	//		Hide all middle info
	$('section > article').css('display', 'none');
	//		If it has hash tag in url, open up sections necessary
	if(window.location.hash) {
		var scroll2 = window.location.hash.replace('#scroll2', '');
		//		Open content area if necessary
		if (scroll2.substring(0, 3) == 'W-P') {
			$('section > .work').fadeIn();
		}
		else {
			$('section > .' + scroll2).fadeIn();
		}
		//		Check if footer anchor should appear
		if (scroll2 == 'Home' || scroll2 == 'Contact') {
			$('footer > .go2Menu').fadeOut();
		}
		else {
			$('header').fadeOut();
			$('footer > .go2Menu').fadeIn();
		}
	}
});

$(window).load(function() {
	//		Call window resize to initialize size of windows
	winResize();
	//		Call window scroll to initialize position of work nav
	winScroll();
	//	Shift anchors in projects to slide in better position
	$('a[name=wanchor]').css('position', 'absolute').css('margin-top', -700);

	//	When the main menu clicks
	$('nav > .mainNavs > a, nav > a').click(mainMenuClick);

	//	When window resizes
	$(window).resize(winResize);

	//	When user submit email form
	$("footer > form").submit(sendEmail);
});

function funBubble(b) {
	var ranTop = Math.floor(Math.random()* b.height());
	var ranLeft = Math.floor(Math.random()* b.width());

	
}

$(window).scroll(winScroll);

function winScroll() {
	var topPadding = 30;

	if ($(window).scrollTop() + topPadding <= $('.navStartHere').offset().top || $('.workNavItems').css('display') == 'none') {
		$('.workNav').stop().animate({top: topPadding});
		//$('.workNav').stop().css('top', topPadding);
	}
	else {
		var newPos = $(window).scrollTop() + topPadding - $('.navStartHere').offset().top;
		$('.workNav').stop().animate({top: newPos});
		//$('.workNav').stop().css('top', newPos);
	}

	//	If a little pass nav, snap to it
/*			var nowPos = $(window).scrollTop();
	setTimeout(function() { 
		if ($(window).scrollTop() > $('nav').offset().top - 200 && $(window).scrollTop() < $('nav').offset().top - 5 && $(window).scrollTop() != $('nav').offset().top) {
			//alert(nowPos + " <> " + $('nav').offset().top);
			nowPos = 0;
			var newScrollTop = $('header').height();
			$('body').stop().animate({scrollTop: newScrollTop}, {complete: function() { }});
		}
	}, 3000);
// GLITCHY */
}

function mainMenuClick(e) {
	var clicked = $(this).attr('name').replace('#', '');
	if (clicked == 'contact') {
		//	Just needs to jump there
	}
	else if (clicked == 'home') {
		$('section > article').stop(true, true).slideUp(1000);
		$('header').slideDown(1000);
		$('footer > .go2Menu').fadeOut();
	}
	else {
		$('header').slideUp(1000);
		$('section > article:not(.' + clicked + ')').stop(true, true).fadeOut();
		$('section > .' + clicked).stop(true, true).fadeIn(2000);
		$('footer > .go2Menu').fadeIn();

		/*if (clicked == 'resume') {
			$('section > .resume > .resumeDisplay').html("<img class='loadingResume' src='src/img/loading2.gif' alt='loading, please wait...' />");
			$.ajax({
				type: "GET", 
				url: 'src/docs/displayResume.html', 
				context: document.body
			}).done(function(data) {
				$('section > .resume > .resumeDisplay').html(data);
			}).fail(function() {
				$('section > .resume > .resumeDisplay').html('<iframe src="src/docs/resume.pdf" width="900px" height="80%"></iframe>');
			});
		}*/
	}
}

function sendEmail(e) {
	//	Display loading + remove previous result
	$(this).children('img[name=loading]').css('display', 'inline');
	$(this).children('label[name=result]').text('');
	//	Disable refresh
	e.preventDefault();
	//	Disable all email parts first
	$(this).children('input[name=name]').attr('disabled', 'disabled');
	$(this).children('input[name=email]').attr('disabled', 'disabled');
	$(this).children('textarea[name=msg]').attr('disabled', 'disabled');
	$(this).children('input[type=submit]').attr('disabled', 'disabled');
	//	Do email stuff here
	var POSTemail = $.ajax({
		type: 'POST',
		url: 'sendEmail.php',
		data: { 
			name: $(this).children('input[name=name]').val(),
			email: $(this).children('input[name=email]').val(),
			msg: $(this).children('textarea[name=msg]').val()
		}
	});
	
	POSTemail.done(function(msg) {
		//	Remove Loading
		setTimeout(function () {
			$("footer > form").children('img[name=loading]').css('display', 'none');
			$("footer > form").children('label[name=result]').css('color', 'green').text("Sent");
		}, 1000);
		//	Enable all email parts again
		$("footer > form").children('input[name=name]').removeAttr('disabled').text('');
		$("footer > form").children('input[name=email]').removeAttr('disabled').text('');
		$("footer > form").children('textarea[name=msg]').removeAttr('disabled');
		$("footer > form").children('input[type=submit]').removeAttr('disabled');
	});

	POSTemail.fail(function(jqXHR, textStatus) {
		//	Remove Loading
		setTimeout(function () {
			$("footer > form").children('img[name=loading]').css('display', 'none');
			$("footer > form").children('label[name=result]').css('color', 'red').text("Error : Please try again later.");
		}, 1000);
		//	Enable all email parts again
		$("footer > form").children('input[name=name]').removeAttr('disabled');
		$("footer > form").children('input[name=email]').removeAttr('disabled');
		$("footer > form").children('textarea[name=msg]').removeAttr('disabled');
		$("footer > form").children('input[type=submit]').removeAttr('disabled');
	});
}

function winResize () {
	//	Resize header page and content page
	$('header').height($(window).height() - $('nav').height());
	$('section > article').css('min-height', $(window).height() - $('nav').height());

	//	If browser window gets too small
	//		hide social links
	if ($('nav').width() < 1451) {
		$('nav > .social').css('display', 'none');
		$('nav > .mainNavs').css('float', 'right').css('margin-left', '0');
	}
	else {
		$('nav > .social').css('display', 'inline-table');
		$('nav > .mainNavs').css('float', 'none').css('margin-left', '110px');
	}
	//		hide smaller text of logo in nav
	if ($('body').width() < 1115) {
		$('nav h2').css('display', 'none');
	}
	else {
		$('nav h2').css('display', 'inline');
	}
	//		Remove float right from mainNavs
	if ($('body').width() < 808) {
		$('nav > .mainNavs').css('float', 'none');
	}
	//		hide 'My Work' left nav
	if ($('body').width() < 1020) {
		$('.workNavItems').css('display', 'none');
		$('.projectList').css('margin-left', 0);
		$('.workNav').stop().css('top', 30);
	}
	else {
		$('.workNavItems').css('display', 'block');
		$('.projectList').css('margin-left', 300);
		winScroll();
	}
}