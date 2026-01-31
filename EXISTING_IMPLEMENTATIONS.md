# Existing JavaScript Tetris Implementations & Resources

## Overview
This document catalogs existing JavaScript Tetris implementations that serve as excellent starting points for the adaptive Tetris project. JavaScript is ideal for this project due to native web support, full mobile sensor access, and straightforward deployment.

## Why JavaScript?

### Advantages Over Python/Pygame
- **Native Web Environment:** No compilation or conversion needed
- **Full Mobile Sensor Access:** DeviceMotionEvent and DeviceOrientationEvent APIs
- **Touch Events:** Native browser support, optimized for mobile
- **Free Deployment:** GitHub Pages, Netlify, Vercel - all free
- **Cross-Platform:** Works on desktop, mobile, tablet without modification
- **No Installation Required:** Users just visit a URL

## Recommended JavaScript Repositories

### 🌟 Top Pick: straker's Basic Tetris (GitHub Gist)
- **URL:** https://gist.github.com/straker/3c98304f8a6a9174efd8292800891ea1
- **License:** CC0 1.0 Universal (most permissive - free for any use, personal or commercial)
- **Highlights:**
  - Clean, minimal implementation (~300 lines)
  - Vanilla JavaScript, no dependencies
  - Easy to understand and modify
  - Perfect for learning core game loop logic
- **Best for:** Starting point for adaptive mechanics implementation

### 1. **jakesgordon/javascript-tetris**
- **URL:** https://github.com/jakesgordon/javascript-tetris
- **License:** MIT
- **Highlights:**
  - Well-documented, professional implementation
  - Modular code structure
  - Good separation of game logic and rendering
- **Best for:** Production-ready foundation

### 2. **hoffhannisyan/javascript-tetris**
- **URL:** https://github.com/hoffhannisyan/javascript-tetris
- **License:** MIT
- **Highlights:**
  - Pure HTML5, CSS3, and JavaScript
  - No external libraries or frameworks
  - Complete implementation with scoring
- **Best for:** Understanding vanilla JS approach

### 3. **shorve6/Tetris**
- **URL:** https://github.com/shorve6/Tetris
- **License:** MIT
- **Highlights:**
  - **Mobile-ready design** (desktop AND mobile)
  - Modern implementation with HTML5 Canvas
  - Responsive CSS3 styling
- **Best for:** Mobile-first development (highly relevant for this project)

### 4. **kubowania/Tetris**
- **URL:** https://github.com/kubowania/Tetris
- **License:** MIT
- **Highlights:**
  - Vanilla JavaScript game
  - Clean, educational code
- **Best for:** Learning-focused implementation

### 5. **rarioj/tetris**
- **URL:** https://github.com/rarioj/tetris
- **License:** Open source
- **Highlights:**
  - Pure JavaScript clone
  - No framework dependencies
- **Best for:** Minimal, straightforward approach

## Learning Resources

### Tutorial Collections
1. **20+ JavaScript Tetris Games** (DevSnap)
   - URL: https://devsnap.me/javascript-tetris-games
   - Collection of implementations with code examples

2. **11 JavaScript Tetris Games** (FreeFrontend)
   - URL: https://freefrontend.com/javascript-tetris-games/
   - Various implementations showcasing different approaches
   - Features: block rotations, line clearing, scoring, level progression

3. **JavaScript Tutorial: Build Tetris**
   - URL: https://www.educative.io/blog/javascript-tutorial-build-tetris
   - Step-by-step modern JavaScript tutorial

## Mobile Sensor Integration

### Key APIs for Adaptive Controls

#### 1. DeviceMotionEvent API
- **Purpose:** Access accelerometer data
- **Use Case:** Detect touch rate, device shake/movement
- **Browser Support:** Wide support (with permissions on iOS 13+)
- **Documentation:** https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent

#### 2. DeviceOrientationEvent API
- **Purpose:** Access gyroscope/orientation data
- **Use Case:** Tilt-based speed control
- **Returns:** Alpha, beta, gamma angles
- **Documentation:** https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent

#### 3. Touch Events API
- **Purpose:** Track touch interactions
- **Use Case:** Measure touch rate for fatigue detection
- **Events:** touchstart, touchmove, touchend
- **Native browser support:** Excellent

### Libraries & Tools

#### 1. **GyroNorm.js**
- **URL:** https://github.com/dorukeker/gyronorm.js
- **Purpose:** Normalize accelerometer/gyroscope data across devices
- **Why Use:** Handles cross-device compatibility issues
- **Features:**
  - Unified API for different devices
  - Consistent values across iOS/Android
  - Simplifies sensor access

#### 2. **Device Motion Demo & Testing**
- **Demo:** https://whatwebcando.today/device-motion.html
- **Purpose:** Test device capabilities in your browser
- **Sensor Demo:** https://sensor-js.xyz/demo.html

### Permission Requirements

**iOS 13+ Requires User Permission:**
```javascript
// Must be called from user gesture (tap/click)
DeviceMotionEvent.requestPermission()
  .then(response => {
    if (response === 'granted') {
      window.addEventListener('devicemotion', handleMotion);
    }
  });
```

**Android:** Generally works without explicit permission (browser-dependent)

### Implementation Examples

