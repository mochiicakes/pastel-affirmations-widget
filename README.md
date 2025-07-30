#💫 Daily Affirmations Widget

##📝 Description
The Daily Affirmations Widget is a small Electron-based desktop application that fetches affirmations from a public API and displays them in a cute, pixel-styled interface. It supports:

- Daily randomized affirmations
- 'Refresh' button for new affirmations
- 'Favorite' toggle for affirmations you love
- Always-on-top transparent widget
- Custom icon and pixel-art design
  
##⚙️ Tech Stack
Frontend: React.js (CRA)
Backend: Node.js + Express
Desktop Shell: Electron
Styling: CSS + Pixel Assets
Packaging: Electron Builder

##🔌 API Used
https://www.affirmations.dev – Provides randomized affirmations in JSON format.

##🛠️ Utilities & Features
- electron-builder: For packaging into .exe files
- concurrently: Runs both frontend and backend during development
- dotenv: Environment variable management
- Pixel Art Assets: Custom UI with light purple sparkles and themed buttons/icons

##📦 Dependencies
electron: ^37.2.4
electron-builder: ^26.0.12
concurrently: ^8.2.2
express: ^latest (in backend)
react: CRA (frontend)
axios: ^latest
cors: ^latest

##🚀 How to Run Locally
1. Clone the repository
   git clone https://github.com/yourusername/daily-affirmations-widget.git
   cd daily-affirmations-widget

2. Install dependencies
   npm install

3. Start development mode
   npm run dev
   This will concurrently run:
   - Backend on localhost:5000
   - Frontend on localhost:3000
   - Electron shell on top

4. Build the widget as a desktop app
   npm run build
   The .exe file will be generated inside the dist/ folder (not committed to Git).

##💻 How to Use the Executable
1. Double-click the .exe file from the dist/ folder to launch the widget.
2. It will:
   - Stay always on top.
   - Be draggable and resizable (if allowed).
   - Display a random affirmation.
   - Let you refresh or favorite affirmations.
   - 
##📁 Folder Structure (Simplified)
frontend/          # React UI
  ├── src/
  └── public/
backend/           # Node.js + Express API proxy
  └── server.js
electron/          # Main Electron process
  └── main.js
assets/            # Icon and pixel art assets
  └── icon.ico
package.json       # Root config for build & scripts
dist/              # Auto-generated build output (gitignored)

##📌 Author
Made with 💜 by Michaella O. Gonzales
Pixel art, design, and coding by @mochiicakes

##📜 License
ISC License
