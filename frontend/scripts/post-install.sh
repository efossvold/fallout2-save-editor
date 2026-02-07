#!/bin/sh
# Add vite 8 to @vitejs/plugin-react peerDependencies, otherwise wails fails to start
sed -i '' 's/"vite": "\(\^4.2.0 || \^5.0.0 || \^6.0.0 || \^7.0.0\)"/"vite": "\1 || \^8.0.0"/g' node_modules/@vitejs/plugin-react/package.json
