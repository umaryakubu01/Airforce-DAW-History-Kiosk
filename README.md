# Department of Air Warfare — History Hall of Fame

Offline Windows landscape touchscreen kiosk, built with HTML, CSS and JavaScript.

## Launch

- On Windows, double-click `run.bat` to launch Microsoft Edge in kiosk mode.
- Double-click `prepare.bat` once to create a desktop shortcut.
- Alternatively, open `index.html` directly in a modern browser. No server or installation required.

## Design

Uses the original supplied History Screen UI v3 design. The navigation numbers remain hidden. The Welcome screen has an explicit full-content video layer below the header, with a navy readability overlay beneath the unchanged heading, introduction, buttons and four statistics. The large decorative year and circles were removed.

`assets/videos/intro.mp4` autoplays, loops, and stays silent (`muted`, `defaultMuted`, and zero volume). It has no controls or pointer interaction. A local poster remains available if loading fails; a rejected play attempt is retried on user interaction. **Watch the introduction** opens the separate film player with user-controlled sound.

Welcome content and era/gallery cards reveal in sequence. Navigation, timeline selection, filters, film cards and dialogs use short fades and restrained feedback. CSS animations respect `prefers-reduced-motion`; the explicitly requested silent background video continues playing. Dialogs trap keyboard focus and restore it on close. The fixed, scaled canvas prevents focus changes from scrolling the screen out of position.

## Content and media

The original ten departmental milestones follow `BRIEF_ON_THE_HISTORY_OF_THE_DEPARTMENT.docx`, including exact dates. Supplied photographs appear on the original ten departmental timeline entries, and six Archives cards with enlarged photo views. Contextual captions distinguish general campus, training and education images from the specific milestones; repeated campus photographs do not identify the named buildings. Archives displays actual archival photographs with matching titles and category filters. Seven locally supplied videos are bundled. The supplied archives are available locally under `college/` and `photos/`. Image assignments and captions are maintained in `js/data.js` (`DAW_PHOTOS`, `DAW_ERA_PHOTOS`, and milestone `photo` keys). Images work offline, preserve their full frame, and revert to placeholders if unavailable.

## Technical notes

Fixed reference canvas 1920 × 1080, scaled to fit a landscape display. All scripts, styles, video and images are local. No `fetch`, external fonts, ES modules, database or build step.

## QA

Browser verification was performed in local headless Google Chrome on macOS, with the browser context offline, at 1920 × 1080 and 1280 × 720. Checks covered:

- Silent Welcome autoplay, an observed loop boundary, mute enforcement, and independent film audio controls.
- Unchanged Welcome copy/statistics, content bounds and screenshot inspection against the existing screen baseline.
- Navigation across all five sections; timeline images, previous/next and category/era filters; overview milestone keyboard activation.
- All seven local videos decoding; film pause/resume, seeking, closing and focus restoration.
- Gallery filtering (including rapid changes), keyboard enlargement, dialog focus containment and closing.
- Reduced-motion animation suppression, touch-emulated controls, and smaller-screen alignment after closing a dialog.
- Simulated rejected `play()` retry and an invalid-video fallback with usable navigation.
- No JavaScript errors, failed local requests or external requests during the normal regression run.

All seven bundled video assets were compatible with the tested Chrome browser. No missing video assets were found. A brief local animation-frame sample measured 122 frames over approximately two seconds (maximum gap 17 ms); this is not a target-device performance benchmark.

Not performed: physical Windows/Edge touchscreen testing, `run.bat`/`prepare.bat` validation, long-duration kiosk soak testing, or hardware audio-output measurement. No separate approved screenshot was attached to the enhancement task; visual preservation was checked against the existing project before edits. Validate the launcher, sustained video playback, font availability and performance on the actual kiosk.

## Nigerian Air Force eras and timeline

`eras.html` now presents the six NAF eras from the supplied **NIGERIAN AIR FORCE HISTORY — REFERENCE CONTEXT** in a three-column, two-row layout. Each card opens `eras.html?era=<id>` with the source introduction and chronological events. **View Timeline** opens `timeline.html?era=<id>` with that era selected. Era/category selections and selected events are retained in the URL.

`js/history-data.js` contains 116 NAF events and seven separate departmental entries. `js/history.js` renders the era grid, details, filtered timeline and departmental view; `css/history.css` scopes their styles. The main navigation, Welcome video, Films and Archives remain intact.

Departmental history is available at `timeline.html?section=department`. The earlier departmental brief remains available through `overview.html` and `timeline-no-photo.html`; legacy `timeline.html?m=…` bookmarks forward to that original view.

Run `node tests/history-data.test.cjs` for dataset validation. See [HISTORY-REVIEW.md](HISTORY-REVIEW.md) for source provenance, unresolved historical inconsistencies, image limitations and verification results.
