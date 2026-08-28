/* =========================================================================
   Sarthak Kulshrestha — Portfolio  ·  REV 3
   Shared script for all pages. Progressive enhancement only:
   every page is fully usable with JS disabled.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* ---------- footer year ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- HUD clock readout ---------- */
  var clock = document.querySelector('[data-clock]');
  if (clock) {
    var setClock = function () {
      var d = new Date();
      clock.textContent =
        String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    };
    setClock();
    setInterval(setClock, 15000);
  }

  /* ---------- page-enter wipe ---------- */
  var wipe = document.querySelector('.wipe');
  if (wipe) {
    // The wipe animates itself from CSS (.js .wipe). JS only tidies up the node
    // afterward, so a blocked/failed script can never leave the page masked.
    var killWipe = function () { wipe.parentNode && wipe.parentNode.removeChild(wipe); };
    if (reduceMotion) {
      killWipe();
    } else {
      wipe.addEventListener('animationend', killWipe);
      setTimeout(killWipe, 1200);
    }
  }

  /* ---------- mobile HUD nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hud-nav');
  var mobileMQ = window.matchMedia('(max-width: 760px)');

  if (toggle && nav) {
    var syncInert = function () {
      if (mobileMQ.matches && !nav.classList.contains('open')) {
        nav.setAttribute('inert', '');
        nav.setAttribute('aria-hidden', 'true');
      } else {
        nav.removeAttribute('inert');
        nav.removeAttribute('aria-hidden');
      }
    };
    var closeNav = function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      syncInert();
    };
    var openNav = function () {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      syncInert();
    };
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) { closeNav(); } else { openNav(); }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { closeNav(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
        toggle.focus();
      }
    });
    var onViewport = function () {
      if (!mobileMQ.matches) { closeNav(); }
      syncInert();
    };
    if (mobileMQ.addEventListener) { mobileMQ.addEventListener('change', onViewport); }
    else if (mobileMQ.addListener) { mobileMQ.addListener(onViewport); }
    window.addEventListener('resize', onViewport, { passive: true });
    syncInert();
  }

  /* ---------- scroll reveal ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(
      document.querySelectorAll('.panel, .portal, .tl-item, .clearance li, .page-head'),
      function (el) { el.classList.add('reveal'); io.observe(el); }
    );
  }

  /* ---------- decode-in on headings ---------- */
  if (!reduceMotion) {
    var GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#%<>*';
    var decode = function (el) {
      var final = el.getAttribute('data-decode') || el.textContent;
      var len = final.length;
      var frame = 0;
      var total = Math.min(28, len + 12);
      var run = function () {
        var out = '';
        for (var i = 0; i < len; i++) {
          if (i < (frame - 6)) { out += final[i]; }
          else if (final[i] === ' ') { out += ' '; }
          else { out += GLYPHS[(Math.random() * GLYPHS.length) | 0]; }
        }
        el.textContent = out;
        frame++;
        if (frame <= total) { setTimeout(run, 26); }
        else { el.textContent = final; }
      };
      run();
    };
    var decoders = document.querySelectorAll('[data-decode]');
    if (decoders.length) {
      Array.prototype.forEach.call(decoders, function (el) {
        if (!el.getAttribute('data-decode')) { el.setAttribute('data-decode', el.textContent); }
      });
      if ('IntersectionObserver' in window) {
        var dio = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { decode(entry.target); dio.unobserve(entry.target); }
          });
        }, { threshold: 0.5 });
        Array.prototype.forEach.call(decoders, function (el) { dio.observe(el); });
      } else {
        Array.prototype.forEach.call(decoders, decode);
      }
    }
  }

  /* ---------- hero role: terminal typing ---------- */
  var typeEl = document.querySelector('.type-line');
  if (typeEl) {
    var phrases;
    try { phrases = JSON.parse(typeEl.getAttribute('data-type') || '[]'); }
    catch (err) { phrases = []; }

    phrases = phrases.map(function (p) {
      var t = document.createElement('textarea');
      t.innerHTML = p;
      return t.value;
    });

    if (reduceMotion || phrases.length < 2) {
      typeEl.classList.add('done');
    } else {
      var pi = 0, ci = 0, deleting = false;
      var tick = function () {
        var full = phrases[pi];
        ci += deleting ? -1 : 1;
        typeEl.textContent = full.slice(0, ci);
        if (!deleting && ci === full.length) {
          deleting = true;
          return setTimeout(tick, 1700);
        }
        if (deleting && ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          return setTimeout(tick, 320);
        }
        setTimeout(tick, deleting ? 30 : 58 + Math.random() * 42);
      };
      typeEl.textContent = '';
      setTimeout(tick, 550);
    }
  }
})();
