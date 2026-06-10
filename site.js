(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markReady() {
    document.body.classList.add('page-ready');
  }

  function setupDeferredVideos() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-video-src]'), function (frame) {
      var trigger = frame.querySelector('[data-action="load-video"]');
      var videoSrc = frame.getAttribute('data-video-src');

      if (!trigger || !videoSrc) {
        return;
      }

      trigger.addEventListener('click', function () {
        var video = document.createElement('video');
        var source = document.createElement('source');

        video.controls = true;
        video.playsInline = true;
        video.autoplay = true;
        video.preload = 'auto';
        video.setAttribute('aria-label', trigger.getAttribute('aria-label') || '校园宣传视频');

        source.src = videoSrc;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.appendChild(document.createTextNode('当前浏览器不支持直接播放视频，请下载后查看。'));

        frame.classList.add('is-video-loading', 'is-video-loaded');
        video.addEventListener('canplay', function () {
          frame.classList.remove('is-video-loading');
        }, { once: true });
        frame.replaceChildren(video);
        video.load();

        if (typeof video.play === 'function') {
          var playback = video.play();
          if (playback && typeof playback.catch === 'function') {
            playback.catch(function () {});
          }
        }
      }, { once: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      markReady();
      setupDeferredVideos();
    }, { once: true });
  } else {
    markReady();
    setupDeferredVideos();
  }

  window.addEventListener('pageshow', function () {
    document.body.classList.remove('page-exiting');
    markReady();
  });

  if (reducedMotion) {
    return;
  }

  // 子页面使用和首页一致的滚动进入节奏，避免整页硬切。
  function setupSubpageReveals() {
    var revealGroups = [
      { selector: '.content-band--split > :first-child', variant: 'site-reveal--left' },
      { selector: '.content-band--split > :last-child', variant: 'site-reveal--right' },
      { selector: '.info-card', variant: 'site-reveal--scale' },
      { selector: '.resource-card', variant: 'site-reveal--scale' },
      { selector: '.story-tile', variant: 'site-reveal--scale' },
      { selector: '.timeline-list article', variant: 'site-reveal--scale' },
      { selector: '.directory-search', variant: 'site-reveal--right' }
    ];
    var revealEls = [];

    revealGroups.forEach(function (group) {
      Array.prototype.forEach.call(document.querySelectorAll(group.selector), function (el, index) {
        if (el.classList.contains('site-reveal')) {
          return;
        }
        el.classList.add('site-reveal', group.variant);
        el.style.setProperty('--reveal-delay', Math.min(index * 80, 320) + 'ms');
        revealEls.push(el);
      });
    });

    if (!revealEls.length) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -80px 0px'
    });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  setupSubpageReveals();

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
