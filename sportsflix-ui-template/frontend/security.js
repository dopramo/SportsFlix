(function() {
  'use strict';
  
  // Block download manager browsers (1DM, IDM, ADM, etc.)
  const ua = navigator.userAgent.toLowerCase();
  const blockedAgents = ["1dm", "1dm+", "idm", "adm", "advanced download manager", "idm+", "download manager"];
  
  if (blockedAgents.some(tag => ua.includes(tag))) {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-size:24px;text-align:center;padding:20px;">This browser is not supported. Please use Chrome, Firefox, or Safari.</div>';
    return;
  }
  
  // Disable right-click context menu
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
  
  // Disable drag
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Block keyboard shortcuts for dev tools
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      closeTab();
      return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Dev Tools)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault();
      closeTab();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      closeTab();
      return false;
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      return false;
    }
  });
  
  // DevTools detection using size difference
  let devToolsOpen = false;
  const threshold = 160;
  
  function checkDevTools() {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        closeTab();
      }
    } else {
      devToolsOpen = false;
    }
  }
  
  // DevTools detection using debugger timing
  function detectDebugger() {
    const start = performance.now();
    debugger;
    const end = performance.now();
    if (end - start > 100) {
      closeTab();
    }
  }
  
  // Close tab function
  function closeTab() {
    // Try multiple methods to close/redirect
    try {
      window.open('', '_self');
      window.close();
    } catch(e) {}
    
    // If close fails, redirect to blank or show warning
    setTimeout(function() {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-size:24px;text-align:center;padding:20px;flex-direction:column;"><div style="font-size:48px;margin-bottom:20px;">⚠️</div><div>Developer tools detected.<br>Please close this tab.</div></div>';
      // Clear all intervals and remove video elements
      for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
        window.clearTimeout(i);
      }
      // Remove video/iframe elements
      document.querySelectorAll('video, iframe').forEach(el => el.remove());
    }, 100);
  }
  
  // Run checks periodically
  setInterval(checkDevTools, 1000);
  
  // Disable console methods
  const noop = function() {};
  try {
    Object.defineProperty(window, 'console', {
      get: function() {
        return {
          log: noop,
          warn: noop,
          error: noop,
          info: noop,
          debug: noop,
          table: noop,
          clear: noop,
          dir: noop,
          dirxml: noop,
          trace: noop,
          assert: noop,
          count: noop,
          countReset: noop,
          group: noop,
          groupCollapsed: noop,
          groupEnd: noop,
          time: noop,
          timeLog: noop,
          timeEnd: noop,
          profile: noop,
          profileEnd: noop
        };
      },
      set: noop
    });
  } catch(e) {}
  
})();
