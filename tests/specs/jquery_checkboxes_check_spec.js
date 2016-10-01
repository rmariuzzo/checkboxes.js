// Setup Jasmine's fixtures path.

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

// Spec description.

describe('The `check` method', function () {
    'use strict';

    // Load fixtures and setup the testing contexts before each specs.

    var ctx;

    beforeEach(function () {
        loadFixtures('checked.html');
        ctx = setupContext();
    });

    // Spec definitions.

    it('should exists', function () {
        expect(ctx.original.checkboxes().data('checkboxes').check).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof ctx.original.checkboxes().data('checkboxes').check).toBe('function');
    });

    it('should check all visible and enabled checkboxes in context', function () {
        var spyEvent = spyOnEvent(ctx.modified, 'change');

        // Check all checkboxes in context.
        ctx.modified.checkboxes('check');

        // Ensure all checkboxes were checked as expected.
        ctx.each(function (original, modified, originalState, modifiedState) {
            if (!original.is(':disabled') && original.is(':visible')) {
                expect(modified).toBeChecked();
            } else {
                expect(modifiedState).toBe(originalState);
            }
        });

        expect(spyEvent).toHaveBeenTriggered();
    });

});
