// Setup Jasmine's fixtures path.

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

// Spec description.
//
describe('The `uncheck` method', function () {
    'use strict';

    // Load fixtures and setup the testing contexts before each specs.

    var ctx;

    beforeEach(function () {
        loadFixtures('mixed.html');
        ctx = setupContext();
    });

    // Spec definitions.

    it('should exists', function () {
        expect(ctx.original.checkboxes().data('checkboxes').uncheck).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof ctx.original.checkboxes().data('checkboxes').uncheck).toBe('function');
    });

    it('should uncheck all visible and enabled checkboxes in context', function () {
        var spyEvent = spyOnEvent(ctx.modified, 'change');

        // Uncheck all checkboxes in context.
        ctx.modified.checkboxes('uncheck');

        // Ensure all checkboxes were unchecked as expected.
        ctx.each(function (original, modified, originalState, modifiedState) {
            if (!original.is(':disabled') && original.is(':visible')) {
                expect(modified).not.toBeChecked();
            } else {
                expect(modifiedState).toBe(originalState);
            }
        });

        expect(spyEvent).toHaveBeenTriggered();
    });

});
