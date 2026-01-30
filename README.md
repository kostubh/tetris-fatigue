# Tetris Fatigue - Adaptive Speed Tetris

An innovative Tetris-like game where block speed adapts to player behavior, creating a more personalized and fatigue-aware gaming experience.

## Project Status
🎯 **Current Phase:** Concept & Design

## Concept

Traditional Tetris increases in difficulty until the player fails. This project explores adaptive difficulty mechanisms that adjust block speed based on player behavior or input, allowing for longer, more enjoyable play sessions.

## Adaptive Speed Mechanisms

The game will explore one or more of these innovative control schemes:

1. **Touch Rate Detection** - Slower tapping when rotating blocks = player fatigue → reduce speed
2. **Phone Tilt Control** - More vertical device = faster blocks (player choice)
3. **Stack Height Compensation** - Speed increases but compensates when stack grows tall
4. **Brake Button** - Strategic speed reduction via dedicated control

See [GAME_DESIGN.md](GAME_DESIGN.md) for detailed design documentation.

## Technology Stack

- **Language:** Python
- **Game Engine:** Pygame (primary development)
- **Deployment Target:** Web-based (Streamlit or Pygame Web)
- **Platform:** Mobile-first design, web-compatible

## Resources

- **[GAME_DESIGN.md](GAME_DESIGN.md)** - Comprehensive game design document
- **[EXISTING_IMPLEMENTATIONS.md](EXISTING_IMPLEMENTATIONS.md)** - Research on existing Python Tetris implementations and Streamlit compatibility

## Getting Started

### Prerequisites
```bash
# Python 3.8+
pip install pygame
```

### Development Plan

1. **Select Base Implementation** - Choose from researched Pygame Tetris repos
2. **Implement Core Adaptive Logic** - Start with stack height compensation (simplest)
3. **Add Advanced Controls** - Touch rate detection, brake button
4. **Mobile Features** - Tilt controls (if framework supports)
5. **Deploy** - Web version via Streamlit or Pygame Web

## Deployment Options

### Option 1: Pygame Web (Recommended)
- Build with Pygame
- Compile to WebAssembly with pygbag
- Host on GitHub Pages or similar

### Option 2: Streamlit
- Simplified version for Streamlit Community Cloud
- Focus on turn-based adaptive mechanics
- Free hosting available

See [EXISTING_IMPLEMENTATIONS.md](EXISTING_IMPLEMENTATIONS.md) for detailed deployment strategies.

## Recommended Starting Repositories

Based on research, these are excellent starting points:

1. **educ8s/Python-Tetris-Game-Pygame** - Educational, well-documented
2. **rajatdiptabiswas/tetris-pygame** - Clean implementation
3. **yanyongyu/python-tetris** - Includes AI features

Full list and analysis in [EXISTING_IMPLEMENTATIONS.md](EXISTING_IMPLEMENTATIONS.md).

## Contributing

This is currently a design-phase project. Contributions and feedback on the adaptive mechanisms are welcome!

## License

TBD

## Contact

Project maintained as part of game design exploration.

---

**"Let players play longer, not harder"**
