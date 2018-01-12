'use strict';

var matches = (function() {
  var match = Element.prototype.matches
         || Element.prototype.msMatchesSelector
         || Element.prototype.webkitMatchesSelector;

  return function(elem, selector) {
    return match.call(elem, selector);
  }
})();

var closest = (function() {
  if (Element.prototype.closest) {
    return function(elem, selector) {
      return Element.prototype.closest.call(elem, selector);
    }
  }

  return function(elem, selector) {
    if (!document.documentElement.contains(elem)) return null;
    do {
      if (matches(elem, selector)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  }
})();

module.exports = {
  matches: matches,
  closest: closest
};
