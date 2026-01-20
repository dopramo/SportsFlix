(function() {
  'use strict';
  
  // Block download manager browsers
  const ua = navigator.userAgent.toLowerCase();
  const blockedAgents = ["1dm", "1dm+", "idm", "adm", "advanced download manager", "idm+", "download manager"];
  
  if (blockedAgents.some(tag => ua.includes(tag))) {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-size:24px;text-align:center;padding:20px;">This browser is not supported. Please use Chrome, Firefox, or Safari.</div>';
    return;
  }
  
  let detected = false;
  
  function killPage() {
    if (detected) return;
    detected = true;
    
    // Stop all media
    document.querySelectorAll('video, audio, iframe').forEach(el => {
      try { el.pause && el.pause(); } catch(e) {}
      el.remove();
    });
    
    // Clear page
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-size:24px;text-align:center;padding:20px;flex-direction:column;"><div style="font-size:48px;margin-bottom:20px;">⚠️</div><div>Developer tools detected.<br>This page has been disabled.</div></div>';
    
    // Clear all timers
    for (let i = 1; i < 99999; i++) {
      window.clearInterval(i);
      window.clearTimeout(i);
    }
    
    // Try to close
    try {
      window.open('', '_self');
      window.close();
    } catch(e) {}
  }
  
  // Method 1: Debugger timing detection
  function checkDebugger() {
    const start = performance.now();
    debugger;
    if (performance.now() - start > 100) {
      killPage();
    }
  }
  
  // Method 2: Console detection using toString
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      killPage();
    }
  });
  
  // Method 3: devtools-detect using size
  const threshold = 160;
  function checkSize() {
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    if (widthDiff || heightDiff) {
      killPage();
    }
  }
  
  // Method 4: Firebug detection
  function checkFirebug() {
    if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
      killPage();
    }
  }
  
  // Method 5: Console log trick
  function consoleCheck() {
    const before = new Date().getTime();
    console.log(element);
    console.clear();
    const after = new Date().getTime();
    if (after - before > 100) {
      killPage();
    }
  }
  
  // Disable right-click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });
  
  // Block keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      killPage();
      return false;
    }
    // Ctrl+Shift+I/J/C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      killPage();
      return false;
    }
    // Ctrl+U (view source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  });
  
  // Run all checks periodically
  setInterval(function() {
    checkSize();
    checkFirebug();
    try { consoleCheck(); } catch(e) {}
  }, 500);
  
  // Debugger check runs separately
  setInterval(checkDebugger, 1000);
  
  // Override console
  const noop = function() {};
  try {
    const fakeConsole = {
      log: noop, warn: noop, error: noop, info: noop, debug: noop,
      table: noop, clear: noop, dir: noop, dirxml: noop, trace: noop,
      assert: noop, count: noop, countReset: noop, group: noop,
      groupCollapsed: noop, groupEnd: noop, time: noop, timeLog: noop,
      timeEnd: noop, profile: noop, profileEnd: noop
    };
    Object.defineProperty(window, 'console', {
      get: function() { return fakeConsole; },
      set: noop
    });
  } catch(e) {}
  
})();