**Accelerometer for Gaming:**
- Tutorial: https://www.inkfood.com/mobile-accelerometer-input/
- Demo: http://www.albertosarullo.com/blog/javascript-accelerometer-demo-source
- Use motion data to control game elements

**Gyroscope Integration:**
- Guide: https://www.ux-republic.com/en/use-gyrojs-javascript/
- Orientation-based game controls

## Implementation Strategy for Adaptive Tetris

### Recommended Approach: JavaScript Native

#### Phase 1: Core Game (Week 1-2)
1. Start with **straker's gist** or **shorve6/Tetris** (mobile-ready)
2. Understand game loop, rendering, collision detection
3. Test on mobile and desktop browsers

#### Phase 2: Adaptive Mechanism #1 - Stack Height (Week 3)
- Easiest to implement, no sensors required
- Formula: `speed = baseSpeed * (1 - stackHeight/maxHeight * 0.5)`
- Works on all devices

#### Phase 3: Adaptive Mechanism #2 - Touch Rate Detection (Week 4)
```javascript
let touchTimestamps = [];

function onRotateTouch(event) {
  touchTimestamps.push(Date.now());

  // Keep last 5 seconds of data
  const fiveSecondsAgo = Date.now() - 5000;
  touchTimestamps = touchTimestamps.filter(t => t > fiveSecondsAgo);

  // Calculate touches per second
  const touchRate = touchTimestamps.length / 5;

  // Adjust speed based on fatigue
  if (touchRate < 1.5) { // Slow tapping = tired
    reduceGameSpeed();
  }
}
```

#### Phase 4: Adaptive Mechanism #3 - Tilt Control (Week 5)
```javascript
window.addEventListener('deviceorientation', (event) => {
  const tilt = event.beta; // Front-to-back tilt (0-180)

  // More vertical (closer to 90) = faster
  const tiltFactor = Math.abs(tilt - 90) / 90; // 0 = vertical, 1 = horizontal
  const speedMultiplier = 2 - tiltFactor; // 2x at vertical, 1x at horizontal

  adjustGameSpeed(speedMultiplier);
});
```

#### Phase 5: Adaptive Mechanism #4 - Brake Button (Week 6)
```javascript
let brakePressed = false;
let brakeStartTime = 0;

brakeButton.addEventListener('touchstart', () => {
  brakePressed = true;
  brakeStartTime = Date.now();
});

brakeButton.addEventListener('touchend', () => {
  const brakeDuration = Date.now() - brakeStartTime;
  const speedReduction = Math.min(brakeDuration / 1000, 3); // Max 3 seconds

  applyBrake(speedReduction);
  brakePressed = false;
});
```

#### Phase 6: Polish & Deploy (Week 7)
- UI/UX refinement
- Visual feedback for adaptive mechanisms
- Mobile optimization
- Deploy to GitHub Pages

## Deployment Options (All Free)

### 1. GitHub Pages (Recommended)
- **Cost:** Free
- **Setup:** Enable in repo settings
- **URL:** `https://yourusername.github.io/tetris-fatigue`
- **Best for:** Simple, reliable hosting

### 2. Netlify
- **Cost:** Free tier generous
- **Features:** Continuous deployment, form handling, serverless functions
- **URL:** Custom domain or `yourapp.netlify.app`

### 3. Vercel
- **Cost:** Free for personal projects
- **Features:** Fast CDN, preview deployments
- **URL:** Custom domain or `yourapp.vercel.app`

### 4. CodePen / JSFiddle
- **Cost:** Free
- **Best for:** Quick prototyping and sharing

## File Structure Recommendation

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
└── README.md
```

## Next Steps

1. **Choose base implementation:**
   - Recommendation: Start with straker's gist for simplicity
   - Alternative: shorve6/Tetris for mobile-ready foundation

2. **Set up local development:**
   ```bash
   # Simple HTTP server for testing
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Test on mobile device:**
   - Use browser dev tools device emulation
   - Test on actual mobile device (connect to local server via IP)

4. **Implement stack height adaptation first:**
   - No sensors required
   - Works everywhere
   - Quick win

5. **Add touch rate detection:**
   - Native browser support
   - No special permissions (except iOS sensors)

6. **Integrate tilt control:**
   - Use GyroNorm.js for compatibility
   - Handle iOS permission flow

7. **Polish and deploy:**
   - GitHub Pages for easy deployment
   - Add PWA features for install-ability

## Testing Mobile Sensors

Before full implementation, test sensor capabilities:

```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="testSensors()">Test Sensors</button>
  <div id="output"></div>

  <script>
    async function testSensors() {
      // Request permission (iOS 13+)
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        const permission = await DeviceMotionEvent.requestPermission();
        if (permission !== 'granted') {
          alert('Permission denied');
          return;
        }
      }

      // Listen for orientation
      window.addEventListener('deviceorientation', (e) => {
        document.getElementById('output').innerHTML = `
          Alpha: ${e.alpha?.toFixed(2)}<br>
          Beta: ${e.beta?.toFixed(2)}<br>
          Gamma: ${e.gamma?.toFixed(2)}
        `;
      });
    }
  </script>
</body>
</html>
```

---

**Last Updated:** 2026-01-31
**Technology:** JavaScript (Vanilla)
**Target Platform:** Web (Desktop + Mobile)
