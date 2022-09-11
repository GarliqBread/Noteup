# Noteup

Noteup is a free, open-source notes app for the web and desktop. Your notes are saved in local storage, but are available for download/import.

# Technologies ⚙️

- React
- Recoil
- Tauri (native wrapper for desktop)

# Get started

To get started just clone the repo and run the install and start scripts

```properties
yarn install
```

```properties
yarn start
```

To run the native versions, after the install script run

```properties
yarn tauri dev
```

To make a tauri build run

```properties
yarn tauri build
```

# Missing features

- [ ] Note sharing
- [ ] Account sync
- [ ] Cross-platform sync
- [ ] Extra download options (like `.pdf`)
- [ ] Quick command bar (WYSIWYG style)
- [ ] Add a page with markdown help commands

## Contributing

This is an open source project, and contributions are welcomed and appreciated. Open issues, bugs, and enhancements are all listed on the [issues](https://github.com/elements/noteup/issues) tab and labeled accordingly.

View [CONTRIBUTING.md](CONTRIBUTING.md) to learn about the style guide, folder structure, scripts, and how to contribute.

# Inspirations

This project was heavily inspired by another markdown note app I was using for a while called [Takenote](https://github.com/taniarascia/takenote) and the macOS notes app.
