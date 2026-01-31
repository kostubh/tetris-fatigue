# Adaptive Tetris - Game Design Document

## Overview
An innovative Tetris-like game where the speed of incoming blocks adapts based on player behavior or input, creating a more personalized and fatigue-aware gaming experience.

## Core Concept
Traditional Tetris progressively increases difficulty, which can lead to player fatigue and frustration. This adaptive version adjusts block speed dynamically to keep players engaged longer while maintaining challenge.

## Adaptive Speed Control Mechanisms

### 1. Touch Rate Detection (Fatigue Sensing)
**Mechanism:** Monitor the rate of touches per second when the player changes block orientation.

**Logic:**
- Track touch/tap frequency during block rotation actions
- Lower touch rate = player fatigue detected
- System responds by reducing incoming block speed
- Allows players to continue playing at a comfortable pace

**Benefits:**
- Prevents player disappointment from sudden game-over
- Extends play sessions naturally
- Adaptive difficulty without manual settings

**Implementation Considerations:**
- Calculate rolling average of touch rate over last N seconds
- Define thresholds for speed adjustments
- Smooth speed transitions to avoid jarring changes

### 2. Phone Tilt Control
**Mechanism:** Use device accelerometer to control game speed via phone orientation.

**Logic:**
- More vertical phone = higher block speed (increased challenge)
- More horizontal phone = slower block speed (relaxed play)
- Real-time speed adjustment based on tilt angle

**Benefits:**
- Physical engagement with the game
- Intuitive control metaphor
- Player has direct control over difficulty

**Implementation Considerations:**
- Map tilt angle (0-90 degrees) to speed range
- Add deadzone to prevent micro-adjustments
- Consider landscape vs portrait orientation

### 3. Stack Height Speed Compensation
**Mechanism:** Speed increases over time but decreases proportionally to stack height.

**Logic:**
- Base speed continuously increases (traditional Tetris progression)
- Higher stack = slower block speed (compensation mechanism)
- Balances natural difficulty increase with player struggle

**Benefits:**
- Maintains progression feeling
- Reduces frustration when close to game-over
- Self-balancing difficulty

**Implementation Considerations:**
- Formula: `effective_speed = base_speed * (1 - stack_height_ratio * compensation_factor)`
- Tune compensation_factor for proper balance
- Prevent speed from becoming too slow

### 4. Brake Button
**Mechanism:** Dedicated brake control outside the playable area.

**Logic:**
- Speed continuously increases (traditional progression)
- Brake button press reduces speed
- Speed reduction proportional to hold duration
- Strategic resource management element

**Benefits:**
- Player agency in managing difficulty
- Strategic decision-making (when to brake)
- Adds new skill dimension to gameplay

**Implementation Considerations:**
- Brake cooldown or energy system to prevent abuse
- Visual feedback for brake availability/usage
- Balance brake power vs speed increase rate

## Technical Requirements

### Platform
- **Primary:** Web (Desktop + Mobile browsers)
- **Language:** JavaScript (Vanilla - no frameworks required)
- **Rendering:** HTML5 Canvas
- **Styling:** CSS3

### Key Features Needed
1. Touch/tap event tracking and rate calculation (Touch Events API)
2. Accelerometer/gyroscope access (DeviceMotionEvent / DeviceOrientationEvent APIs)
3. Game state management (score, speed, stack height)
4. Real-time speed adjustment engine
5. Responsive UI for mobile and web
6. iOS permission handling for sensor access

### Browser APIs Used
- **Touch Events API:** Track user touch interactions for fatigue detection
- **DeviceOrientationEvent:** Access gyroscope for tilt-based controls
- **DeviceMotionEvent:** Access accelerometer for motion detection
- **requestAnimationFrame:** Smooth game loop and rendering
- **Canvas API:** Game rendering

### Optional Libraries
- **GyroNorm.js:** Normalize sensor data across devices (recommended for production)
- None required for basic implementation

## Deployment Strategy

### Free Hosting Options

#### GitHub Pages (Recommended)
- **Cost:** Free
- **Setup Time:** 5 minutes
- **Custom Domain:** Supported
- **HTTPS:** Automatic
- **Best for:** Simple, reliable hosting with version control integration
- **URL Format:** `https://yourusername.github.io/tetris-fatigue`

