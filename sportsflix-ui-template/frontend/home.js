// Load unified channels for home page (CricHD + M3U combined internally)
function loadChannels() {
  const grid = document.getElementById("channels-grid");
  grid.innerHTML = '<div class="loading">Loading channels...</div>';
  
  // Load unified channels (CricHD and M3U combined internally)
  fetch('/api/all-channels')
    .then(r => r.json())
    .then(data => {
      displayChannels(data);
    })
    .catch(err => {
      console.error("Failed to load channels:", err);
      document.getElementById("channels-grid").innerHTML = 
        '<div style="color:red;padding:20px;text-align:center">Failed to load channels</div>';
    });
}

function displayChannels(channelData) {
  const grid = document.getElementById("channels-grid");
  grid.innerHTML = "";
  
  // Channels are already sorted (CricHD first, then M3U)
  const channelEntries = Object.entries(channelData);
  
  channelEntries.forEach(([name, data]) => {
    const card = document.createElement("div");
    card.className = "home-channel-card";
    card.dataset.channelName = name;
    
    // Add channel logo if available
    if (data.logo) {
      const img = document.createElement("img");
      img.src = data.logo;
      img.alt = name;
      img.referrerPolicy = "no-referrer";
      img.onerror = () => {
        if (!img.dataset.proxyTried && data.logo && !data.logo.startsWith("/api/logo")) {
          img.dataset.proxyTried = "1";
          img.src = `/api/logo?url=${encodeURIComponent(data.logo)}`;
          return;
        }
        // Show channel name if logo fails to load
        img.style.display = "none";
        const nameDiv = card.querySelector('.channel-name-fallback');
        if (nameDiv) nameDiv.style.display = "block";
      };
      card.appendChild(img);
    }
    
    // Channel name fallback (shown if no logo)
    const nameDiv = document.createElement("div");
    nameDiv.className = "channel-name-fallback";
    nameDiv.textContent = name.toUpperCase();
    nameDiv.style.display = data.logo ? "none" : "block";
    card.appendChild(nameDiv);
    
    // Click handler - navigate to channel page
    card.onclick = () => {
      window.location.href = `channel.html?channel=${encodeURIComponent(name)}`;
    };
    
    grid.appendChild(card);
  });
}

// Initial load
loadChannels();

