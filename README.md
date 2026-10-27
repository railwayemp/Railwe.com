# TA Record — GitHub Pages Deployment (for railwayemp)

This package updates your app to the new base version (with built-in
bilingual Format 2 printing) while keeping all previously added features:
Google Sign-In via Firebase, 30-day free trial + payment approval flow,
admin panel, PWA installability, and the About screen.

## 1. Upload files
Upload **all files in this package** to your existing repo root, replacing
the old versions:
`index.html`, `admin.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`
(`database.rules.json` is reference-only — see step 2, it does not get
uploaded to GitHub).

## 2. Re-check Realtime Database rules (only if you haven't already)
If you've already published these rules from a previous update, you can
skip this. Otherwise: go to
https://console.firebase.google.com/project/ndata-d2a16/database/ndata-d2a16-default-rtdb/rules,
paste the contents of `database.rules.json`, and click **Publish**.

## 3. What's new in this update
- Same login, trial, payment, and admin approval system as before — no
  new setup needed for those.
- The main app itself now includes a **second print format**: a bilingual
  (Hindi + English) G-6 Travelling Allowance Journal layout, available
  from the Print/Export screen alongside the original English format.
- All your existing Firebase config (project, UPI ID ₹11 offer price,
  auth domain `auth.railwe.com`) carried over unchanged.

## 4. Test
Open your live site (`https://railwe.com` or `https://railwayemp.github.io/...`)
in a fresh incognito tab. Sign in, open a TA record, tap Print/Export, and
confirm both the regular and bilingual print options appear and render
correctly.

## 5. Razorpay payment option (added)
The payment screen now offers a single way to pay:
1. **Razorpay Payment Link** — card/UPI/netbanking via Razorpay's hosted
   checkout page: `https://rzp.io/rzp/U8ogvjXt`

(The earlier UPI-only deep link/QR option has been removed — Razorpay's
page already supports UPI as one of its payment methods.)

### Important: no API keys are used in the app
Your Razorpay Key Secret is never placed in this file — it can't be
safely used from a browser-only app (GitHub Pages has no server). This
integration only uses a plain Payment Link URL, which is safe to
publish. Payment confirmation is manual, same as before:

1. The signed-in user's email is shown clearly on the payment screen
   itself (dashboard-generated Razorpay links can't be pre-filled with
   the customer's email via URL — that requires creating links through
   Razorpay's API with your Secret Key, which isn't done here for
   security reasons).
2. Check the Razorpay Dashboard for incoming payments and match by
   name/amount/time, and the email shown to the user in the app.
3. Open `admin.html`, find that user, and tap **✓ Mark Paid & Approve**
   — their access activates immediately.

If you later want this fully automatic (payment instantly unlocks access
with no manual step), that requires a server-side integration — e.g. a
Firebase Cloud Function using your Secret Key to verify payment status,
which needs the Blaze plan. Let me know if you want that built.
