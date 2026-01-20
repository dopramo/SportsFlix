function parseDonationText(text) {
  const blocks = text
    .split(/\n\s*\n/g)
    .map(block => block.split("\n").map(l => l.trim()).filter(Boolean))
    .filter(block => block.length > 0);

  return blocks.map(lines => {
    let title = lines[0] || "Wallet";
    let address = lines[1] || "";
    let network = "";

    const looksLikeAddress = (value) =>
      value && (/^0x/i.test(value) || value.length > 24);

    if (looksLikeAddress(title) && !address) {
      address = title;
      title = "Wallet";
    } else if (looksLikeAddress(title) && looksLikeAddress(address)) {
      address = title;
      title = "Wallet";
    }

    for (const line of lines) {
      if (/^network/i.test(line)) {
        network = line.replace(/^network\s*/i, "").trim();
      }
    }

    return { title, address, network };
  });
}

function copyText(text, button) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      button.classList.add("copied");
      button.textContent = "Copied";
      setTimeout(() => {
        button.classList.remove("copied");
        button.textContent = "Copy";
      }, 1500);
    });
    return;
  }

  const temp = document.createElement("textarea");
  temp.value = text;
  temp.setAttribute("readonly", "");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  button.classList.add("copied");
  button.textContent = "Copied";
  setTimeout(() => {
    button.classList.remove("copied");
    button.textContent = "Copy";
  }, 1500);
}

function buildDonationModal(items) {
  const modal = document.createElement("div");
  modal.className = "donation-modal";
  modal.innerHTML = `
    <div class="donation-card" role="dialog" aria-modal="true" aria-label="Support">
      <div class="donation-header">
        <h3>Support Us</h3>
        <button class="donation-close" type="button" aria-label="Close">×</button>
      </div>
      <div class="donation-body"></div>
    </div>
  `;

  const body = modal.querySelector(".donation-body");
  items.forEach(item => {
    const block = document.createElement("div");
    block.className = "donation-item";
    const network = item.network ? `<div class="donation-network">Network: ${item.network}</div>` : "";
    block.innerHTML = `
      <h4>${item.title}</h4>
      <div class="donation-address">${item.address || ""}</div>
      ${network}
      <div class="donation-actions">
        <button type="button" class="donation-copy">Copy</button>
      </div>
    `;
    const copyButton = block.querySelector(".donation-copy");
    copyButton.addEventListener("click", () => copyText(item.address, copyButton));
    body.appendChild(block);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("open");
    }
  });

  modal.querySelector(".donation-close").addEventListener("click", () => {
    modal.classList.remove("open");
  });

  document.body.appendChild(modal);
  return modal;
}

function wireDonationModal() {
  const triggers = document.querySelectorAll("[data-donation='open']");
  if (!triggers.length) return;

  fetch("/donation.txt", { cache: "no-cache" })
    .then(response => response.text())
    .then(text => {
      const items = parseDonationText(text);
      const modal = buildDonationModal(items);
      triggers.forEach(trigger => {
        trigger.addEventListener("click", (event) => {
          event.preventDefault();
          modal.classList.add("open");
        });
      });
    })
    .catch(() => {
      // If donation.txt fails, don't block the UI
    });
}

document.addEventListener("DOMContentLoaded", wireDonationModal);

