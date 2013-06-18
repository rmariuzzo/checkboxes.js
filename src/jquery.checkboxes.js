/*! Checkbox.js - MIT - Rubens Mariuzzo */
! function($) {

    //////////////////////////////////
    /* Checkboxes class definition. */
    //////////////////////////////////

    var defaults = {
        ranges : false,
        max : 0
    };

    var Checkboxes = function($context, options) {
        this.$context = $context;
        options = $.extend({}, defaults, options);
        var instance = this;
        if (options.ranges) {
            this.$context.on('click.checkboxes', ':checkbox', function(e) {
                var $checkbox = $(e.target);
                if (e.shiftKey && instance.$last) {
                    var $checkboxes = instance.$context.find(':checkbox'),
                        from = $checkboxes.index(instance.$last),
                        to = $checkboxes.index($checkbox);
                    if (to > from) {
                        $checkboxes.slice(from, to).prop('checked', true);
                    } else {
                        $checkboxes.slice(to, from).prop('checked', true);
                    }
                }
                instance.$last = $checkbox.is(':checked') ? $checkbox : null;
            });
        }
        if (options.max > 0) {
            this.$context.on('click.checkboxes', ':checkbox', function(e) {
                if (instance.$context.find(':checked').length == options.max) {
                    instance.$context.find(':checkbox:not(:checked)').prop('disabled', true);
                } else {
                    instance.$context.find(':checkbox:not(:checked)').prop('disabled', false);
                }
            });
        }
    };

    // Check all checkboxes in context.
    Checkboxes.prototype.check = function() {
        this.$context.find(':checkbox').prop('checked', true);
    };

    // Uncheck all checkboxes in context.
    Checkboxes.prototype.uncheck = function() {
        this.$context.find(':checkbox').prop('checked', false);
    };

    // Toggle the state of all checkboxes in context.
    Checkboxes.prototype.toggle = function() {
        this.$context.find(':checkbox').each(function() {
            var $checkbox = $(this);
            $checkbox.prop('checked', ! $checkbox.is(':checked'));
        });
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
            if (typeof options === 'string') {
                data[options]();
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
        var el = $(e.target),
            href = el.attr('href'),
            $context = $(el.data('context') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))),
            action = el.data('action');
        e.preventDefault();
        $context.checkboxes(action);
    });

}(window.jQuery);