'use strict';

// Template helper to convert pixel values to rem.

// Very specific to this project,
// it asumes that the rem base is 10.

module.exports = function(str) {
  const base = 10;
  const num = parseInt(str, 10) / base;

  if (num === 0) {
    return '0';
  } else {
    return num + 'rem';
  }
};