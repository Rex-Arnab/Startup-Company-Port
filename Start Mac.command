#!/usr/bin/env bash
# Startup Company launcher for macOS. Double-click this file in Finder.
set -e
set -u

APP_DIR="$(cd "$(dirname "$0")/game/resources/app" && pwd)"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
info() { echo -e "    $1"; }
fail() {
    echo -e "${RED}[✗]${NC} $1"
    echo ""
    read -r -p "Press Enter to close this window..." _ || true
    exit 1
}

echo ""
echo "  Startup Company — macOS launcher"
echo "  ─────────────────────────────────"
echo ""

# Finder starts .command files without your shell profile, so add the usual Node locations.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if ! command -v node >/dev/null 2>&1 && [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
fi

# ── 1. Node.js ────────────────────────────────────────────────────────────────
if command -v node >/dev/null 2>&1; then
    ok "Node.js $(node --version)"
elif command -v brew >/dev/null 2>&1; then
    warn "Node.js not found. Installing via Homebrew..."
    brew install node
    ok "Node.js installed via Homebrew."
else
    fail "Node.js not found. Install it from https://nodejs.org, then double-click this file again."
fi

# ── 2. npm ────────────────────────────────────────────────────────────────────
command -v npm >/dev/null 2>&1 || fail "npm not found. Reinstall Node.js from https://nodejs.org."
ok "npm $(npm --version)"

# ── 3. Electron ───────────────────────────────────────────────────────────────
ELECTRON_BIN="$APP_DIR/node_modules/.bin/electron"

if [ ! -f "$ELECTRON_BIN" ]; then
    warn "First run: installing Electron (needs internet)..."
    (cd "$APP_DIR" && npm install --force --ignore-scripts --silent && node node_modules/electron/install.js)
    [ -f "$ELECTRON_BIN" ] || fail "Electron did not install. Try: cd game/resources/app && npm install --force --ignore-scripts && node node_modules/electron/install.js"
fi
ok "Electron $("$ELECTRON_BIN" --version 2>/dev/null || echo "unknown")"

# ── 4. Launch ─────────────────────────────────────────────────────────────────
echo ""
echo "  Launching Startup Company... (you can close this window once the game is open)"
echo ""

exec "$ELECTRON_BIN" "$APP_DIR"
