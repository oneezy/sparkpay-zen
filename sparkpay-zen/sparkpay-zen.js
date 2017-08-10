
/* Global Variables
*********************************/
var themesLoaded = {};
var defaultTheme = "cm-s-default CodeMirror-wrap";
var currentTheme = "";
var previousTheme = "";


/* Themes Loaded?
*********************************/
function checkIfThemesLoaded(key){
    if (themesLoaded[key] == undefined){
        themesLoaded[key] = false;
    }

    return themesLoaded[key];
}

/* Import Themes
*********************************/
function importThemes() { 
    if (!checkIfThemesLoaded(location.href)){
        // Themes
        var importThemes = 'theme/_import.css';

        // Import Themes
        var linkThemes       = document.createElement ("link");
            linkThemes.rel   = "stylesheet";
            linkThemes.href  = chrome.extension.getURL (importThemes);

        document.head.appendChild (linkThemes);
    }
    themesLoaded[location.href] = true;
}

(function() {    
    'use strict';

    var currentOpenIframes = [];

    /* Expand Page Editor
    *********************************/
    function fullPageEditor() {
        if (window == parent)
        $('html').append(toggleButton, themeSelect);
        

        $('.toggle-editor').on('click', function (e){
            e.preventDefault();

            $(this).toggleClass('active');
            $('.mdc-icon-toggle').toggle();
            $('.CodeMirror').attr('class', 'CodeMirror cm-s-default CodeMirror-wrap');
            $('html').toggleClass('fullpage-editor');
        });
    }

    /* Mini Nav
    *********************************/
    function miniNav() {
        $(".toggle-wrapper").append(revealMiniNav);
    }

    /* Feature: Duplicate Window
    *********************************/
    function duplicateWindow() {
        $('.duplicate-window').click(function(e) {
            
            var location = window.location.href;
            var win = window.open(location, '_blank');
            
            if (win) {
                // Browser Allowed
                win.focus();
            } else {
                // Browser Blocked
                alert('Enable Popups');
            }
        });
    }

    /* Feature: Themes
    *********************************/
    /* Theme Select Menu */
    function themeSelectMenu() {
        $("#zenTheme").on('change', function() {
            setTheme($(this).val());
        });
    }

    /* Set Theme */
    function setTheme(theme){
        previousTheme = currentTheme;
        currentTheme = theme;

        var iframes = $("iframe");

        if (iframes.length){
            $.each(iframes, function(i, el){
                el.contentWindow.$('.CodeMirror').removeClass(defaultTheme);
                el.contentWindow.$('.CodeMirror').removeClass(previousTheme);
                el.contentWindow.$('.CodeMirror').addClass(theme);
            })
        }

        $('.CodeMirror').removeClass(defaultTheme);
        $('.CodeMirror').removeClass(previousTheme);
        $('.CodeMirror').addClass(theme);
    }


    /* Run Functions
    ================================================================= */
    $(function() {
        importThemes();
        fullPageEditor();
        miniNav();
        duplicateWindow();
        themeSelectMenu();

        setInterval(function(){
            //make sure the themes get imported into the iframes.
            importThemes();
            if (currentTheme != "")
                setTheme(currentTheme);
        }, 1000);
    });
})();