#### Netlify
- **Cost:** Free tier
- **Features:** Continuous deployment, form handling, analytics
- **Best for:** Projects needing extra features like serverless functions

#### Vercel
- **Cost:** Free for personal projects
- **Features:** Fast CDN, preview deployments, analytics
- **Best for:** Projects prioritizing performance and deployment speed

### Progressive Web App (PWA)
- Add manifest.json for install-ability on mobile devices
- Service worker for offline play
- Home screen icon support
- Native app-like experience without app store

## Implementation Phases

### Phase 1: Core Game (Week 1-2)
- Fork/adapt existing JavaScript Tetris (recommended: straker's gist or shorve6/Tetris)
- Understand game loop, collision detection, line clearing
- Test on both desktop and mobile browsers
- Ensure responsive canvas sizing

### Phase 2: Stack Height Adaptation (Week 3)
- Implement speed calculation based on stack height
- Formula: `speed = baseSpeed * (1 - stackHeight/maxHeight * compensationFactor)`
- Add visual feedback for speed changes
- Works on all devices, no sensors required

### Phase 3: Touch Rate Detection (Week 4)
- Track touch timestamps on rotation button
- Calculate rolling average (e.g., last 5 seconds)
- Adjust speed when touch rate drops below threshold
- Test fatigue detection thresholds

### Phase 4: Tilt Control (Week 5)
- Implement DeviceOrientationEvent listener
- Handle iOS permission request flow
- Map tilt angle to speed multiplier
- Add deadzone to prevent jitter
- Test on actual mobile devices

### Phase 5: Brake Button (Week 6)
- Add brake button UI element outside play area
- Track brake duration on touch hold
- Apply speed reduction based on hold time
- Optional: Add cooldown/energy system
- Visual feedback for brake state

### Phase 6: Polish & Deploy (Week 7)
- UI/UX refinement (visual feedback for all adaptive mechanisms)
- Mobile optimization (touch targets, responsive layout)
- Add PWA features (manifest, service worker)
- Deploy to GitHub Pages
- Optional: Analytics to track which mechanisms players use most

## Design Decisions to Make

1. **Which adaptive mechanism to implement first?**
   - Recommendation: Stack height compensation (easiest, works everywhere)

2. **Single mechanism or combination?**
   - Consider combining multiple mechanisms
   - Example: Stack height + brake button for layered strategy

3. **Mobile-first or web-first?**
   - Recommendation: Web-first for rapid prototyping
   - Mobile features as progressive enhancement

4. **Visual style?**
   - Classic Tetris aesthetics
   - Modern minimal design
   - Fatigue theme (relaxing colors, smooth animations)

## Success Metrics

- Average play session duration
- Player retention across sessions
- Speed adjustment frequency and patterns
- Player feedback on fatigue reduction

## Next Steps

1. ✅ Research existing JavaScript Tetris implementations (see EXISTING_IMPLEMENTATIONS.md)
2. Choose base implementation (recommended: straker's gist for simplicity)
3. Set up local development environment (simple HTTP server)
4. Fork/clone chosen repository
5. Implement stack height adaptation first (quick win)
6. Test on mobile device to verify sensor access
7. Iterate through remaining adaptive mechanisms
8. Deploy to GitHub Pages

## Development Setup

```bash
# Clone this repository
git clone https://github.com/yourusername/tetris-fatigue.git
cd tetris-fatigue

# Start local server for testing
python -m http.server 8000
# or
npx serve .

# Open in browser
# Desktop: http://localhost:8000
# Mobile: http://YOUR_IP:8000 (find IP with `ipconfig` or `ifconfig`)
```

## Testing Checklist

- [ ] Desktop Chrome/Firefox/Safari
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS) - includes sensor permission flow
- [ ] Tablet devices
- [ ] Touch event responsiveness
- [ ] Sensor data accuracy
- [ ] Speed adjustment smoothness
- [ ] Performance at various speeds

---

**Project Status:** Concept/Design Phase → Ready for Implementation
**Technology:** JavaScript (Vanilla)
**Last Updated:** 2026-01-31
