# mods — bundled community mods

## Purpose

Mods shown in the in-game **Mods** menu. Each subfolder is one mod; toggling one needs a game restart.

## Ownership

Third-party authors (see `mod.json` `author`). Credit is listed in the root `README.md` table.

## Local Contracts

- Folder layout: `mod.json` (required: `name`, `author`, `description`; optional `displayName`),
  `start.js` (entry), `thumbnail.png`. Optional: `locales/<lang>.json`, extra `.html` views, `images/`.
- `start.js` is a CommonJS module. Hooks in use: `initialize(modPath)`, `onLoadGame(settings)`,
  `onNewDay(settings)`, `onNewHour(settings)`, `onBackgroundWorkerStart(...)`, `onUnsubscribe(...)`.
- Hooks mutate the live `settings` save object directly — keep changes save-compatible.
- Folder names may contain spaces (`Real Companies`, `Upgrade Employees`); quote paths.

## Work Guidance

- Adding or removing a mod: update the root `README.md` Bundled Mods table.
- Don't add new junk files (`Thumbs.db`, `*.bak`, `*.iml`) to new mods.

## Verification

- `for f in game/resources/app/mods/*/start.js; do node --check "$f" || echo "FAIL $f"; done` (run from repo root).
- `for f in game/resources/app/mods/*/mod.json; do node -e 'JSON.parse(require("fs").readFileSync(process.argv[1]))' "$f" || echo "FAIL $f"; done`.
- Enable the mod in-game, restart, and confirm its effect.

## Child DOX Index

None.
