# Quick Start Guide

## Running the Game Locally

1. **Open a terminal in the project directory:**
```bash
cd /home/user/tetris-fatigue
```

2. **Start a local HTTP server:**

Using Python:
```bash
python -m http.server 8000
```

Or using Python 3:
```bash
python3 -m http.server 8000
```

Or using Node.js (if you have npx):
```bash
npx serve .
```

3. **Open your browser and visit:**
- Desktop: http://localhost:8000
- Mobile (on same network): http://YOUR_IP_ADDRESS:8000

## Game Controls

### Keyboard
- **← →** - Move piece left/right
- **↓** - Soft drop (move down faster)
- **↑** - Rotate piece
- **Space** - Hard drop (instant drop)

### Brake Button
- **Click and Hold** - Press and hold the red BRAKE button on the right to slow down the falling speed
- The longer you hold, the stronger the brake effect (up to 3 seconds)
- After releasing, there's a 2-second cooldown before you can brake again
- Use strategically when the speed gets too fast!

## Game Features

### Adaptive Speed System
- **Base Speed:** Starts at 1.0x
- **Automatic Increase:** Speed increases by 5% every 5 seconds
- **Level Progression:** Speed also increases when you complete 10 lines (level up)
- **Brake Control:** Hold the brake button to reduce speed by up to 50% while pressed

### Scoring
- **Lines Cleared:** 100 points × level per line
- **Hard Drop:** 2 points per row dropped
- **Level Up:** Every 10 lines cleared

## How the Brake Works

1. **Press and Hold:** Click/tap and hold the BRAKE button
2. **Power Builds:** The brake power meter fills up over 3 seconds
3. **Speed Reduces:** While holding, the game speed slows down (up to 50% reduction)
4. **Release:** Let go when you've caught up
5. **Cooldown:** Wait 2 seconds before you can brake again

### Strategic Tips
- Save your brake for when the speed gets overwhelming
- Don't waste brake on low speeds
- Use it when you need time to think or organize pieces
- The meter shows how much brake power you're applying
- Watch the cooldown timer to plan your next brake

## Browser Requirements

Works best in modern browsers:
- Chrome/Edge (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & iOS)

## Troubleshooting

**Game not loading?**
- Make sure you're using an HTTP server (not opening file:// directly)
- Check browser console for errors (F12)

**Brake button not working?**
- Ensure the game has started
- Check that cooldown has expired
- Try clicking/tapping directly on the button

**Speed too fast?**
- Use the brake button!
- The game is designed to get progressively harder
- Try to clear lines quickly to maintain a manageable speed

## Files Structure

```
/home/user/tetris-fatigue/
├── index.html          # Main game page
├── css/
│   └── styles.css      # Game styling
├── js/
│   └── game.js         # Game logic and brake functionality
└── QUICKSTART.md       # This file
```

## Next Steps

Want to modify the game?
- Edit brake duration: Change `MAX_BRAKE_DURATION` in game.js (line 30)
- Edit brake cooldown: Change `BRAKE_COOLDOWN` in game.js (line 31)
- Edit speed increase rate: Change the interval in `startSpeedIncrease()` (line 279)
- Edit colors: Modify `COLORS` array in game.js (line 13)

Enjoy playing!
