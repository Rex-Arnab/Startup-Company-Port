# resources/app — Electron app

## Purpose

The app Electron loads: `electron-start.js` (main process) opens `index.html`, which loads the minified
game from `dest/`.

## Ownership

- Shipped by the game vendor: `dest/`, `index.html`, `diskView.html`, `isodom/`, `templates/`,
  `assets/`, `images/`, `sounds/`, `fonts/`, `help/`, `greenworks/`.
- Port-maintained: `package.json`, `electron-start.js`, `languages/`, `mods/`.

## Local Contracts

- `package.json` `main` = `electron-start.js`; Electron pinned to `^11.5.0`. The renderer needs
  `nodeIntegration: true`, `contextIsolation: false`, `enableRemoteModule: true` — the bundle uses
  `require`/`fs` directly. Do not harden these without a full play test.
- `--dev` opens DevTools; `index-development.html` only loads on the vendor's dev hostname.
- `configuration.js` holds game constants (`Configuration` object); it `require`s
  `./scripts/data/enums`, which is not shipped — only edit when loaded from the browser context.
- `dest/game.min.js` AND `dest/worker.min.js` each hardcode `Database.languages` (the language
  picker list). A file in `languages/` is not selectable unless listed in both. Port patch: Hindi
  (`hi`) and Bengali (`bn`) appended after Indonesian — keep them if the bundles are replaced.
- Known `dest/` patches (port-made, re-apply on any bundle update): the language list above; removed
  a testing override `i.total=1000` in `_loadEmployeeSpeeds` (forced every employee to 1,000% speed).
- `templates/*.html` are AngularJS templates bound by the bundle; keep their `ng-*` bindings intact.
- Save games live in `Game.debug.saveGameFolderPath` (`sg_*.json`), outside the repo.

- `electron-start.js` brings the window to the front on load and on `second-instance` (a relaunch
  after Restart is detached from the terminal and used to open hidden).

## Work Guidance

- `electron-start.js` uses CRLF line endings; the editor's format-on-save hook rewrites the whole
  file — insert lines by script and confirm `git diff --stat` shows only your lines.

- Change behavior through `mods/` first; patch `dest/` only as a last resort and say so.
- Keep `electron-start.js` free of new runtime deps not in `package.json`.

## Verification

- `node --check electron-start.js` after edits.
- `./start.sh` from repo root; reach the main menu and the screen you changed.
- Scripted check: `node_modules/.bin/electron . --remote-debugging-port=<free port>` (9333 is often
  taken by Chrome), then drive via CDP. The game auto-loads the last save and is single-instance;
  it ignores SIGTERM, so stop it with `kill -9 <main pid>`. Back up
  `~/Library/Application Support/Startup Company/SaveData` first; window size is saved to `options.json`.
- `npm install` rewrites `package-lock.json`; revert that unless the change is intended.

## Child DOX Index

- [languages/CLAUDE.md](languages/CLAUDE.md) — translation JSON files.
- [mods/CLAUDE.md](mods/CLAUDE.md) — bundled mods and the mod hook API.
