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
   in this package) — it restricts approving/revoking/blocking to
   `pnkjverma8@gmail.com` only, lets each signed-in user write only
   their own access request, and lets each user keep their own
   email/name/photo fresh in `userStatus` (but not touch trial dates or
   paid status once set — only the admin can change those).
3. Click **Publish**.
⚠️ If you update this file later (e.g. after an app update), you must
re-paste and re-Publish it here — uploading the file to GitHub alone
does not change your live database rules.

## 6. Test the main app
Open `https://railwayemp.github.io/ta-record/` — sign in with any Google
account. First-time sign-in auto-starts a 30-day free trial and gets you
straight into the app. If you get an error about an unauthorized origin,
wait a bit longer for step 3 to propagate, then retry.

## 7. Open the admin panel
1. Open `https://railwayemp.github.io/ta-record/admin.html`
2. Sign in with `pnkjverma8@gmail.com` — this is the only account that
   can get into the admin panel (enforced by both the page and the
   database rules).
3. See section 9 below for the full free-trial + payment flow this
   panel manages.

## 8. Install as an app
Once it's live over https and all files are uploaded, open the site in
Chrome on your phone and use "Add to Home screen" or "Install app" from
the browser menu. It should install as a real standalone app (its own
icon, opens without the browser address bar) instead of a plain
bookmark shortcut. If it still installs as a shortcut, double-check that
`manifest.json`, `sw.js`, and both icon PNGs uploaded successfully and
sit in the same folder as `index.html`.

## 9. Free trial + payment flow (auto-approve, 30-day trial)
Every new Gmail user is now auto-approved instantly on their first
login — no manual step. Here's exactly how it works:

1. **First login**: the moment someone signs in with Google for the
   first time, they're automatically let into the app and a 30-day free
   trial starts, tracked in Firebase (`trialStartedAt` / `trialEndsAt`).
2. **During the 30 days**: they keep using the app. A floating gold
   button ("₹ Pay now for lifetime activation") sits bottom-left while
   logged in — tapping it opens a payment screen with your UPI QR code
   and a "Pay via UPI App" button, using the UPI ID `neha.0083@ptyes`.
3. **When the trial ends (or whenever you decide)**: open `admin.html`,
   find them under **1. Using without payment (active trial)**, and tap
   **Block**. Their `allowedUsers` entry is set to `false` and they move
   to the **2. Disapproved / blocked** section.
4. **What the blocked user sees**: next time they open the app, instead
   of the records screen they see an "Access paused" message — the
   exact text is whatever you've saved in the **"Message shown to
   disapproved / blocked users"** box at the top of `admin.html` (one
   global message for everyone, edit any time, tap **Save message**).
   They can enter their UPI transaction ID there too, so you can match
   it against your own payment notification.
5. **After they pay**: open `admin.html`, find them under **2.
   Disapproved / blocked** (their submitted UTR shows on the card),
   confirm against your payment notification, and tap **✓ Mark Paid &
   Approve**. They move to **3. Permanent users (paid)** — no trial
   timer, permanent access until you tap Block again.

The admin panel always shows three clearly separated groups:
1. **Using without payment** — active trial users, with days remaining.
2. **Disapproved / blocked** — access paused, shows their UTR if submitted.
3. **Permanent users (paid)** — marked paid, lifetime access.

This is a fully free-tier (Spark) flow — no Blaze plan, no card, no
webhook server needed. The only manual step is you tapping Block /
Mark Paid in `admin.html`, which takes a couple of seconds per user.
