#!/usr/bin/env sh
SCRIPT_DIR=$(dirname `readlink -f "$0"`)
BUILD_DIR=$SCRIPT_DIR/bin
RELEASES_DIR=$SCRIPT_DIR/releases

rm -rf $BUILD_DIR/*
rm -rf $RELEASES_DIR/*

cd $BUILD_DIR

echo "#\n# BUILDING MAC UNIVERSAL \n#"
wails3 task darwin:package:universal
zip -ry $RELEASES_DIR/F2SaveEditor-mac-universal.zip F2SaveEditor.app
hdiutil create /tmp/tmp.dmg -ov -volname "F2SaveEditor" -fs HFS+ -srcfolder "$BUILD_DIR/F2SaveEditor.app"
hdiutil convert /tmp/tmp.dmg -format UDZO -o $RELEASES_DIR/F2SaveEditor-mac-universal.dmg

echo "\n#\n# WINDOWS ARM64 \n#"
wails3 build GOOS=windows GOARCH=arm64
zip -rj $RELEASES_DIR/F2SaveEditor-win-arm64.zip $BUILD_DIR/F2SaveEditor.exe
mv $BUILD_DIR/F2SaveEditor.exe $BUILD_DIR/F2SaveEditor-arm64.exe

echo "\n#\n# WINDOWS AMD64 \n#"
wails3 build GOOS=windows GOARCH=amd64
zip -rj $RELEASES_DIR/F2SaveEditor-win-amd64.zip $BUILD_DIR/F2SaveEditor.exe
mv $BUILD_DIR/F2SaveEditor.exe $BUILD_DIR/F2SaveEditor-amd64.exe

find $RELEASES_DIR -type f -exec ls -lh '{}' \;

# Avoid linter errors. When panda codegen is run in production mode
# vscode detect lots of errors. Thus, run codegen in dev mode (default)
cd ../frontend
panda codegen --clean --silent