# game/launchers — per-OS launchers

## Purpose

Sources, icons and build steps for the launchers that sit at the repo root. All launchers do the
same three steps: find Node/npm, install Electron into `game/resources/app/node_modules` on first
run, start the game.

## Ownership

Port-maintained. Icons come from the game (`game/resources/app/images/favicon.icns` / `.ico`).

## Local Contracts

- **macOS** — `Startup Company.app` at the root. Script: `Contents/MacOS/launcher` (bash 3.2, mode
  100755), icon `Contents/Resources/AppIcon.icns`, `Info.plist` must pass `plutil -lint`. It must
  start Electron with `open -n …/Electron.app --args <app dir>`: a plain child process is killed by
  macOS when the launcher app exits. Errors go to dialogs; log at `~/Library/Logs/StartupCompanyLauncher.log`.
- **Windows** — `Startup Company.exe` at the root is built from `windows/main.go` by
  `windows/build.sh` (Go + `go-winres@v0.3.3`, GUI subsystem, icon from `windows/icon.ico`). Rebuild
  and commit the exe after any change to `main.go`. `windows/start-windows.bat` is the unsigned-exe
  fallback; it must keep CRLF (`.gitattributes`).
- **Linux** — `start-linux.sh` at the root (bash, mode 100755). On Linux only, it rewrites
  `~/.local/share/applications/startup-company.desktop` with absolute paths and `linux/icon.png`.

## Verification

- macOS: `bash -n "Startup Company.app/Contents/MacOS/launcher"`, then `open "Startup Company.app"` and
  confirm the game process is still alive after 15 s and is the front app.
- Windows: `(cd game/launchers/windows && GOOS=windows go vet .)`; `go-winres extract` on the exe shows
  the icon; run it under Wine in a throwaway `WINEPREFIX` (no Node there → the "Node.js is needed"
  dialog is the expected pass). Real Windows is untested — say so.
- Linux: `bash -n start-linux.sh`; extract `install_menu_entry` and run it with a temp
  `XDG_DATA_HOME` to check the `.desktop` paths. Real Linux is untested — say so.

## Child DOX Index

None.
