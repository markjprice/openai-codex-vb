# Release checklist

Complete every check before each release, including updates. Work through it
on the production build, not the beta or Expo Go.

Version: __________ Build number: __________ Date: __________

## Code and tests

- [ ] Every change is committed, and the working tree is clean
- [ ] `npm test` passes
- [ ] The version in app.json is higher than the last release (1.0.1 for
      fixes, 1.1.0 for new features, 2.0.0 for major changes)
- [ ] The build number is higher than any build sent to either store
- [ ] No testing options are reachable: the one-move-from-solved board, the
      one-minute reminder, and the component gallery

## Acceptance criteria

- [ ] Every acceptance criterion in PRODUCT-BRIEF.md passes on the
      production build (use device-test-matrix.md)
- [ ] Tested on at least one iPhone and one Android phone

## Privacy

- [ ] The list of packages hasn't changed since the last privacy check, or
      every new package has been checked for sending data off the phone
- [ ] The app requests no permission except notifications
- [ ] What the app stores matches STORAGE.md
- [ ] The privacy page, STORAGE.md, and both stores' privacy answers all say
      the same thing

## Website

- [ ] The support and privacy URLs open the right pages, at https://
- [ ] The website describes the game as it is in this version (screenshots,
      How to Play, FAQ)
- [ ] Store badges appear only for stores where the game is available
- [ ] The website's contact form works (send a test message)

## Store listings

- [ ] STORE-LISTING.md is up to date, and matches what's entered in each
      store
- [ ] Screenshots show this version
- [ ] Release notes describe what changed

## Submitting

- [ ] Production builds created with EAS for Android and iOS
- [ ] I've confirmed each submission myself (Codex prepared it, I submitted it)
- [ ] Google Play: closed test requirement met (new personal accounts only:
      at least 12 testers, opted in for at least 14 days)
- [ ] For an update: start with a staged rollout to a small share of players

## After release

- [ ] Tag the release in Git, such as v1.0.0
- [ ] Watch the support inbox and store reviews for the first few days
- [ ] Turn repeated questions into FAQ entries, and problems into bug reports
- [ ] If an update causes problems: halt the rollout, return to the last good
      commit, fix, and submit a new build with a higher build number
