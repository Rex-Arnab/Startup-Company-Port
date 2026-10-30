# Startup Company — macOS/Linux port

## Purpose

Repackaged Electron build of the game _Startup Company_ (v`version` = 4.0.2) so it runs on macOS/Linux
via `./start.sh`. There is NO game source here — gameplay ships as minified bundles in
`resources/app/dest/`. Work in this repo is packaging, launcher, translations and bundled mods.

## Canonical commands

- Launch: `./start.sh` (checks Node/npm, installs `resources/app/node_modules` + Electron 11, runs it).
- Manual: `cd resources/app && npm install --force --ignore-scripts && node node_modules/electron/install.js && npm start`.
- Dev tools: `resources/app/node_modules/.bin/electron resources/app --dev`.

## Verification gate

No test suite. Before claiming done:

1. Static check for what you touched (JSON parse, `node --check` on JS — see child docs).
2. Launch with `./start.sh` and confirm the changed thing in the real game window.

## Global conventions

- Do not hand-edit `resources/app/dest/*.min.*` unless asked; they are compiled output with no source.
- `resources/app/node_modules/` is gitignored and rebuilt by `start.sh`; never commit it.
- `start.sh` targets bash 3.2 (`set -eu`); keep it POSIX-friendly.
- Windows-only native deps in `package.json` (`regedit`, `windows-registry`) are why installs use
  `--ignore-scripts`. Do not remove that flag.
- Steam: `greenworks/` + `steam_appid.txt` are the Steam SDK bridge; leave as shipped.
- `firebase-debug.log` is tracked but also gitignored — do not add more logs.
- README images live in `docs/screenshots/*.webp` (1440×872, English UI). When retaking: back up
  SaveData first, and hide the Real Companies mod's adult-site competitor and the owner's name in
  the employee list before capturing.

## Child DOX Index

- [resources/app/CLAUDE.md](resources/app/CLAUDE.md) — Electron app shell, bundles, static content.
