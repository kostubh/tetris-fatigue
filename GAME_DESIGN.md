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
- **Primary:** Mobile (touch and accelerometer support)
- **Secondary:** Web-based deployment via Streamlit
- **Language:** Python

### Key Features Needed
1. Touch/tap event tracking and rate calculation
2. Accelerometer/gyroscope access (for mobile)
3. Game state management (score, speed, stack height)
4. Real-time speed adjustment engine
5. Responsive UI for mobile and web

## Deployment Strategy

### Streamlit Hosting (Free)
- Use Streamlit Community Cloud for free hosting
- Limitations to consider:
  - Streamlit is primarily for data apps/dashboards
  - Limited mobile sensor access in browser
  - May need fallback controls for web version

### Mobile-Web Hybrid Approach
- Desktop/Web: Use keyboard/mouse with brake button or manual speed control
- Mobile Browser: Attempt to use touch events, limited accelerometer via browser APIs
- Native Mobile (future): Full sensor access via mobile framework

## Implementation Phases

### Phase 1: Core Game
- Basic Tetris mechanics
- Standard block types and rotation
- Collision detection and line clearing
- Score tracking

### Phase 2: Adaptive Mechanism (Choose One)
Start with easiest to implement:
- Stack height speed compensation (no sensor requirements)
- Touch rate detection (works in web browsers)

### Phase 3: Advanced Controls
- Brake button system
- Tilt controls (if mobile framework used)

### Phase 4: Polish & Deployment
- UI/UX refinement
- Streamlit deployment
- Mobile optimization

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

1. Research existing Python Tetris implementations
2. Evaluate Streamlit's capabilities for game development
3. Choose initial adaptive mechanism
4. Create minimal viable prototype
5. Test and iterate on speed adjustment algorithms

---

**Project Status:** Concept/Design Phase
**Last Updated:** 2026-01-30
