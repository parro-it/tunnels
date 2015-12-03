#!/usr/bin/env node
/* eslint-disable */

var electron = require('electron-prebuilt');
var path = require('path');
var proc = require('child_process');

var child = proc.spawn(electron, [
  path.join(__dirname, 'index.js')
], {stdio: 'inherit'})
child.on('close', function (code) {
  process.exit(code);
});
