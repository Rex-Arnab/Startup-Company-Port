//go:build windows

// Startup Company launcher for Windows. Built into "Startup Company.exe" at the repo root by
// build.sh. Finds Node.js, installs Electron on the first run, then starts the game.
package main

import (
	"os"
	"os/exec"
	"path/filepath"
	"syscall"
	"unsafe"
)

const (
	mbOK           = 0x00000000
	mbIconError    = 0x00000010
	mbIconInfo     = 0x00000040
	createNoWindow = 0x08000000
)

var messageBox = syscall.NewLazyDLL("user32.dll").NewProc("MessageBoxW")

func show(text string, flags uintptr) {
	t, _ := syscall.UTF16PtrFromString(text)
	c, _ := syscall.UTF16PtrFromString("Startup Company")
	messageBox.Call(0, uintptr(unsafe.Pointer(t)), uintptr(unsafe.Pointer(c)), flags)
}

func fail(text string) {
	show(text, mbOK|mbIconError)
	os.Exit(1)
}

// run starts a command with no console window and appends its output to the log file.
func run(dir string, log *os.File, name string, args ...string) error {
	cmd := exec.Command(name, args...)
	cmd.Dir = dir
	cmd.Stdout = log
	cmd.Stderr = log
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true, CreationFlags: createNoWindow}
	return cmd.Run()
}

func main() {
	exe, err := os.Executable()
	if err != nil {
		fail("Could not find where the launcher is.")
	}
	appDir := filepath.Join(filepath.Dir(exe), "game", "resources", "app")
	electron := filepath.Join(appDir, "node_modules", "electron", "dist", "electron.exe")

	if _, err := os.Stat(appDir); err != nil {
		fail("The game folder is missing. Keep this launcher next to the 'game' folder.")
	}

	if _, err := os.Stat(electron); err != nil {
		if _, err := exec.LookPath("node"); err != nil {
			fail("Node.js is needed to run the game.\n\nInstall it from https://nodejs.org, then open the game again.")
		}
		show("First run: Electron will now be installed (needs internet).\n\nClick OK. The game opens by itself when it is done, in about a minute.", mbOK|mbIconInfo)

		logPath := filepath.Join(os.TempDir(), "StartupCompanyLauncher.log")
		log, _ := os.Create(logPath)
		installErr := run(appDir, log, "cmd", "/c", "npm", "install", "--force", "--ignore-scripts")
		if installErr == nil {
			installErr = run(appDir, log, "node", filepath.Join("node_modules", "electron", "install.js"))
		}
		log.Close()
		if _, err := os.Stat(electron); installErr != nil || err != nil {
			fail("Electron did not install. Check your internet connection and try again.\n\nDetails: " + logPath)
		}
	}

	game := exec.Command(electron, appDir)
	game.Dir = appDir
	if err := game.Start(); err != nil {
		fail("The game could not start: " + err.Error())
	}
}
