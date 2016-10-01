'use strict';

(($) => {

    /**
     * The Checkboxes class object.
     */
    class Checkboxes {

        /**
         * Create a new checkbox context.
         *
         * @param {Object} context DOM context.
         */
        constructor(context) {
            this.$context = context;
        }

        /**
         * Check all checkboxes in context.
         */
        check() {
            this.$context.find(':checkbox')
                .filter(':not(:disabled)')
                .filter(':visible')
                .prop('checked', true)
                .trigger('change');
        }

        /**
         * Uncheck all checkboxes in context.
         */
        uncheck() {
            this.$context.find(':checkbox:visible')
                .filter(':not(:disabled)')
                .prop('checked', false)
                .trigger('change');
        }

        /**
         * Toggle the state of all checkboxes in context.
         */
        toggle() {
            this.$context.find(':checkbox:visible')
                .filter(':not(:disabled)')
                .each((i, element) => {
                    let $checkbox = $(element);
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                })
                .trigger('change');
        }

        /**
         * Set the maximum number of checkboxes that can be checked.
         *
         * @param {Number} max The maximum number of checkbox allowed to be checked.
         */
        max(max) {
            if (max > 0) {
                // Enable max.
                let instance = this;
                this.$context.on('click.checkboxes.max', ':checkbox', () => {
                    if (instance.$context.find(':checked').length === max) {
                        instance.$context.find(':checkbox:not(:checked)').prop('disabled', true);
                    } else {
                        instance.$context.find(':checkbox:not(:checked)').prop('disabled', false);
                    }
                });
            } else {
                // Disable max.
                this.$context.off('click.checkboxes.max');
            }
        }

        /**
         * Enable or disable range selection.
         *
         * @param {Boolean} enable Indicate is range selection has to be enabled.
         */
        range(enable) {
            if (enable) {
                let instance = this;

                this.$context.on('click.checkboxes.range', ':checkbox', (event) => {
                    let $checkbox = $(event.target);

                    if (event.shiftKey && instance.$last) {
                        let $checkboxes = instance.$context.find(':checkbox:visible');
                        let from = $checkboxes.index(instance.$last);
                        let to = $checkboxes.index($checkbox);
                        let start = Math.min(from, to);
                        let end = Math.max(from, to) + 1;

                        $checkboxes.slice(start, end)
                            .filter(':not(:disabled)')
                            .prop('checked', $checkbox.prop('checked'))
                            .trigger('change');
                    }
                    instance.$last = $checkbox;
                });
            } else {
                this.$context.off('click.checkboxes.range');
            }
        }
    }

    /* Checkboxes jQuery plugin. */

    // Keep old Checkboxes jQuery plugin, if any, to no override it.
    let old = $.fn.checkboxes;

    /**
     * Checkboxes jQuery plugin.
     *
     * @param {String} method Method to invoke.
     *
     * @return {Object} jQuery object.
     */
    $.fn.checkboxes = function (method) {
        // Get extra arguments as method arguments.
        let args = Array.prototype.slice.call(arguments, 1);

        return this.each((i, element) => {
            let $this = $(element);

            // Check if we already have an instance.
            let instance = $this.data('checkboxes');
            if (!instance) {
                $this.data('checkboxes', (instance = new Checkboxes($this)));
            }

            // Check if we need to invoke a public method.
            if (typeof method === 'string' && instance[method]) {
                instance[method].apply(instance, args);
            }
        });
    };

    // Store a constructor reference.
    $.fn.checkboxes.Constructor = Checkboxes;

    /* Checkboxes jQuery no conflict. */

    /**
     * No conflictive Checkboxes jQuery plugin.
     */
    $.fn.checkboxes.noConflict = function () {
        $.fn.checkboxes = old;
        return this;
    };

    /* Checkboxes data-api. */

    /**
     * Handle data-api click.
     *
     * @param {Object} event Click event.
     */
    var dataApiClickHandler = (event) => {
        var el = $(event.target);
        var href = el.attr('href');
        var $context = $(el.data('context') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var action = el.data('action');

        if ($context && action) {
            if (!el.is(':checkbox')) {
                event.preventDefault();
            }
            $context.checkboxes(action);
        }
    };

    /**
     * Handle data-api DOM ready.
     */
    var dataApiDomReadyHandler = () => {
        $('[data-toggle^=checkboxes]').each(function () {
            let el = $(this);
            let actions = el.data();
            delete actions.toggle;
            for (let action in actions) {
                el.checkboxes(action, actions[action]);
            }
        });
    };

    // Register data-api listeners.
    $(document).on('click.checkboxes.data-api', '[data-toggle^=checkboxes]', dataApiClickHandler);
    $(document).on('ready.checkboxes.data-api', dataApiDomReadyHandler);

})(window.jQuery);
