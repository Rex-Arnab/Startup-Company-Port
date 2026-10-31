#!/usr/bin/env bash
# Startup Company launcher for Linux. Run: ./start-linux.sh
set -e
set -u

ROOT="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$ROOT/game/resources/app"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
fail() { echo -e "${RED}[✗]${NC} $1"; exit 1; }
info() { echo -e "    $1"; }

echo ""
echo "  Startup Company — Linux launcher"
echo "  ─────────────────────────────────"
echo ""

# ── 1. Node.js ────────────────────────────────────────────────────────────────
if command -v node >/dev/null 2>&1; then
    ok "Node.js $(node --version)"
elif [ -s "$HOME/.nvm/nvm.sh" ]; then
    warn "Node.js not found. Installing the LTS version via nvm..."
    source "$HOME/.nvm/nvm.sh"
    nvm install --lts
    nvm use --lts
    ok "Node.js installed via nvm."
else
    fail "Node.js not found. Install it with your package manager (e.g. 'sudo apt install nodejs npm') or from https://nodejs.org, then run this again."
fi

# ── 2. npm ────────────────────────────────────────────────────────────────────
if command -v npm >/dev/null 2>&1; then
    ok "npm $(npm --version)"
else
    fail "npm not found. Install it with your package manager (e.g. 'sudo apt install npm')."
fi

# ── 3. Electron ───────────────────────────────────────────────────────────────
ELECTRON_BIN="$APP_DIR/node_modules/.bin/electron"

if [ ! -f "$ELECTRON_BIN" ]; then
    warn "First run: installing Electron (needs internet)..."
    (cd "$APP_DIR" && npm install --force --ignore-scripts --silent && node node_modules/electron/install.js)
    [ -f "$ELECTRON_BIN" ] || fail "Electron did not install. Try: cd game/resources/app && npm install --force --ignore-scripts && node node_modules/electron/install.js"
fi
ok "Electron $("$ELECTRON_BIN" --version 2>/dev/null || echo "unknown")"

# ── 4. Apps menu entry (with the game icon) ───────────────────────────────────
# Rewritten on every start so it keeps pointing at this folder if you move it.
install_menu_entry() {
    local dir="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
    mkdir -p "$dir"
    cat > "$dir/startup-company.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=Startup Company
Comment=Build a tech startup and retire rich
Exec="$ROOT/start-linux.sh"
Path=$ROOT
Icon=$ROOT/game/launchers/linux/icon.png
Terminal=false
Categories=Game;Simulation;
EOF
    chmod +x "$dir/startup-company.desktop"
}

if [ "$(uname -s)" = "Linux" ]; then
    install_menu_entry && ok "Startup Company is in your apps menu (with its icon)."
fi

# ── 5. Launch ─────────────────────────────────────────────────────────────────
echo ""
echo "  Launching Startup Company..."
echo ""

exec "$ELECTRON_BIN" "$APP_DIR"
