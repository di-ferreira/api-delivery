/* eslint-disable prettier/prettier */
const exe = require('@angablue/exe');

const build = exe({
    entry: './dist/server.js',
    out: './build/ApiDelivery.exe',
    pkg: ['-C', 'GZip'],
    productVersion: '1.0',
    fileVersion: '1.0',
    target: 'latest-win-x64',
    // icon: './src/assets/astro-burguer.ico',
    properties: {
        FileDescription: 'ApiDelivery',
        ProductName: 'ApiDelivery',
        LegalCopyright: 'DiFerreira https://di-ferreira.github.io/',
        OriginalFilename: 'ApiDelivery.exe',
    },
});

build.then(() => console.log('Build Completed!'));
