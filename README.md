# TA Record — GitHub Pages Deployment (for railwayemp)

## 1. Create the repo
1. Go to https://github.com/new
2. Owner: `railwayemp`. Name it anything, e.g. `ta-record` (public or private, either works with Pages).
3. Upload **all files in this package** to the repo root:
   `index.html`, `admin.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`
   (all must sit in the same folder — don't rename or move any of them, the HTML references them by these exact filenames).
   `database.rules.json` is not uploaded to GitHub — it's just a reference for step 7 below.

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

## 4. Enable Google sign-in in Firebase Authentication
The app uses Firebase Authentication (not just Google's raw sign-in
widget) so that access approval can be enforced securely on the server
side, not just trusted from the browser.
1. Go to https://console.firebase.google.com/project/ndata-d2a16/authentication/providers
2. Click **Google** in the provider list → toggle **Enable** → set a
   support email (use pnkjverma8@gmail.com) → **Save**.
3. Still in Authentication, go to **Settings → Authorized domains** and
   add `railwayemp.github.io` if it isn't already listed.

## 5. Set Realtime Database security rules
1. Go to https://console.firebase.google.com/project/ndata-d2a16/database/ndata-d2a16-default-rtdb/rules
2. Replace the rules with the contents of `database.rules.json` (included
   in this package) — it restricts approving/revoking access to
   `pnkjverma8@gmail.com` only, and lets each signed-in user write only
   their own access request.
3. Click **Publish**.

## 6. Test the main app
Open `https://railwayemp.github.io/ta-record/` — sign in with any Google
account. If it's not yet approved, you'll see a "Waiting for approval"
screen. If you get an error about an unauthorized origin, wait a bit
longer for step 3 to propagate, then retry.

## 7. Approve access from the admin panel
1. Open `https://railwayemp.github.io/ta-record/admin.html`
2. Sign in with `pnkjverma8@gmail.com` — this is the only account that
   can get into the admin panel (enforced by both the page and the
   database rules).
3. You'll see the pending request listed with name/email/photo, plus
   any UPI transaction ID they've submitted. Tap **✓ Mark Paid &
   Approve** once you've confirmed the payment — that person can now
   reload the main app and get in.
4. **Revoke** removes access again at any time, one click.

## 8. Install as an app
Once it's live over https and all files are uploaded, open the site in
Chrome on your phone and use "Add to Home screen" or "Install app" from
the browser menu. It should install as a real standalone app (its own
icon, opens without the browser address bar) instead of a plain
bookmark shortcut. If it still installs as a shortcut, double-check that
`manifest.json`, `sw.js`, and both icon PNGs uploaded successfully and
sit in the same folder as `index.html`.

## 9. Payment-based access (manual approve, Razorpay Payment Link)
Since GitHub Pages is static-only and true webhook automation would
require Firebase's paid Blaze plan (still free at low usage, but needs a
card on file), this app uses a simpler, fully free flow instead:

1. You share your Razorpay Payment Link (or UPI QR) with the person
   outside the app.
2. After paying, they sign in to the main app with Google. On the
   "Waiting for approval" screen, they type their UPI transaction ID /
   UTR number and tap **Submit for review**.
3. Razorpay notifies you the instant payment succeeds (SMS/email/app).
4. Open `admin.html`, find their request — the UTR they submitted is
   shown right on the card — cross-check it against your Razorpay
   notification, then tap **✓ Mark Paid & Approve**. One tap, no typing.
5. They reload the app and are in immediately.

This keeps everything on the free Spark plan with no card required. If
you later want it fully automatic (no tap at all), that requires
upgrading to Blaze so a Cloud Function can receive Razorpay's webhook —
let me know if you want that built later.
