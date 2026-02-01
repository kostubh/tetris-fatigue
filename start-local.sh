#!/bin/bash

# Start local server for testing Tetris Fatigue on mobile device

echo "🎮 Starting Tetris Fatigue Local Server..."
echo ""

# Get local IP address
if command -v ip &> /dev/null; then
    LOCAL_IP=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d/ -f1 | head -n1)
elif command -v ifconfig &> /dev/null; then
    LOCAL_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
else
    LOCAL_IP="YOUR_IP_ADDRESS"
fi

echo "📱 Access the game on your phone at:"
echo ""
echo "   http://$LOCAL_IP:8000"
echo ""
echo "   (Make sure your phone is on the same WiFi network)"
echo ""
echo "💻 Or on this computer at:"
echo ""
echo "   http://localhost:8000"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""
echo "---"
echo ""

# Start Python HTTP server
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ Error: Python not found. Please install Python 3 to run the local server."
    exit 1
fi
