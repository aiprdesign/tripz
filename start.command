#!/bin/bash
cd "$(dirname "$0")"
echo "Installing dependencies (first time only)..."
npm install
echo ""
echo "Starting the app..."
echo "When you see 'Local: http://localhost:5173/' open that URL in your browser."
echo ""
npm run dev
echo ""
read -p "Press Enter to close this window..."
