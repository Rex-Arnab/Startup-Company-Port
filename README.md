# Startup Company

A business simulation game where you build and grow your own tech startup from the ground up. Hire employees, develop websites, manage servers, negotiate contracts, and compete to become the number one company in the world.

## About the Game

You start with a small office and a modest budget. Your goal is to:

- Build and launch websites (social media, video sharing, e-commerce, etc.)
- Hire developers, designers, managers, SysAdmins, and more
- Research new features and frameworks to grow your products
- Manage hosting infrastructure — racks, servers, cooling
- Negotiate ad contracts and venture capital deals
- Compete against rival companies for market share
- Retire with the largest possible retirement fund

The game runs in real-time with a day/night cycle. Each in-game day your employees work, servers run, contracts tick down, and your bank balance changes. Speed can be set to 1x, 2x, or 3x.

## Requirements

- macOS or Linux
- Node.js — if not installed, the launcher will attempt to install it via Homebrew (macOS) or nvm
- npm — bundled with Node.js
- An internet connection on first run (to download Electron)

## How to Play

### 1. Make the launcher executable

Open a terminal in the game's root folder and run:

```bash
chmod +x start.sh
```

This only needs to be done once.

### 2. Launch the game

```bash
./start.sh
```

The launcher will:
1. Check for Node.js and npm
2. Install npm dependencies if missing (including Electron)
3. Launch the game window

**Alternatively**, if you prefer to run it directly without the launcher:

```bash
cd resources/app
npm install --force --ignore-scripts
node node_modules/electron/install.js
npm start
```

### 3. First time setup

On first launch you will be asked to:
- Choose a language
- Accept the EULA
- Enter your company name and CEO name
- Select a game mode (Career or Custom)

### Game Modes

**Career Mode** — Recommended for new players. Follows a structured story with advisor messages and guided milestones.

**Custom Mode** — Set your own starting conditions: money, aging, investor on/off, days per year, and more.

## Languages

The game supports 37 languages including:

English, Arabic, Bengali (Banglish), Bulgarian, Catalan, Chinese (Simplified), Chinese (Traditional), Croatian, Czech, Danish, Dutch, Finnish, French, Georgian, German, Greek, Hebrew, Hindi (Hinglish), Hungarian, Indonesian, Italian, Japanese, Korean, Lithuanian, Norwegian, Polish, Portuguese (BR), Romanian, Russian, Serbian, Spanish (Spain), Swedish, Tagalog, Thai, Turkish, Ukrainian

> **Hinglish** and **Banglish** use romanized Hindi/Bengali written in English letters — the way people naturally type in chat (e.g. "kese ho", "kemon acho").

## Controls

| Action | Input |
|--------|-------|
| Pan camera | WASD or middle mouse drag |
| Zoom | Scroll wheel |
| Pause / Resume | Space |
| 1x speed | 1 |
| 2x speed | 2 |
| 3x speed | 3 |
| Rotate item (placement) | R or right-click |
| Delete item (placement) | Delete or right-click |

## Project Structure

```
.
+-- start.sh              # Launcher script
+-- resources/
    +-- app/
        +-- electron-start.js   # Electron entry point
        +-- package.json
        +-- languages/          # 37 language JSON files
        +-- dest/               # Compiled game assets
        +-- templates/          # HTML templates
        +-- images/             # Game artwork
        +-- mods/               # Bundled mods
```

## Troubleshooting

**Game does not open after `./start.sh`**
- Make sure Node.js is installed: `node --version`
- Try running manually: `cd resources/app && npm install --force --ignore-scripts && node node_modules/electron/install.js`

**`permission denied: ./start.sh`**
- Run `chmod +x start.sh` first

**npm install fails with native module errors**
- This is expected on macOS — the launcher uses `--ignore-scripts` to skip Windows-only native modules and installs Electron separately

## License

See `LICENSE` and `LICENSES.chromium.html` for details.
