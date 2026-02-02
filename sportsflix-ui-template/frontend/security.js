(function() {
  'use strict';
  
  // Block download manager browsers
  const ua = navigator.userAgent.toLowerCase();
  const blockedAgents = ["1dm", "1dm+", "idm", "adm", "advanced download manager", "idm+", "download manager"];
  
  if (blockedAgents.some(tag => ua.includes(tag))) {
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-size:24px;text-align:center;padding:20px;">This browser is not supported. Please use Chrome, Firefox, or Safari.</div>';
    return;
  }
  
  // Disable right-click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });
  
  // Disable text selection (except inputs)
  document.addEventListener('selectstart', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      return false;
    }
  });
  
  // Block keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
      e.preventDefault(); return false;
    }
    if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.keyCode === 83) { e.preventDefault(); return false; }
  });
  
})();
