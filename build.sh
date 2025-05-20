#!/usr/bin/env sh
SCRIPT_DIR=$(dirname `readlink -f "$0"`)
BUILD_DIR=$SCRIPT_DIR/build/bin
RELEASES_DIR=$SCRIPT_DIR/releases

wails build -upx -clean -webview2 embed -platform darwin/universal -o mac/F2SaveEditor.app || exit 1
wails build -webview2 embed -platform windows/arm64 -o win-arm64/F2SaveEditor.exe || exit 1
wails build -webview2 embed -platform windows/amd64 -o win-amd64/F2SaveEditor.exe || exit 1

# Cross compiling to Linux currently not supported
# wails build -webview2 embed -platform linux/arm64 -o linux-arm64/F2SaveEditor
# wails build -webview2 embed -platform linux/amd64 -o linux-amd64/F2SaveEditor

rm -rf $RELEASES_DIR/*
cd $BUILD_DIR
zip -ry $RELEASES_DIR/F2SaveEditor-mac-universal.zip F2SaveEditor.app
zip -rj $RELEASES_DIR/F2SaveEditor-win-amd64.zip $BUILD_DIR/win-amd64/F2SaveEditor.exe
zip -rj $RELEASES_DIR/F2SaveEditor-win-arm64.zip $BUILD_DIR/win-arm64/F2SaveEditor.exe

# Cross compiling to Linux currently not supported
# cd $BUILD_DIR/linux-amd64
# tar -cfz $RELEASES_DIR/F2SaveEditor-linux-amd64.tar.gz F2SaveEditor
# cd $BUILD_DIR/linux-arm64
# tar -cfz $RELEASES_DIR/F2SaveEditor-linux-arm64.tar.gz F2SaveEditor

# Create DMG (osx)
hdiutil create /tmp/tmp.dmg -ov -volname "F2SaveEditor" -fs HFS+ -srcfolder "$BUILD_DIR/F2SaveEditor.app"
hdiutil convert /tmp/tmp.dmg -format UDZO -o $RELEASES_DIR/F2SaveEditor-mac-universal.dmg

find $RELEASES_DIR -type f -exec ls -lh '{}' \;