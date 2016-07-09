// Setup Jasmine's fixtures path.

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

// Spec description.

describe('The jQuery checkboxes plugin', function () {
    'use strict';

    // Load fixtures and setup the testing contexts before each specs.

    var ctx;

    beforeEach(function () {
        loadFixtures('mixed.html');
        ctx = setupContext();
    });

    // Spec definitions.

    it('should exists', function () {
        expect($.fn.checkboxes).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof $.fn.checkboxes).toBe('function');
    });

    it('should create an instance in $.data', function () {
        expect(ctx.original.checkboxes().data('checkboxes')).toBeDefined();
    });

    it('should not create an instance in $.data with empty element set', function () {
        expect($().checkboxes().data('checkboxes')).not.toBeDefined();
    });

});
