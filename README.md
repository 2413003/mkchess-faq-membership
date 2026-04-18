# Membership FAQ

This is a lightweight, static FAQ section built in plain HTML, CSS, and JavaScript so it can be hosted directly on GitHub Pages and embedded into Carrd.

Live site:

```text
Add your new GitHub Pages URL here once the repository is published
```

## Files

- `index.html` contains the FAQ markup and SEO-friendly FAQ schema.
- `styles.css` contains the Apple-inspired styling and responsive layout.
- `script.js` powers the accordion interaction, chevron rotation, and auto-resizing embed behavior.
- `.nojekyll` keeps GitHub Pages from running Jekyll processing.

## Deploy To GitHub Pages

1. Create a new GitHub repository for this folder's contents.
2. Upload the files in this folder to the root of that repository.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your main branch and the `/ (root)` folder, then save.
6. Wait for GitHub Pages to publish your site.

Your published URL will usually look like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

## Embed In Carrd

1. In Carrd, add an `Embed` element where you want the FAQ to appear.
2. Choose `Type: Code`.
3. Replace the placeholder URL below with your new GitHub Pages URL, then paste the full snippet:

```html
<iframe
  id="mkchess-faq-frame"
  src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/"
  title="FAQs"
  scrolling="no"
  loading="lazy"
  style="width:100%; height:640px; border:0; display:block; overflow:hidden; background:#ffffff;"
></iframe>

<script>
  (function () {
    const iframe = document.getElementById("mkchess-faq-frame");
    const allowedOrigin = "https://YOUR-USERNAME.github.io";

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

When you send me the final GitHub Pages link for this version, I can update this README with the exact live URL and Carrd snippet.
