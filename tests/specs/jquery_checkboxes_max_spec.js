// Setup Jasmine's fixtures path.

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

// Spec description.

describe('The `max` method', function () {
    'use strict';

    // Load fixtures and setup the testing contexts before each specs.

    var ctx;

    beforeEach(function () {
        loadFixtures('unchecked.html');
        ctx = setupContext();
    });

    // Spec definitions.

    it('should exists', function () {
        expect(ctx.original.checkboxes().data('checkboxes').max).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof ctx.original.checkboxes().data('checkboxes').max).toBe('function');
    });

    it('should limit the number of checked checkboxes in context', function () {
        ctx.modified.checkboxes('max', 7);

        // Click all checkboxes.
        ctx.modified.find(':checkbox').each(function () {
            $(this).click();
        });

        expect(ctx.modified.find(':checkbox:checked').length).toBe(7);
    });

});
