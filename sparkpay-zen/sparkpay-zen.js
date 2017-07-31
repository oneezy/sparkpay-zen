
(function() {
    'use strict';
    var toggleButton = `<button class="mdc-fab toggle-editor">
                            <i class="mdc-icon-toggle material-icons" role="button" aria-pressed="false" tabindex="0">
                                <i class="material-icons">code</i>
                            </i>
                            <i class="mdc-icon-toggle material-icons" role="button" aria-pressed="false" tabindex="0" style="display: none">
                                <i class="material-icons">close</i>
                            </i>
                        </button>`;

    function fullPageEditor() {
        $('html').append(toggleButton);

        $('.toggle-editor').on('click', function (e){
            e.preventDefault();

            $(this).toggleClass('active');
            $('.mdc-icon-toggle').toggle();
            $('html').toggleClass('fullpage-editor');
        });
    }
    $(function() {
        fullPageEditor();
    });
})();