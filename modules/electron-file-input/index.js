'use strict';
const FileInput = Object.create(window.HTMLElement.prototype);

FileInput.createdCallback = function() {

  this.addEventListener('click', () => {
    alert('clicked');
  });
};

module.exports = function fileInput() {
  document.registerElement('file-input', {
    prototype: FileInput
  });
};
