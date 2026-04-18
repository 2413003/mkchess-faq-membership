const EMBED_MESSAGE_TYPE = "mkchess-faq-height";
const EMBED_SYNC_DELAYS = [0, 180, 620, 1200, 2400, 4000];
const EMBED_KEEPALIVE_INTERVAL_MS = 1000;
const EMBED_KEEPALIVE_RUNS = 12;
const accordion = document.querySelector("[data-accordion]");
const isEmbedded = window.parent !== window;
let embedKeepaliveId = null;

const getPageHeight = () =>
  Math.ceil(
    Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    )
  );

const postHeightToParent = () => {
  if (!isEmbedded) {
    return;
  }

  window.parent.postMessage(
    {
      type: EMBED_MESSAGE_TYPE,
      height: getPageHeight(),
    },
    "*"
  );
};

const syncEmbedHeight = () => {
  window.requestAnimationFrame(() => {
    EMBED_SYNC_DELAYS.forEach((delay) => {
      window.setTimeout(postHeightToParent, delay);
    });
  });
};

const startEmbedKeepalive = () => {
  if (!isEmbedded || embedKeepaliveId !== null) {
    return;
  }

  let runs = 0;

  embedKeepaliveId = window.setInterval(() => {
    postHeightToParent();
    runs += 1;

    if (runs >= EMBED_KEEPALIVE_RUNS) {
      window.clearInterval(embedKeepaliveId);
      embedKeepaliveId = null;
    }
  }, EMBED_KEEPALIVE_INTERVAL_MS);
};

if ("ResizeObserver" in window) {
  const resizeObserver = new ResizeObserver(() => {
    syncEmbedHeight();
  });

  resizeObserver.observe(document.documentElement);
  resizeObserver.observe(document.body);
}

window.addEventListener("DOMContentLoaded", () => {
  syncEmbedHeight();
  startEmbedKeepalive();
});
window.addEventListener("load", syncEmbedHeight);
window.addEventListener("pageshow", syncEmbedHeight);
window.addEventListener("resize", syncEmbedHeight);

if (document.fonts?.ready) {
  document.fonts.ready.then(syncEmbedHeight);
}

if (accordion) {
  const items = Array.from(accordion.querySelectorAll(".faq-item"));
  const triggers = items.map((item) => item.querySelector(".faq-trigger"));

  const closeItem = (item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");

    item.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    panel.style.maxHeight = "0px";
  };

  const openItem = (item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");
    const inner = item.querySelector(".faq-panel-inner");

    item.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    panel.style.maxHeight = `${inner.scrollHeight}px`;
  };

  const syncOpenItemHeight = () => {
    items
      .filter((item) => item.classList.contains("is-open"))
      .forEach((item) => {
        const panel = item.querySelector(".faq-panel");
        const inner = item.querySelector(".faq-panel-inner");

        panel.style.maxHeight = `${inner.scrollHeight}px`;
      });
  };

  items.forEach((item) => closeItem(item));

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const item = items[index];
      const isOpen = item.classList.contains("is-open");

      items.forEach((otherItem) => {
        if (otherItem !== item) {
          closeItem(otherItem);
        }
      });

      if (isOpen) {
        closeItem(item);
        syncEmbedHeight();
        return;
      }

      openItem(item);
      syncEmbedHeight();
    });

    trigger.addEventListener("keydown", (event) => {
      let nextIndex = null;

      if (event.key === "ArrowDown") {
        nextIndex = (index + 1) % triggers.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (index - 1 + triggers.length) % triggers.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = triggers.length - 1;
      }

      if (nextIndex === null) {
        return;
      }

      event.preventDefault();
      triggers[nextIndex].focus();
    });
  });

  window.addEventListener("resize", () => {
    syncOpenItemHeight();
    syncEmbedHeight();
  });
}
