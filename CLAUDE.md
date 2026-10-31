# Startup Company — macOS, Linux & Windows port

## Purpose

Repackaged Electron build of the game _Startup Company_ (`game/version` = 4.0.2) with one launcher
per OS. There is NO game source here — gameplay ships as minified bundles in
`game/resources/app/dest/`. Work in this repo is packaging, launchers, translations and bundled mods.

## Layout

- Repo root holds only the launchers, `README.md`, `LICENSE`, `docs/` and DOX files.
- `game/` holds everything the game needs (`resources/`, `steam_appid.txt`, `version`,
  `LICENSES.chromium.html`). Keep new game files inside `game/`, not at the root.

## Canonical commands

- Launch (macOS): `open "Startup Company.app"` (or double-click). Linux: `./start-linux.sh`.
  Windows: `Startup Company.exe`. Each checks Node/npm, installs Electron 11 into
  `game/resources/app/node_modules` on first run, then starts the game.
- Manual: `cd game/resources/app && npm install --force --ignore-scripts && node node_modules/electron/install.js && npm start`.
- Dev tools: `game/resources/app/node_modules/.bin/electron game/resources/app --dev`.

## Verification gate

No test suite. Before claiming done:

1. Static check for what you touched (JSON parse, `node --check` on JS, `bash -n` on launchers — see child docs).
2. Launch with `open "Startup Company.app"` and confirm the changed thing in the real game window.
   Linux and Windows launchers cannot be fully run here — say so instead of claiming them tested
   (see `game/launchers/CLAUDE.md` for the partial checks that do work).

## Global conventions

- Do not hand-edit `game/resources/app/dest/*.min.*` unless asked; they are compiled output with no source.
- `game/resources/app/node_modules/` is gitignored and rebuilt by the launchers; never commit it.
- Launchers live at the root (`Startup Company.app`, `Startup Company.exe`, `start-linux.sh`); their
  sources, icons and the backup `.bat` live in `game/launchers/`. All share the same steps — change
  them together. Rules: [game/launchers/CLAUDE.md](game/launchers/CLAUDE.md).
- Windows-only native deps in `package.json` (`regedit`, `windows-registry`) are why installs use
  `--ignore-scripts`. Do not remove that flag.
- Steam: `greenworks/` is a no-op stub and `game/steam_appid.txt` is shipped as-is; leave both.
- `game/firebase-debug.log` is tracked but also gitignored — do not add more logs.
- README images live in `docs/screenshots/*.webp` (1440×872, English UI). When retaking: back up
  SaveData first, and hide the Real Companies mod's adult-site competitor and the owner's name in
  the employee list before capturing.

## Child DOX Index

- [game/resources/app/CLAUDE.md](game/resources/app/CLAUDE.md) — Electron app shell, bundles, static content.
- [game/launchers/CLAUDE.md](game/launchers/CLAUDE.md) — Mac app, Windows exe, Linux menu entry: sources, build, checks.
