/* globals $, jasmine, loadFixtures */

'use strict';

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('The `uncheck` method', function() {

    it('should exists', function() {
        loadFixtures('all_checked.html');
        var el = $('body').checkboxes();
        expect(el.data('checkboxes').uncheck).toBeDefined();
    });

    it('should be a function', function() {
        loadFixtures('all_checked.html');
        var el = $('body').checkboxes();
        expect(typeof el.data('checkboxes').uncheck).toBe('function');
    });

    it('should uncheck all checkboxes in context', function() {
        loadFixtures('all_checked.html');
        var el = $('body').checkboxes('uncheck');
        expect(el.find(':checkbox:not(:disabled)')).not.toBeChecked();
    });

    it('should uncheck specified checkbox', function() {
        // Check first checkbox.
        loadFixtures('all_checked.html');
        var el = $(':checkbox:first').parent().checkboxes('uncheck');
        expect(el.find(':checkbox:first')).not.toBeChecked();
        expect(el.find(':checkbox:not(:first)')).toBeChecked();

        // Check last checkbox.
        loadFixtures('all_checked.html');
        var el = $(':checkbox:last').parent().checkboxes('uncheck');
        expect(el.find(':checkbox:last')).not.toBeChecked();
        expect(el.find(':checkbox:not(:last)')).toBeChecked();
    });

    it('should check all checkboxes in context, but no disabled ones', function() {
        loadFixtures('all_checked.html');
        var el = $('body').checkboxes('uncheck');
        expect(el.find(':checkbox:disabled')).toBeChecked();
        expect(el.find(':checkbox:not(:disabled)')).not.toBeChecked();
    });

});