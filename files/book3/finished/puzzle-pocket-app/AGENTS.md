# Working agreements for this project

- Read PRODUCT-BRIEF.md and STORAGE.md before starting any task.
- I'm new to programming. Explain changes in plain language.
- This is a mobile game built with Expo and React Native, for iPhone and Android.
- Ask before adding any package. Install Expo packages with npx expo install, so their versions match the project's Expo SDK, and run npx expo install --check afterward.
- Never add analytics, advertising, accounts, crash reporting, or any service that sends data off the phone.
- Don't request any permission except notifications, and request that only from the Daily reminder setting.
- Files in shared must not import anything from React, React Native, Expo, or the browser.
- Use only values from the theme (src/theme/theme.ts), which reads shared/design-tokens.json. Never type a color code or size in a component.
- Give every component an accessibility label, role, and state.
- Only the files in src/storage may read or write saved data.
- Keep testing options (the component gallery, the one-move-from-solved board, the one-minute reminder) behind __DEV__, so they never appear in a build I share.
- Run npm test after every change and report the result.
- Don't change PRODUCT-BRIEF.md or anything in the shared folder unless I ask.
