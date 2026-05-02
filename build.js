'use strict';

const { transformFileSync } = require('@babel/core');
const { minify } = require('terser');
const { writeFileSync, rmSync, mkdirSync } = require('fs');
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
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
