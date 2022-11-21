
$(function () {


	$(document).on('click touchstart', function (e) {
		e.stopPropagation();
		// closing of sidebar menu when clicking outside of it
		if (!$(e.target).closest('.main-header-menu-icon').length) {
			var sidebarTarg = $(e.target).closest('.main-sidebar').length;
			if (!sidebarTarg) {
				$('body').removeClass('main-sidebar-show');
			}
		}
	});

	$(document).on('click', '#mainSidebarToggle', function (event) {
		event.preventDefault();
		if (window.matchMedia('(min-width: 992px)').matches) {
			$('body.rightmenu').toggleClass('main-sidebar-hide');
		} else {
			$('body.rightmenu').toggleClass('main-sidebar-show');
			$('body.rightmenu').removeClass('main-sidebar-hide');
		}
	});

	// ______________main-sidebar Active Class
});