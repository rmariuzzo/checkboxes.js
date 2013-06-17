/*! Checkbox.js - MIT - Rubens Mariuzzo */
! function($) {

    //////////////////////////////////
    /* Checkboxes class definition. */
    //////////////////////////////////

    var Checkboxes = function(context, options) {
        this.context = context;
        this.options = options;
    };

    // Check all checkboxes in context.
    Checkboxes.prototype.check = function() {

    };

    // Uncheck all checkboxes in context.
    Checkboxes.prototype.uncheck = function() {

    };

    // Toggle the state of all checkboxes in context.
    Checkboxes.prototype.toggle = function() {

    };

    ///////////////////////////////////
    /* Checkboxes plugin definition. */
    ///////////////////////////////////

    var old = $.fn.checkboxes;

    $.fn.checkboxes = function(options) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('checkboxes');
            if (!data) {
                $this.data('checkboxes', (data = new Checkboxes($this, typeof options == 'object' && options)));
            }
        });
    };

    $.fn.checkboxes.Constructor = Checkboxes;


    /////////////////////////////
    /* Checkboxes no conflict. */
    /////////////////////////////

    $.fn.checkboxes.noConflict = function() {
        $.fn.checkboxes = old;
        return this;
    };


    //////////////////////////
    /* Checkboxes data-api. */
    //////////////////////////

    $(document).on('click.checkboxes.data-api', '[data-toggle^=checkboxes]', function(e) {
        var context = $(e.target);
        context.checkboxes();
    });

}(window.jQuery);