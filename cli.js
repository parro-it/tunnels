#!/usr/bin/env node
/* eslint-disable */

var electron = require('electron-prebuilt');
var path = require('path');
var proc = require('child_process');
var args = [path.join(__dirname, 'index.js')]
    .concat(process.args);
var child = proc.spawn(
  electron, args, {stdio: 'inherit'}
);
child.on('close', function (code) {
  process.exit(code);
});
