'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {

    /**
     * The Checkboxes class object.
     */
    var Checkboxes = function () {

        /**
         * Create a new checkbox context.
         *
         * @param {Object} context DOM context.
         */
        function Checkboxes(context) {
            _classCallCheck(this, Checkboxes);

            this.$context = context;
        }

        /**
         * Check all checkboxes in context.
         */


        _createClass(Checkboxes, [{
            key: 'check',
            value: function check() {
                this.$context.find(':checkbox').filter(':not(:disabled)').filter(':visible').prop('checked', true).trigger('change');
            }

            /**
             * Uncheck all checkboxes in context.
             */

        }, {
            key: 'uncheck',
            value: function uncheck() {
                this.$context.find(':checkbox:visible').filter(':not(:disabled)').prop('checked', false).trigger('change');
            }

            /**
             * Toggle the state of all checkboxes in context.
             */

        }, {
            key: 'toggle',
            value: function toggle() {
                this.$context.find(':checkbox:visible').filter(':not(:disabled)').each(function (i, element) {
                    var $checkbox = $(element);
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                }).trigger('change');
            }

            /**
             * Set the maximum number of checkboxes that can be checked.
             *
             * @param {Number} max The maximum number of checkbox allowed to be checked.
             */

        }, {
            key: 'max',
            value: function max(_max) {
                var _this = this;

                if (_max > 0) {
                    (function () {
                        // Enable max.
                        var instance = _this;
                        _this.$context.on('click.checkboxes.max', ':checkbox', function () {
                            if (instance.$context.find(':checked').length === _max) {
                                instance.$context.find(':checkbox:not(:checked)').prop('disabled', true);
                            } else {
                                instance.$context.find(':checkbox:not(:checked)').prop('disabled', false);
                            }
                        });
                    })();
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

        }, {
            key: 'range',
            value: function range(enable) {
                var _this2 = this;

                if (enable) {
                    (function () {
                        var instance = _this2;

                        _this2.$context.on('click.checkboxes.range', ':checkbox', function (event) {
                            var $checkbox = $(event.target);

                            if (event.shiftKey && instance.$last) {
                                var $checkboxes = instance.$context.find(':checkbox:visible');
                                var from = $checkboxes.index(instance.$last);
                                var to = $checkboxes.index($checkbox);
                                var start = Math.min(from, to);
                                var end = Math.max(from, to) + 1;

                                $checkboxes.slice(start, end).filter(':not(:disabled)').prop('checked', $checkbox.prop('checked')).trigger('change');
                            }
                            instance.$last = $checkbox;
                        });
                    })();
                } else {
                    this.$context.off('click.checkboxes.range');
                }
            }
        }]);

        return Checkboxes;
    }();

    /* Checkboxes jQuery plugin. */

    // Keep old Checkboxes jQuery plugin, if any, to no override it.


    var old = $.fn.checkboxes;

    /**
     * Checkboxes jQuery plugin.
     *
     * @param {String} method Method to invoke.
     *
     * @return {Object} jQuery object.
     */
    $.fn.checkboxes = function (method) {
        // Get extra arguments as method arguments.
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function (i, element) {
            var $this = $(element);

            // Check if we already have an instance.
            var instance = $this.data('checkboxes');
            if (!instance) {
                $this.data('checkboxes', instance = new Checkboxes($this));
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
    var dataApiClickHandler = function dataApiClickHandler(event) {
        var el = $(event.target);
        var href = el.attr('href');
        var $context = $(el.data('context') || href && href.replace(/.*(?=#[^\s]+$)/, ''));
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
    var dataApiDomReadyHandler = function dataApiDomReadyHandler() {
        $('[data-toggle^=checkboxes]').each(function () {
            var el = $(this);
            var actions = el.data();
            delete actions.toggle;
            for (var action in actions) {
                el.checkboxes(action, actions[action]);
            }
        });
    };

    // Register data-api listeners.
    $(document).on('click.checkboxes.data-api', '[data-toggle^=checkboxes]', dataApiClickHandler);
    $(document).on('ready.checkboxes.data-api', dataApiDomReadyHandler);
})(window.jQuery);
