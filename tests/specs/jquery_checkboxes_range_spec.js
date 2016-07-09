jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('The `range` method', function () {
    'use strict';

    it('should exists', function () {
        loadFixtures('checked.html');
        var el = $('body').checkboxes();
        expect(el.data('checkboxes').range).toBeDefined();
    });

    it('should be a function', function () {
        loadFixtures('checked.html');
        var el = $('body').checkboxes();
        expect(typeof el.data('checkboxes').range).toBe('function');
    });

});
