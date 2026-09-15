# ASTHRA Motion Arcade

Five locally rendered arcade games for a laptop and projector. Built with React, Vite, JavaScript, HTML Canvas, plain CSS, and MediaPipe Hand Landmarker. No backend or paid service. Camera frames are processed in this browser; the site does not record or upload them.

## Run

Install Node.js 20.19+ or 22.12+. In this folder:

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite, normally `http://localhost:5173`. Click a card, read the instructions, then choose Mouse or Camera. Camera permission is requested only after clicking Camera Mode. To verify code:

```bash
npm test
npm run build
npm run preview
```

The production files are in `dist/`. Upload that folder to any static HTTPS host. The app uses relative Vite base paths for the local model and WASM assets; for hosting under a subdirectory, set `base` in `vite.config.js` to that subdirectory before building. Webcam access requires localhost or HTTPS. Allow camera permission in the browser. There is no server API.

## Controls

Fruit Slash: hold the mouse button and drag to slice; with camera, swipe an index fingertip. Balloon Pop: hover the mouse or fingertip. Space Defender and Brick Breaker: move horizontally; Space Defender fires automatically. Goalkeeper: move one mouse glove or up to two hand gloves. Menu buttons always work with a mouse or trackpad.

Each timed round is 60 seconds. Fruit Slash awards +10 per fruit, −20 per bomb, and +5 extra on every fruit from the third consecutive slice until a fruit is missed or a bomb is hit. Balloon Pop awards +10 regular, +30 gold, −10 striped hazard. Space Defender awards +10 per enemy. Brick Breaker awards +10 per brick. Goalkeeper awards +10 per save and ends after five goals conceded. Best scores are stored separately per game in this browser's localStorage; settings also stay in localStorage.

## Camera setup

The bundled `public/mediapipe/hand_landmarker.task` and WASM files are loaded locally. In setup, check fingertip tracking, adjust the comfortable horizontal and vertical movement areas, toggle reverse controls, and set sensitivity. The game hides the preview. Tracking loss pauses the round; show a hand and wait for the countdown. Mouse Mode remains available if permission, hardware, or model loading fails. These are air gestures; the site does not sense contact with a projected wall.

## Fest checklist

1. Connect the projector and set it as an extended display.
2. Move the browser window onto the projector display and click Fullscreen.
3. Face the webcam toward the player and provide enough light for their hands.
4. Keep the player clear of the projector beam. Test movement and mirrored direction in setup.
5. Select the intended camera if more than one is available.
6. Play a full test round in both Mouse and Camera Mode on the actual laptop/projector setup.
7. Keep a mouse handy for menus and as a fallback.

## Code map

`src/App.jsx` manages screens, the animation loop, score UI, pause, and results. `src/input.js` maps pointer and landmark coordinates to the fixed 960×540 Canvas space. `src/camera.js` owns webcam and MediaPipe resources. `src/audio.js` makes short sounds after interaction. Each game in `src/games/` owns only its own state, update, and draw functions. `src/utils.js` has collision, scoring, and particle helpers.

## Checks requiring hardware

A real webcam is needed to verify permission prompts, camera switching, fingertip tracking, lighting, disconnection, and two-hand goalkeeper play. A real projector is needed to verify legibility, display placement, fullscreen, beam clearance, and performance at the venue. Automated tests and a build cannot verify those physical conditions.
