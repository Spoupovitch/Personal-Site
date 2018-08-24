//bounce function calls for scroll listener
function delayExec(func, wait = 15, immediate = true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = (immediate && !timeout);
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(context, args);
		}
	};
};


//handle animation for projects grid rows
function slideProjects(e) {
	const projectsRow = document.querySelectorAll(".projects div");
	projectsRow.forEach((slideElem) => {
		var elemHeight = slideElem.clientHeight;

		//set to slide in when halfway in frame
		const slideInAt = window.scrollY + screen.height + elemHeight / 2;
		//get bottom of slide element
		const elemBottom = slideElem.offsetTop + elemHeight;

		const isHalfShown = (slideInAt > slideElem.offsetTop + elemHeight * 1.75);
		const isNotScrolledPast = (window.scrollY < elemBottom);

		if (isHalfShown && isNotScrolledPast) {
			slideElem.classList.add('active');
		}
		else {
			slideElem.classList.remove('active');
		}
	});
}
window.addEventListener('scroll', delayExec(slideProjects));


//toggle site theme
function toggleBG() {
	var body, sky, banner, city;
	body = document.getElementById("body");
	sky = document.getElementById("sky");
	banner = document.getElementById("mid_banner");
	city = document.getElementById("city");

	var skyTheme = sky.className;

	if (skyTheme === "dark-mode") {
		body.className = "light-mode";
		sky.className = "light-mode";
		banner.className = "light-mode";
		city.className = "light-mode";
	}
	else {
		body.className = "dark-mode";
		sky.className = "dark-mode";
		banner.className = "dark-mode";
		city.className = "dark-mode";
	}
}



//jQuery

//fade elements in on page load
$('.dark-mode').delay(300).animate({'opacity':'1'}, 800);
$('.light-mode').delay(300).animate({'opacity':'1'}, 800);

$(window).scroll(function () {
	parallaxScroll();
});
function parallaxScroll() {
	var wScroll = $(window).scrollTop();

	$('#mid_banner').css('transform', 'translateY(' + -(wScroll / 7.5) + 'px)');
}
