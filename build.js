'use strict';

const { transformFileSync } = require('@babel/core');
const { minify } = require('terser');
const { writeFileSync, rmSync, mkdirSync, copyFileSync, readFileSync } = require('fs');
const pkg = require('./package.json');

async function build() {
    const year = new Date().getFullYear();
    const banner = `/*! checkboxes.js v${pkg.version} | (c) 2013-${year} Rubens Mariuzzo | http://github.com/rmariuzzo/checkboxes.js/LICENSE */`;

    rmSync('dist', { recursive: true, force: true });
    mkdirSync('dist');

    const { code } = transformFileSync('src/jquery.checkboxes.js');
    writeFileSync(`dist/jquery.checkboxes-${pkg.version}.js`, `${banner}\n${code}`);

    const { code: minCode } = await minify(code, { format: { preamble: banner } });
    writeFileSync(`dist/jquery.checkboxes-${pkg.version}.min.js`, minCode);

    console.log(`Built dist/jquery.checkboxes-${pkg.version}.js`);
    console.log(`Built dist/jquery.checkboxes-${pkg.version}.min.js`);

    copyFileSync(`dist/jquery.checkboxes-${pkg.version}.min.js`, 'docs/bundle/checkboxes.js/jquery.checkboxes.min.js');
    console.log(`Updated docs/bundle/checkboxes.js/jquery.checkboxes.min.js`);

    const html = readFileSync('docs/index.html', 'utf-8');
    const updatedHtml = html.replace(/Download v[\d.]+/g, `Download v${pkg.version}`);
    writeFileSync('docs/index.html', updatedHtml);
    console.log(`Updated docs/index.html → Download v${pkg.version}`);
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
