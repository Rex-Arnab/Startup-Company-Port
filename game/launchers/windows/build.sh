#!/usr/bin/env bash
# Rebuilds "Startup Company.exe" at the repo root (cross-compiles from macOS/Linux).
# Needs Go and go-winres: go install github.com/tc-hib/go-winres@v0.3.3
set -eu
cd "$(dirname "$0")"
go-winres simply --icon icon.ico --manifest gui --product-name "Startup Company" --file-description "Startup Company launcher"
GOOS=windows GOARCH=amd64 go build -trimpath -ldflags "-H=windowsgui -s -w" -o "../../../Startup Company.exe" .
rm -f rsrc_windows_*.syso
echo "Built: Startup Company.exe"
