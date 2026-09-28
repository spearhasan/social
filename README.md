# Spear Hasan Social Website

Official GitHub Pages site: <https://spearhasan.github.io/social/>

## Portable, complete HTML

`social-embed.html` is a complete standalone page: its CSS and JavaScript are inline, so no separate stylesheet or script needs to be copied. The profile and cover photos use absolute URLs from this existing GitHub Pages site, so they continue to load when the page is embedded or shared elsewhere.

- Open the hosted page: <https://spearhasan.github.io/social/social-embed.html>
- Download the HTML source: <https://raw.githubusercontent.com/spearhasan/social/main/social-embed.html>

### Embed on another website

Paste this where that website allows HTML iframes:

```html
<iframe
  src="https://spearhasan.github.io/social/social-embed.html"
  title="Spear Hasan official profile"
  loading="lazy"
  style="display:block;width:100%;max-width:520px;height:820px;border:0;border-radius:24px;margin:0 auto;"
  referrerpolicy="strict-origin-when-cross-origin">
</iframe>
```

If a platform does not allow iframes, share the hosted page URL above. Social networks can create a preview from its Open Graph metadata.

## GitHub-hosted image sources

These are the public image URLs used by the standalone page:

- Profile photo: <https://spearhasan.github.io/social/y.png>
- Cover photo: <https://spearhasan.github.io/social/pngs/cover.png>

Keep those URLs absolute (including `https://`) in copied HTML; relative paths such as `y.png` can point to the wrong website after a page is copied elsewhere.
