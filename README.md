# Membership FAQ

This is a lightweight, static FAQ section built in plain HTML, CSS, and JavaScript. It is set up to work directly on GitHub Pages and can also be embedded into Carrd with an iframe.

Live site:

```text
https://2413003.github.io/mkchess-faq-membership/
```

The page uses relative asset paths, so `index.html`, `styles.css`, and `script.js` all load correctly from the repository root on GitHub Pages.

## Files

- `index.html` contains the FAQ markup and SEO-friendly FAQ schema.
- `styles.css` contains the Apple-inspired styling and responsive layout.
- `script.js` powers the accordion interaction, chevron rotation, and auto-resizing embed behavior.
- `.nojekyll` keeps GitHub Pages from running Jekyll processing.

## Deploy To GitHub Pages

1. Push the files in this folder to the root of your GitHub repository.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select your main branch and the `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish your site.

This version is already published at:

```text
https://2413003.github.io/mkchess-faq-membership/
```

When you update `index.html`, `styles.css`, or `script.js` in the repository, GitHub Pages will redeploy the site automatically.

## Embed In Carrd

1. In Carrd, add an `Embed` element where you want the FAQ to appear.
2. Choose `Type: Code`.
3. Paste this snippet:

```html
<iframe
  id="mkchess-faq-frame"
  src="https://2413003.github.io/mkchess-faq-membership/"
  title="MK Chess Membership FAQ"
  scrolling="no"
  loading="lazy"
  style="width:100%; height:640px; border:0; display:block; overflow:hidden; background:#ffffff;"
></iframe>

<script>
  (function () {
    const iframe = document.getElementById("mkchess-faq-frame");
    const allowedOrigin = "https://2413003.github.io";

    function setFrameHeight(height) {
      if (!height || !iframe) return;
      iframe.style.height = Math.ceil(height) + "px";
    }

    window.addEventListener("message", function (event) {
      if (event.origin !== allowedOrigin) return;
      if (event.source !== iframe.contentWindow) return;
      if (!event.data || event.data.type !== "mkchess-faq-height") return;
      setFrameHeight(event.data.height);
    });
  })();
</script>
```

4. Publish your Carrd site.

If Carrd still shows a tiny jump on first load, raise the starting `height:640px` value a bit. After load, the script will resize it to the exact content height.
