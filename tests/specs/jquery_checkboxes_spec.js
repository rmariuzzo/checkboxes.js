jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('The jQuery checkboxes plugin', function () {
    'use strict';

    it('should exists', function () {
        expect($.fn.checkboxes).toBeDefined();
    });

    it('should be a function', function () {
        expect(typeof $.fn.checkboxes).toBe('function');
    });

    it('should create an instance in $.data', function () {
        loadFixtures('checked.html');
        var el = $('body').checkboxes();
        expect(el.data('checkboxes')).toBeDefined();
    });

    it('should not create an instance in $.data with empty element set', function () {
        loadFixtures('checked.html');
        var el = $().checkboxes();
        expect(el.data('checkboxes')).not.toBeDefined();
    });

});
