/* globals $, jasmine, loadFixtures */

'use strict';

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('The `check` method', function() {

    it('should exists', function() {
        loadFixtures('all_unchecked.html');
        var el = $('body').checkboxes();
        expect(el.data('checkboxes').check).toBeDefined();
    });

    it('should be a function', function() {
        loadFixtures('all_unchecked.html');
        var el = $('body').checkboxes();
        expect(typeof el.data('checkboxes').check).toBe('function');
    });

    it('should check all checkboxes in context', function() {
        loadFixtures('all_unchecked.html');
        var el = $('body').checkboxes('check');
        expect(el.find(':checkbox')).toBeChecked();
    });

    it('should check specified checkbox', function() {
        // Check first checkbox.
        loadFixtures('all_unchecked.html');
        var el = $(':checkbox:first').parent().checkboxes('check');
        expect(el.find(':checkbox:first')).toBeChecked();
        expect(el.find(':checkbox:not(:first)')).toBeChecked();

        // Check last checkbox.
        loadFixtures('all_unchecked.html');
        var el = $(':checkbox:last').parent().checkboxes('check');
        expect(el.find(':checkbox:last')).toBeChecked();
        expect(el.find(':checkbox:not(:last)')).toBeChecked();
    });

    it('should check all checkboxes in context, but no disabled ones', function() {
        loadFixtures('all_unchecked.html');
        var el = $('body').checkboxes('check');
        expect(el.find(':checkbox:disabled')).not.toBeChecked();
        expect(el.find(':checkbox:not(:disabled)')).toBeChecked();
    });

});