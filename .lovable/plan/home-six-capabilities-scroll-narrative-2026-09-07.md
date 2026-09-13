# Homepage "Six capabilities. One outcome." scroll narrative

## Goal

Replace the six text cards with the 01–06 scene images you supplied, and have the
six capability steps advance horizontally as the page scrolls — telling one
continuous story from choosing a robot to running a fleet at scale.

## How it should behave

- Keep the section heading "Six capabilities. One outcome."; the horizontal
  narrative begins beneath it.
- On desktop, once the section is reached the content area holds in place;
  scrolling further drives the six images past from right to left, one at a time.
- The current image reads clearly and in full, with a slight hint of the ones
  either side so it is obvious there is more to come.
- Each transition uses restrained movement and a fade; after the sixth image the
  page releases naturally and carries on into the booking block at the bottom.
- Add an 01–06 progress indicator that tracks the scroll.
- On mobile, switch to ordinary vertical reading or a controlled horizontal
  swipe — no scroll-locking, which is awkward to operate. Images keep their full
  aspect ratio so no text is cropped.
- Honour the reduced-motion system setting: disable the scroll-bound animation
  and present the images vertically.

## Content and image mapping

1. Robot Selection — Find the right robot
2. Deployment & Localisation — Deploy it into your operation
3. Systems Integration — Connect robots to your workflow
4. Operational Training — Teach robots how your operation works
5. Fleet Intelligence — Make the fleet intelligent
6. Operational Scale — Scale across your operation

The six uploaded images are used in that order. They already carry English
headings and captions, so every language version shares the English artwork; no
duplicate body copy is overlaid on top.

## Scope of work

- Bring the six images into the project's assets and optimise them as
  high-quality WebP for the web.
- Build the capability scroll display as its own component; the homepage only
  places it, so the homepage file does not keep growing.
- Drive the horizontal movement from native browser scroll progress — no
  heavyweight animation dependency.
- Give the images a stable aspect ratio and reserved dimensions. The first one
  loads eagerly as it nears the viewport, the rest are deferred — sharp where it
  matters, smooth everywhere else.
- Update the capability heading keys across all five languages (EN, FR, DE, IT,
  ES) so the no-animation and assistive text match the new content; the artwork
  itself stays English.

## Verification

- Desktop: check the scroll, hold and release from 01 through 06, and that the
  progress indicator stays in sync.
- Mobile: no horizontal overflow, no cropped text, navigation stays smooth.
- All five language pages keep their structure; buttons and the content below are
  unaffected.
- Check reduced-motion mode, keyboard navigation, image alt text and load
  performance.
- Confirm the homepage throws no runtime errors and the build passes.
