'use strict';

const path = require('path');
const fs = require('fs');
const $ = require('jquery');

// Expose jQuery globally so the plugin IIFE can find window.jQuery.
global.$ = $;
global.jQuery = $;
window.jQuery = $;

// Load the plugin into this jQuery instance.
require('./src/jquery.checkboxes.js');

// jsdom has no layout engine, so offsetWidth/offsetHeight are always 0 and
// jQuery's :visible always returns false. Override it to use inline styles.
$.expr.pseudos.visible = function (elem) {
    let el = elem;
    while (el && el.nodeType === 1) {
        const style = el.style;
        if (style && style.display === 'none') return false;
        if (style && style.visibility === 'hidden') return false;
        el = el.parentElement;
    }
    return true;
};

// Shared fixtures path (set per-file via jasmine.getFixtures().fixturesPath).
let _fixturesPath = 'tests/fixtures';

// Stub jasmine.getFixtures() so spec files can set the fixtures path unchanged.
global.jasmine = {
    getFixtures() {
        return {
            set fixturesPath(v) { _fixturesPath = v; },
            get fixturesPath() { return _fixturesPath; },
        };
    },
};

// Inject a fixture's <body> content into document.body.
global.loadFixtures = function loadFixtures(fixtureName) {
    const fullPath = path.resolve(process.cwd(), _fixturesPath, fixtureName);
    const html = fs.readFileSync(fullPath, 'utf8');
    const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    document.body.innerHTML = match ? match[1].trim() : html;
};

// Re-implement the test helper from tests/helpers.js as a global.
global.setupContext = function setupContext() {
    const context = {};
    context.original = $('#context');
    context.modified = context.original
        .clone()
        .prop('id', 'modified-context')
        .insertAfter(context.original);

    context.each = function (fn) {
        context.original.find(':checkbox').each(function (index) {
            const original = $(this);
            const modified = $(context.modified.find(':checkbox').get(index));
            fn.call(null, original, modified, original.prop('checked'), modified.prop('checked'), index);
        });
    };

    return context;
};

// Spy on a jQuery event by attaching a listener; returns an object checked
// by the toHaveBeenTriggered custom matcher.
global.spyOnEvent = function spyOnEvent($el, eventName) {
    const spy = { triggered: false };
    $el.on(`${eventName}.spy`, function () { spy.triggered = true; });
    return spy;
};
