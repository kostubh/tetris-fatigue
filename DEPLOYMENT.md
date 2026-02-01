# Deployment Guide - Tetris Fatigue

This guide explains how to deploy your Tetris game so you can play it on your phone or share it with others.

## Option 1: GitHub Pages (Recommended - Free & Permanent)

GitHub Pages provides free hosting for static websites directly from your GitHub repository.

### Steps:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git push origin claude/adaptive-tetris-design-noExe
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/kostubh/tetris-fatigue`
   - Click on **Settings** (gear icon in the top menu)
   - Scroll down to **Pages** section in the left sidebar
   - Under **Source**, select:
     - Branch: `claude/adaptive-tetris-design-noExe`
     - Folder: `/ (root)`
   - Click **Save**

3. **Wait for deployment** (usually takes 1-2 minutes)
   - GitHub will show you the URL where your game is hosted
   - It will be something like: `https://kostubh.github.io/tetris-fatigue/`

4. **Access on your phone**:
   - Open the URL on your mobile browser
   - The touch gestures will work automatically!

### Troubleshooting GitHub Pages:
- If the branch isn't showing up, make sure you've pushed it to GitHub
- Clear your browser cache if you see old content
- Check the Actions tab for build status

---

## Option 2: Netlify Drop (Easiest - Instant)

Perfect for quick testing without Git configuration.

### Steps:

1. **Go to Netlify Drop**: https://app.netlify.com/drop

2. **Prepare your files**:
   ```bash
   cd /home/user/tetris-fatigue
   zip -r tetris-fatigue.zip index.html css/ js/ -x "*.git*"
   ```

3. **Drag and drop** the zip file (or the folder) into Netlify Drop

4. **Get instant URL**:
   - Netlify will give you a URL like: `https://random-name-123456.netlify.app`
   - Share this URL or open it on your phone!

5. **Optional - Custom domain**:
   - Sign in to Netlify (free)
   - Change the site name to something memorable

---

## Option 3: Vercel (Fast & Easy)

Similar to Netlify, great for quick deployments.

### Steps:

1. **Install Vercel CLI** (if you have Node.js):
   ```bash
   npx vercel
   ```

2. **Or use Vercel Web**:
   - Go to: https://vercel.com/new
   - Import your GitHub repository
   - Select the branch: `claude/adaptive-tetris-design-noExe`
   - Click Deploy

3. **Get URL**:
   - Vercel provides a URL like: `https://tetris-fatigue.vercel.app`

---

## Option 4: Local Network (Testing on Phone - Same WiFi)

If you just want to test on your phone while developing:

### Steps:

1. **Find your computer's IP address**:
   ```bash
   # On Linux/Mac:
   ip addr show | grep "inet " | grep -v 127.0.0.1
   # or
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Start local server**:
   ```bash
   cd /home/user/tetris-fatigue
   python3 -m http.server 8000
   ```

3. **Access from phone**:
   - Make sure phone is on the same WiFi network
   - Open browser on phone
   - Go to: `http://YOUR_IP_ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`

4. **Test touch gestures**:
   - Swipe left/right to move pieces
   - Tap to rotate
   - Swipe down/up to drop
   - Hold brake button to slow down!

**Note**: This only works while your computer is running and on the same network.

---

## Option 5: CodePen (Quick Share)

Perfect for sharing and quick demos.

### Steps:

1. **Go to CodePen**: https://codepen.io/pen/

2. **Copy your code**:
   - HTML: Copy contents of `index.html` (just the body content)
   - CSS: Copy contents of `css/styles.css`
   - JS: Copy contents of `js/game.js`

3. **Paste into CodePen**:
   - Paste HTML in HTML panel
   - Paste CSS in CSS panel
   - Paste JavaScript in JS panel

4. **Save and share**:
   - Click "Save" to create a permanent URL
   - Share the URL with anyone!

**Note**: You'll need to adjust the HTML slightly (remove `<link>` and `<script>` tags since CodePen handles them).

---

## Recommended Approach

**For permanent deployment**: Use **GitHub Pages** (Option 1)
- Free forever
- Custom domain support
- Automatic updates when you push code
- Professional URL

**For quick testing**: Use **Local Network** (Option 4)
- Instant testing on phone
- No deployment needed
- Great for development

**For sharing immediately**: Use **Netlify Drop** (Option 2)
- No account needed
- Instant deployment
- Easy URL to share

---

## Mobile Testing Tips

Once deployed, test these features on your phone:

### Touch Gestures:
- ✅ Tap canvas to rotate piece
- ✅ Swipe left/right to move
- ✅ Swipe down for soft drop
- ✅ Swipe up for hard drop

### Brake Button:
- ✅ Press and hold brake button
- ✅ Watch brake meter fill
- ✅ Speed should slow down
- ✅ Release to apply cooldown

### Display:
- ✅ Game should fit screen
- ✅ Score/level visible
- ✅ Brake controls accessible
- ✅ No horizontal scrolling

### Performance:
- ✅ Smooth animations
- ✅ Responsive touch input
- ✅ No lag during gameplay

---

## Troubleshooting

**Touch gestures not working?**
- Make sure you're tapping/swiping on the black game canvas
- Check browser console for errors (on desktop)
- Try refreshing the page

**Game not loading?**
- Check if all files are uploaded (index.html, css/, js/)
- Verify file paths are correct
- Check browser console for 404 errors

**Brake button not responding?**
- Make sure game has started
- Check cooldown hasn't expired
- Try pressing directly on the button

**Screen too small on mobile?**
- Rotate to portrait mode
- Zoom out slightly
- Check responsive CSS is loading

---

## Next Steps

After deployment:
1. Test on multiple devices (iOS, Android)
2. Share the URL with friends
3. Gather feedback on touch controls
4. Consider adding more adaptive mechanisms
5. Add analytics to track player behavior

Enjoy your mobile Tetris game! 🎮📱
