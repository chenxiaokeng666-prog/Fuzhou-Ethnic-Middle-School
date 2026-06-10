(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markReady() {
    document.body.classList.add('page-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markReady, { once: true });
  } else {
    markReady();
  }

  window.addEventListener('pageshow', function () {
    document.body.classList.remove('page-exiting');
    markReady();
  });

  if (reducedMotion) {
    return;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    var href;
    var url;

    if (!link || event.defaultPrevented || event.button !== 0) {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    if (link.target && link.target !== '_self') {
      return;
    }

    if (link.hasAttribute('download')) {
      return;
    }

    href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') {
      return;
    }

    try {
      url = new URL(href, window.location.href);
    } catch (error) {
      return;
    }

    if (url.origin !== window.location.origin) {
      return;
    }

    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
      return;
    }

    event.preventDefault();
    document.body.classList.add('page-exiting');

    window.setTimeout(function () {
      window.location.href = url.href;
    }, 190);
  });
})();
