// Setup Jasmine's fixtures path.

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

// Spec description.

describe('The `range` method', function () {
    'use strict';

    // Load fixtures and setup the testing contexts before each specs.

    var ctx;

    beforeEach(function () {
        loadFixtures('mixed.html');
        ctx = setupContext();
    });

    // Spec definitions.

    it('should exists', function () {
        expect(ctx.original.checkboxes().data('checkboxes').range).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof ctx.original.checkboxes().data('checkboxes').range).toBe('function');
    });

});
