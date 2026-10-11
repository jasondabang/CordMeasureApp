# Simple Cord Length Calculator — Android App Project

**Brand:** Developed by จาตูไหม่  
**Application ID:** `com.jatumae.cordlength`

This package contains the latest calculator web app bundled as local assets for a native Android shell using Capacitor. The calculator's existing interface and features are included, including customizable Quick Slack Presets.

## Build an installable Android APK

You need a computer with Node.js (LTS), Android Studio, and an Android SDK installed. This source package does not include a compiled APK because the Android build toolchain is not installed in the packaging environment.

1. Extract this ZIP.
2. Open a terminal in the extracted `cord-mobile-app` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Generate the Android native project:

   ```bash
   npx cap add android
   ```

   If Capacitor says the Android platform already exists, continue to the next step.

5. Sync the bundled app into Android:

   ```bash
   npx cap sync android
   ```

6. Open Android Studio:

   ```bash
   npx cap open android
   ```

7. In Android Studio, wait for Gradle sync. To make a test build, choose **Build > Build Bundle(s) / APK(s) > Build APK(s)**. Android Studio will show the output location when complete.

For a signed release APK, choose **Build > Generate Signed Bundle / APK** and follow Android Studio's signing wizard. Keep the signing key private and backed up.

## Test on a phone

Enable Developer options and USB debugging on your Android device, connect it to the computer, then use Android Studio's Run button. Alternatively, transfer the generated APK to your phone and install it, allowing installs from that source when Android asks.

## Data and offline behavior

The calculator is bundled inside the app, so its interface does not need a hosted website to open. User history and preferences are stored locally by the app's WebView origin and are separate from browser-site storage. Uninstalling the app or clearing its app data may remove those local records. Export or back up important records before doing either.

## Project contents

- `www/index.html` — calculator interface and logic
- `www/manifest.json` — web app metadata
- `www/service-worker.js` — offline shell cache logic
- `capacitor.config.json` — native app ID and display name
- `package.json` — Capacitor dependencies and commands


## Import history from CSV

Open History and tap **Import CSV**, then select a `.csv` file exported from the calculator. Confirm **OK** to replace current history, or **Cancel** to append the imported entries to existing history. The import validates required measurement columns and keeps data in this browser/app's local storage. Export a backup before replacing existing history.


## Layout update
- Hid the Length Left on Reel, Total Cord Available, and Visual Segment Breakdown dashboard cards as requested. Their DOM elements remain hidden to preserve existing calculator logic.
- Renamed the remaining-reel label to “1. Starting Reel”.


## Update v11
- English and simple Myanmar language selector (Thai removed).
- Hides total/available length dashboard cards.
- Adds Previous Cut to load the latest saved cut values.
- Keeps Reset at 25% width and Next Cut at 75% width.
- CSV export includes all saved history records; automatic-save toast removed.
- Service-worker cache bumped to v11.

History is stored locally in this browser/app installation and works offline after the app shell has been cached. Export CSV regularly for backup or import it on another device. Automatic write-back to GitHub is not included: that requires a secure authenticated backend or GitHub integration and should not expose a personal access token inside the app. Some original libraries are loaded from CDNs, so first launch may need internet; for truly self-contained offline styling, those libraries should be bundled locally.

## v12 field UI fixes
- Replaced the Next Cut action with Previous Cut in the 75% right-side action slot; Reset remains 25% on the left.
- Added a Meter Check readout immediately below Cut Result Length.
- Increased measurement input and result sizes and improved daylight contrast.
- Expanded everyday Myanmar translations for cutting parameters and results.
- Updated developer credit to ตูไหม่.
