/* Favicons
*********************************/
var iHTML     =   chrome.extension.getURL('images/icons/ico/html.ico');
var iCSS      =   chrome.extension.getURL('images/icons/ico/css.ico');
var iJS       =   chrome.extension.getURL('images/icons/ico/js.ico');     // TO DO
var iWIDGET   =   chrome.extension.getURL('images/icons/ico/widget.ico');


/* Update Title
*********************************/
function updateTitle() {
    $('.pageTitle h1 .theme-designer').remove();

    var title = $('h1 > span').first().text();
    $('title').text(title);
}


/* Update Favicon
*********************************/
function updateFavicon() {
    var favicon       =  $('head link[type="image/x-icon"]');

    var activeWIDGET  =  $('li.active a:contains("Widgets")');
    var activeHTML    =  $('li.active a:contains("HTML Editor")');
    var activeCSS     =  $('li.active a:contains("CSS Editor")');

	$("body").each(function() {

        // Code Mirror (HTML Class)
		if ( $(".CodeMirror", this).hasClass('cm-s-default') ) {
			$(favicon).attr('href', iHTML);

        // Code Mirror (CSS Class)
		} else if ( $(".CodeMirror", this).hasClass('cm-s-css') ) {
			$(favicon).attr('href', iCSS);

        // Page Nav (Widgets)
		} else if ( $(activeWIDGET, this) ) {
			$(favicon).attr('href', iWIDGET);

        // Page Nav (HTML Editor)
		} else if ( $(activeHTML, this) ) {
			$(favicon).attr('href', iHTML);

        // Page Nav (CSS Editor)
		} else if ( $(activeCSS, this) ) {
			$(favicon).attr('href', iCSS);
		}

	});
}

    /* RUN FUNCTIONS
=========================================================== */
    $(document).ready(function() {

        updateTitle();
        updateFavicon();

    });