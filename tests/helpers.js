/**
 * Setup checkbox context for testing purposes.
 *
 * @return {Object} The setup context.
 */
function setupContext() {

    var context = {};

    /**
     * The original context.
     * @type {Object}
     */
    context.original = $('#context');

    /**
     * The modified context.
     * @return {Object}
     */
    context.modified = context.original.clone()
        .prop('id', 'modified-context')
        .insertAfter(context.original);

    /**
     * Iterate each checkbox from the original and modified context by index.
     * @param  {Function} fn The function to run for each cycle.
     */
    context.each = function (fn) {
        context.original.find(':checkbox').each(function (index) {
            var original = $(this);
            var modified = $(context.modified.find(':checkbox').get(index));
            var originalState = original.prop('checked');
            var modifiedState = modified.prop('checked');
            fn.call(null, original, modified, originalState, modifiedState, index);
        });
    };

    return context;
}
