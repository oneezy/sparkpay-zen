
var themesLoaded = {};
var defaultTheme = "cm-s-default";
var currentTheme = "";
var previousTheme = "";

function checkIfThemesLoaded(key){
    if (themesLoaded[key] == undefined){
        themesLoaded[key] = false;
    }

    return themesLoaded[key];
}

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

    function themeSelectMenu() {
        $("#zenTheme").on('change', function() {
            //currentTheme = $(this).val();
            setTheme($(this).val());
        });
    }

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

    $(function() {
        importThemes();
        fullPageEditor();
        themeSelectMenu();

        setInterval(function(){
            //make sure the themes get imported into the iframes.
            importThemes();
            if (currentTheme != "")
                setTheme(currentTheme);
        }, 1000);
    });
})();

// <div class="CodeMirror cm-s-default CodeMirror-wrap">