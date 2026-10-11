# Build an installable Android APK using your phone

This repository uses GitHub Actions to build a debug APK in the cloud. No computer or Android Studio is required, but the files must be uploaded to a GitHub repository.

## Repository setup

Upload the *contents* of this `cord-mobile-app` folder to the root of your GitHub repository. The repository root must contain:

- `package.json`
- `capacitor.config.json`
- `www/`
- `.github/workflows/build-apk.yml`

The `.github` folder is required for the automated build. Commit the files to `main` or `master`.

## Run the build

1. Open your repository on GitHub.
2. Tap **Actions**.
3. Choose **Build Android APK**.
4. If no build starts automatically, tap **Run workflow** and choose the `main` branch.
5. Wait for the run to finish. Open the successful run and find **Artifacts**.
6. Download `simple-cord-length-calculator-debug-apk` and extract it. The archive contains `app-debug.apk`.
7. Tap `app-debug.apk` on your Android phone to install it. If Android asks, allow your file manager or browser to install unknown apps for this installation.

This workflow builds a debug APK for personal installation/testing, not a Play Store release. Install only APKs you built yourself or trust.


## UI update v2
- English-only language menu.
- Removed visible total-cord, remaining-cord and visual breakdown panels.
- Removed the Auto-saved button label; saving behavior remains handled by the existing app logic.
- Reset button is 25% wide on the left and Next Cut is 75% wide on the right.
- Brighter, higher-contrast daylight styling and prominent cutting mark/result boxes.
