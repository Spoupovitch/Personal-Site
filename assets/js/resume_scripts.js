//load spinner animation
const spinner = document.getElementById("spinner");
let ctr = 0;
let runID = setInterval(function() {
	ctr -= 5;
	spinner.style.transform = 'scale(2) rotate(' + ctr + 'deg)';
}, 15);
setTimeout(function(){
	clearInterval(runID);
}, 1500);

//hide scroll bar during loading
document.documentElement.style.overflowY = 'hidden';

const loadTime = 1750;
//load screen animation
const loadingDiv = document.querySelectorAll("div.load_screen");
function moveLoadScreen() {
	setTimeout(function() {
		loadingDiv.forEach((loadScreen) => {
			loadScreen.classList.add('remove');
		});
		//reveal scroll bar
		document.documentElement.style.overflowY = 'visible';
		//scroll to top on page poad
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}, loadTime);
	animateBio();
}
window.addEventListener('load', moveLoadScreen());

//preload themes
function preloadToggle() {
	let runID = setInterval(function() {
		toggleBG();
	}, 400);

	setTimeout(function() {
		clearInterval(runID);
	}, 1600 + 100);
}
window.addEventListener('load', preloadToggle());


//bio animations
function animateBio() {
	const bioWeb1 = document.getElementById("bio_web_1");
	const bioWeb2 = document.getElementById("bio_web_2");
	const bioSwe1 = document.getElementById("bio_swe_1");
	const bioSwe2 = document.getElementById("bio_swe_2");

	let staggerBio = 2500;

	//delayed 2.5s
	setTimeout(function() {
		bioWeb1.classList.remove('hide');
	}, staggerBio);

	//delayed 3.5s
	staggerBio += 1000;
	setTimeout(function() {
		bioWeb2.classList.remove('hide');
	}, staggerBio);

	//delayed 5.5s
	staggerBio += 2000;
	setTimeout(function() {
		bioSwe1.classList.remove('hide');
	}, staggerBio);

	//delayed 6.5s
	staggerBio += 1000;
	setTimeout(function() {
		bioSwe2.classList.remove('hide');
	}, staggerBio);
}

//toggle site theme
function toggleBG() {
	let body, sky, banner, city, profile_pic;
	body = document.getElementById("body");
	sky = document.getElementById("sky");
	banner = document.getElementById("mid_banner");
	city = document.getElementById("city");
	profile_pic = document.getElementById("profile_pic");

	//use sky as representative to get current mode for all
	let skyTheme = sky.className;

	if (skyTheme === "dark-mode") {
		body.className = "light-mode";
		sky.className = "light-mode";
		banner.className = "light-mode";
		city.className = "light-mode";
		profile_pic.className = "light-mode";
	}
	else {
		body.className = "dark-mode";
		sky.className = "dark-mode";
		banner.className = "dark-mode";
		city.className = "dark-mode";
		profile_pic.className = "dark-mode";
	}
}

//bounce function calls for scroll listener
function delayExec(func, wait = 15, immediate = true) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		let callNow = (immediate && !timeout);
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
};

//handle animation for projects grid rows
function slideProjects(e) {
	let projectsRow = document.querySelectorAll(".projects div");
	projectsRow.forEach((slideElem) => {
		let elemHeight = slideElem.clientHeight;

		//set to slide in when halfway in frame
		let slideInAt = window.scrollY + screen.height + elemHeight / 2;
		//get bottom of slide element
		const elemBottom = slideElem.offsetTop + elemHeight;

		let isHalfShown = (slideInAt > slideElem.offsetTop + elemHeight * 1.5);
		let isNotScrolledPast = (window.scrollY < elemBottom);

		if (isHalfShown && isNotScrolledPast) {
			slideElem.classList.add('active');
		}
		else {
			slideElem.classList.remove('active');
		}
	});
}
window.addEventListener('scroll', delayExec(slideProjects));


/*
jQuery
*/

//fade elements in on page load
$('.dark-mode').delay(300).animate({'opacity':'1'}, 800);
$('.light-mode').delay(300).animate({'opacity':'1'}, 800);

//parallax scroll handler
$(window).scroll(function () {
	delayExec(parallaxScroll());
});
function parallaxScroll() {
	if (($(window).width() < 1900)
	|| ($(window).height() < 780)) {
		return;
	}
	let wScroll = $(window).scrollTop();
	
	$('#mid_banner').css('transform', 'translateY('
		+ -( wScroll / (14610 / $(window).height()) ) + 'px)');
}

//refresh on resize if dimensions cross threshold, accomodate parallax
$(document).ready(function() {
	let oldWidth = $(window).width();
	let oldHeight = $(window).height();

	$(window).resize(function() {
		if ((oldWidth >= 1900 && $(window).width() < 1900)
		|| (oldHeight >= 880 && $(window).height() < 880)) {
			document.location.reload(true);
		}
		oldWidth = $(window).width();
		oldHeight = $(window).height();
	});
});

//email handler
$(function() {
	var form = $('#form');
	var formPrompt = $('#f_prompt');

	$(form).submit(function(event) {
		//stop form submission
		event.preventDefault();

		var formData = $(form).serialize();
		$.ajax({
			type: 'POST',
			url: $('form').attr('action'),
			data: formData,
			dataType: 'json'
		});

		$(formPrompt).text('Message sent, thank you!');

		$(formPrompt).removeClass('f_error');
		$(formPrompt).addClass('f_success');
		$(formPrompt).addClass('hide');

		//clear prompt for reuse
		setTimeout(function() {
			$(formPrompt).text('');
			$(formPrompt).removeClass('hide');
		}, 15000);

		//clear form data
		$('#f_name').val('');
		$('#f_email').val('');
		$('#f_subject').val('');
		$('#f_message').val('');

		/*
		.done(function(res) {
			$(formPrompt).removeClass('f_error');
			$(formPrompt).addClass('f_success');
			$(formPrompt).addClass('hide');

			//clear prompt for reuse
			setTimeout(function(){
				$(formPrompt).text('');
				$(formPrompt).removeClass('hide');
			}, 15000);

			$(formPrompt).text(res);

			//clear form data
			$('#f_name').val('');
			$('#f_email').val('');
			$('#f_subject').val('');
			$('#f_message').val('');
		})
		.fail(function(data) {
			$(formPrompt).addClass('f_error');
			$(formPrompt).removeClass('f_success');
			$(formPrompt).addClass('hide');

			//set prompt text
			if (data.responseText !== '') {
				$(formPrompt).text(data.responseText);
			}
			else {
				$(formPrompt).text('Uh oh! Something went wrong, your message'
				+ 'could not be sent...');
			}

			//clear prompt for reuse
			setTimeout(function(){
				$(formPrompt).text('');
				$(formPrompt).removeClass('hide');
			}, 15000);
		});
		*/
	});
	
});