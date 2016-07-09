// Setup Jasmine's fixtures path.

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

// Spec description.

describe('The `toggle` method', function () {
    'use strict';

    // Load fixtures and setup the testing contexts before each specs.

    var ctx;

    beforeEach(function () {
        loadFixtures('mixed.html');
        ctx = setupContext();
    });

    // Spec definitions.

    it('should exists', function () {
        expect(ctx.original.checkboxes().data('checkboxes').toggle).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof ctx.original.checkboxes().data('checkboxes').toggle).toBe('function');
    });

    it('should toggle all visible and enabled checkboxes in context', function () {
        // Toggle all checkboxes in context.
        ctx.modified.checkboxes('toggle');

        // Ensure all checkboxes were toggled as expected.
        ctx.each(function (original, modified, originalState, modifiedState) {
            if (!original.is(':disabled') && original.is(':visible')) {
                expect(modifiedState).not.toBe(originalState);
            } else {
                expect(modifiedState).toBe(originalState);
            }
        });
    });

});
