jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('The `max` method', function () {
    'use strict';

    it('should exists', function () {
        loadFixtures('checked.html');
        var el = $('body').checkboxes();
        expect(el.data('checkboxes').max).toBeDefined();
    });

    it('should be a function', function () {
        loadFixtures('checked.html');
        var el = $('body').checkboxes();
        expect(typeof el.data('checkboxes').max).toBe('function');
    });

    it('should limit the number of checked checkboxes in context', function () {
        loadFixtures('unchecked.html');
        var context = $('body');
        context.checkboxes('max', 3);
        context.find(':checkbox').each(function (i) {
            $(this).click();
            expect($(this).prop('checked')).toBe(i < 3); // The first three should be checked.
        });
    });

});
