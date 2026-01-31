# Tetris Fatigue - Adaptive Speed Tetris

An innovative web-based Tetris game where block speed adapts to player behavior, creating a more personalized and fatigue-aware gaming experience.

## Project Status
🎯 **Current Phase:** Concept & Design → Ready for Implementation
🚀 **Technology:** JavaScript (Vanilla - no frameworks needed)

## Concept

Traditional Tetris increases in difficulty until the player fails. This project explores adaptive difficulty mechanisms that adjust block speed based on player behavior or input, allowing for longer, more enjoyable play sessions.

**"Let players play longer, not harder"**

## Adaptive Speed Mechanisms

The game will implement one or more of these innovative control schemes:

1. **Touch Rate Detection** - Slower tapping when rotating blocks = player fatigue → reduce speed
2. **Phone Tilt Control** - More vertical device = faster blocks (player choice via DeviceOrientationEvent)
3. **Stack Height Compensation** - Speed increases but compensates when stack grows tall
4. **Brake Button** - Strategic speed reduction via dedicated control

See [GAME_DESIGN.md](GAME_DESIGN.md) for detailed design documentation.

## Technology Stack

- **Language:** JavaScript (Vanilla - no frameworks)
- **Rendering:** HTML5 Canvas
- **Styling:** CSS3
- **Deployment:** GitHub Pages (free hosting)
- **Platform:** Web-based, works on desktop and mobile browsers

## Why JavaScript?

This project initially considered Python but switched to JavaScript because:
- ✅ Native web environment (no compilation needed)
- ✅ Full mobile sensor access (DeviceMotionEvent, DeviceOrientationEvent)
- ✅ Native touch event support
- ✅ Easy free deployment (GitHub Pages, Netlify, Vercel)
- ✅ Works on any device with a browser
- ✅ No installation required for players

## Resources

- **[GAME_DESIGN.md](GAME_DESIGN.md)** - Comprehensive game design document
- **[EXISTING_IMPLEMENTATIONS.md](EXISTING_IMPLEMENTATIONS.md)** - Research on JavaScript Tetris implementations, mobile sensor APIs, and deployment strategies

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari)
- Text editor (VS Code, Sublime, etc.)
- Local HTTP server for testing

### Quick Start

```bash
# Clone this repository
git clone https://github.com/yourusername/tetris-fatigue.git
cd tetris-fatigue

# Start local server (choose one)
python -m http.server 8000
# or
npx serve .

# Open in browser
# Desktop: http://localhost:8000
# Mobile: http://YOUR_IP:8000
```

### Development Plan

1. **Select Base Implementation** - Start with straker's gist or shorve6/Tetris
2. **Implement Stack Height Adaptation** - No sensors needed, works everywhere
3. **Add Touch Rate Detection** - Detect player fatigue via tap frequency
4. **Implement Tilt Control** - Use gyroscope for speed control
5. **Add Brake Button** - Strategic speed management
6. **Deploy to GitHub Pages** - Free hosting

## Deployment

### GitHub Pages (Free)
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and folder
4. Your game will be live at `https://yourusername.github.io/tetris-fatigue`

### Alternative Options
- **Netlify:** Drag-and-drop deployment
- **Vercel:** CLI deployment with fast CDN
- **CodePen:** Quick prototyping and sharing

See [EXISTING_IMPLEMENTATIONS.md](EXISTING_IMPLEMENTATIONS.md) for detailed deployment guides.

## Recommended Starting Repositories

Based on research, these JavaScript implementations are excellent starting points:

1. **straker's Basic Tetris** (GitHub Gist) - CC0 license, ~300 lines, perfect for learning
2. **shorve6/Tetris** - Mobile-ready, MIT license
3. **jakesgordon/javascript-tetris** - Professional, well-documented
4. **hoffhannisyan/javascript-tetris** - Vanilla JS, no dependencies

Full list with code examples in [EXISTING_IMPLEMENTATIONS.md](EXISTING_IMPLEMENTATIONS.md).

## Mobile Sensor APIs

This project leverages modern browser APIs for adaptive controls:

- **Touch Events API** - Track tap frequency for fatigue detection
- **DeviceOrientationEvent** - Gyroscope access for tilt controls
- **DeviceMotionEvent** - Accelerometer for motion detection
- **GyroNorm.js** (optional) - Cross-device sensor normalization

### Permission Note
iOS 13+ requires user permission for sensor access. The game will handle this with a permission request button.

## Browser Compatibility

- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS with sensor permissions)
- ✅ Edge (Desktop & Mobile)

## File Structure

```
tetris-fatigue/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Game styling
├── js/
│   ├── game.js         # Core Tetris logic
│   ├── adaptive.js     # Adaptive speed mechanisms
│   ├── sensors.js      # Mobile sensor handling
│   └── ui.js           # UI controls and feedback
├── assets/
│   └── sounds/         # Optional sound effects
├── docs/
│   ├── GAME_DESIGN.md
│   └── EXISTING_IMPLEMENTATIONS.md
└── README.md
```

## Contributing

This is currently in the design-to-implementation phase. Contributions and feedback on the adaptive mechanisms are welcome! Feel free to:
- Test different adaptive algorithms
- Suggest new fatigue detection methods
- Improve mobile sensor handling
- Enhance UI/UX

## License

TBD (Will likely be MIT to match base implementations)

## Acknowledgments

- Inspired by classic Tetris and modern game accessibility research
- Built on open-source JavaScript Tetris implementations (see EXISTING_IMPLEMENTATIONS.md)
- Thanks to the web development community for sensor API documentation and examples
