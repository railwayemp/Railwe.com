# TA Record — GitHub Pages Deployment (for railwayemp)

## 1. Create the repo
1. Go to https://github.com/new
2. Owner: `railwayemp`. Name it anything, e.g. `ta-record` (public or private, either works with Pages).
3. Upload **all files in this package** to the repo root:
   `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`
   (all five must sit in the same folder as `index.html` — don't rename or move any of them, the HTML references them by these exact filenames).

## 2. Enable GitHub Pages
1. In the repo: **Settings → Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Branch: `main`, folder: `/ (root)`. Save.
4. Your site will be live at:
   `https://railwayemp.github.io/ta-record/`
   (replace `ta-record` if you named the repo something else — takes ~1 minute to go live after first save)

## 3. Authorize that URL for Google Sign-In
1. Go to https://console.cloud.google.com/apis/credentials
2. Click your existing OAuth Client ID
   (`662753516550-mg8m1h9bfm9jkmonkn0qa7q1eaioo0ck.apps.googleusercontent.com`).
3. Under **Authorized JavaScript origins**, click **+ Add URI** and add exactly:
   ```
   https://railwayemp.github.io
   ```
   ⚠️ Origin only — no trailing slash, no `/ta-record` path.
4. Save. Changes can take a few minutes to a few hours to propagate.

## 4. Test
Open `https://railwayemp.github.io/ta-record/` — you should see the
Google Sign-In button. If you get an error about an unauthorized origin,
wait a bit longer for step 3 to propagate, then retry.

## 5. Install as an app
Once it's live over https and all 5 files are uploaded, open the site in
Chrome on your phone and use "Add to Home screen" or "Install app" from
the browser menu. It should now install as a real standalone app (its
own icon, opens without the browser address bar) instead of a plain
bookmark shortcut. If it still installs as a shortcut, double-check that
`manifest.json`, `sw.js`, and both icon PNGs uploaded successfully and
sit in the same folder as `index.html`.
