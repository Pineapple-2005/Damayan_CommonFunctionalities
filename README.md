# Damayan Workspace

This repository now contains a separated two-app structure:

- `web`: Next.js App Router project for the browser
- `mobile`: Expo Router project for Android, iOS, and Expo web

The original standalone files are still in the root for reference:

- `LoginPage.tsx`
- `LoginScreen.tsx`
- `preview.html`

## Included flows

Both apps include:

- Login
- Sign up
- Forgot password
- Dashboard
- Mock auth state so the flow works without a backend yet

### Demo login

- Email: `demo@damayan.app`
- Password: `password123`

You can also create a new account in each app and continue to the dashboard.

## Project structure

```text
.
|-- mobile
|   |-- app
|   `-- src
|-- web
|   |-- app
|   |-- components
|   `-- lib
|-- LoginPage.tsx
|-- LoginScreen.tsx
`-- preview.html
```

## Install

From the repository root:

```bash
npm install
```

## Run the web app

```bash
npm run dev:web
```

Then open `http://localhost:3000`.

## Run the mobile app

```bash
npm run dev:mobile
```

Then use Expo to open Android, iOS, or web.

## Where to add more pages

### Web

Add routes in `web/app`.

Examples:

- `web/app/profile/page.tsx`
- `web/app/requests/page.tsx`
- `web/app/settings/page.tsx`

### Mobile

Add screens in `mobile/app`.

Examples:

- `mobile/app/profile.tsx`
- `mobile/app/requests.tsx`
- `mobile/app/settings.tsx`

Shared mobile UI can live under `mobile/src`.

## Replacing mock auth with a real backend

### Web

Auth state lives in `web/lib/auth-context.tsx`.

### Mobile

Auth state lives in `mobile/src/providers/auth-provider.tsx`.

Replace the mock `login` and `signup` functions there with your real API calls.
