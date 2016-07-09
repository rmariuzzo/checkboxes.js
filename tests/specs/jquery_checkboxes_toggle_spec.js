jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('The `toggle` method', function () {
    'use strict';

    it('should exists', function () {
        loadFixtures('mixed.html');
        var el = $('body').checkboxes();
        expect(el.data('checkboxes').toggle).toBeDefined();
    });

    it('should be a function', function () {
        loadFixtures('mixed.html');
        var el = $('body').checkboxes();
        expect(typeof el.data('checkboxes').toggle).toBe('function');
    });

    it('should toggle all checkboxes in context', function () {
        loadFixtures('mixed.html');
        var original = $('body').clone();
        var modified = $('body').checkboxes('toggle');
        modified.find(':checkbox:not(:disabled)').each(function (i) {
            expect($(this).prop('checked')).not.toBe(original.find(':checkbox:not(:disabled)').eq(i).prop('checked'));
        });
    });

    it('should toggle specified checkbox', function () {
        // Check first checkbox.
        loadFixtures('mixed.html');
        var original = $(':checkbox:first').clone();
        var modified = $(':checkbox:first').parent().checkboxes('toggle');
        expect(modified.find(':checkbox:first').prop('checked')).not.toBe(original.prop('checked'));

        // Check last checkbox.
        loadFixtures('mixed.html');
        original = $(':checkbox:last').clone();
        modified = $(':checkbox:last').parent().checkboxes('toggle');
        expect(modified.find(':checkbox:last').prop('checked')).not.toBe(original.prop('checked'));
    });

    it('should toggle all checkboxes in context, but no disabled ones', function () {
        loadFixtures('mixed.html');
        var original = $('body').clone();
        var modified = $('body').checkboxes('toggle');
        modified.find(':checkbox:disabled').each(function (i) {
            expect($(this).prop('checked')).toBe(original.find(':checkbox:disabled').eq(i).prop('checked'));
        });
    });

});
