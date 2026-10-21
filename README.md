# AIR - private jet landing page (React + Vite)

## Run
```bash
npm install
npm run dev
```

## Settings (.env)
1. Copy `.env.example` to `.env` (same folder as `package.json`).
2. Fill in the EmailJS and Firebase values.
3. Restart `npm run dev` after every change of `.env`.

NEVER put real keys into `.env.example` - it is committed to GitHub. `.env` is ignored by Git.

## How orders work
A customer sends a request -> an e-mail goes to the admin (EmailJS) and the order is saved
to the Firestore database. The admin signs in on the main page with the admin e-mail
(password is stored in Firebase Authentication) and opens "Admin panel" in the header.

Firestore rules are in `firestore.rules` (paste them in Firebase -> Firestore -> Rules).

## Images
Put images into `public/images/` (names are listed in `public/images/README.txt`).
