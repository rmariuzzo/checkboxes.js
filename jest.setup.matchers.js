'use strict';

// Custom Jest matchers that replace jasmine-jquery's toBeChecked and
// toHaveBeenTriggered so the spec files can remain unchanged.

expect.extend({
    toBeChecked($el) {
        const pass = $el.prop('checked') === true;
        return {
            pass,
            message: () => pass
                ? 'Expected checkbox not to be checked, but it was'
                : 'Expected checkbox to be checked, but it was not',
        };
    },

    toHaveBeenTriggered(spy) {
        const pass = spy.triggered === true;
        return {
            pass,
            message: () => pass
                ? 'Expected event not to have been triggered, but it was'
                : 'Expected event to have been triggered, but it was not',
        };
    },
});
