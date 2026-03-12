#!/usr/bin/env bash
set -e
set -u

APP_DIR="$(cd "$(dirname "$0")/resources/app" && pwd)"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
fail() { echo -e "${RED}[✗]${NC} $1"; exit 1; }
info() { echo -e "    $1"; }

echo ""
echo "  Startup Company — launcher"
echo "  ─────────────────────────────"
echo ""

# ── 1. Node.js ────────────────────────────────────────────────────────────────
if command -v node >/dev/null 2>&1; then
    NODE_VER=$(node --version)
    ok "Node.js $NODE_VER"
else
    warn "Node.js not found. Attempting to install..."

    if command -v brew >/dev/null 2>&1; then
        info "Installing via Homebrew..."
        brew install node
        ok "Node.js installed via Homebrew."
    elif [ -s "$HOME/.nvm/nvm.sh" ]; then
        info "Installing via nvm..."
        source "$HOME/.nvm/nvm.sh"
        nvm install --lts
        nvm use --lts
        ok "Node.js installed via nvm."
    else
        fail "Cannot install Node.js automatically. Please install it from https://nodejs.org and re-run this script."
    fi
fi

# ── 2. npm ────────────────────────────────────────────────────────────────────
if command -v npm >/dev/null 2>&1; then
    NPM_VER=$(npm --version)
    ok "npm $NPM_VER"
else
    fail "npm not found. It should come bundled with Node.js. Try reinstalling Node.js from https://nodejs.org"
fi

# ── 3. node_modules / Electron ────────────────────────────────────────────────
ELECTRON_BIN="$APP_DIR/node_modules/.bin/electron"

if [ -f "$ELECTRON_BIN" ]; then
    ELECTRON_VER=$("$ELECTRON_BIN" --version 2>/dev/null || echo "unknown")
    ok "Electron $ELECTRON_VER (node_modules present)"
else
    warn "Electron not found in node_modules. Running npm install..."
    (cd "$APP_DIR" && npm install --force --ignore-scripts --silent && node node_modules/electron/install.js)

    if [ -f "$ELECTRON_BIN" ]; then
        ELECTRON_VER=$("$ELECTRON_BIN" --version 2>/dev/null || echo "unknown")
        ok "Electron $ELECTRON_VER installed."
    else
        fail "npm install completed but Electron binary still not found. Try running: cd resources/app && npm install --force --ignore-scripts && node node_modules/electron/install.js"
    fi
fi

# ── 4. Launch ─────────────────────────────────────────────────────────────────
echo ""
echo "  All checks passed. Launching Startup Company..."
echo ""

exec "$ELECTRON_BIN" "$APP_DIR"
