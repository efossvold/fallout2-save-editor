# Fallout 2 Save Game Editor

Basic save game editor for Fallout 2.

![Image from Gyazo](https://i.gyazo.com/df7d324e1d3594cb25311675f768e4a4.png)

I wrote this editor for fun as hobby project for learning react-native. While replaying the classic Fallout 2 recently I ran into an issue where I got the reputation "childkiller" when a kid accidentally got hit by a shrapnel. This reputation blocks a LOT of quests and AFAIK there's no way of removing it. To make matters worse I also got eye damage which gives you severely poor aim. One can remove this if you have the doctor skill, but there was also a bug in Fallout CE, where when using the doctor skill the screen would go black. Thus, two major pains ruining the fun. So I could start over or write an editor, obviously I chose the latter.

Mainly tested with the amazing [Fallout CE](https://github.com/fallout2-ce/fallout2-ce) (check it out), but also briefly verified it works with the GoG version.

**Update:**
This repo has now become more of a project for trying out various frameworks, libraries and technologies.

After some time I migrated from react-native to [Wails](https://wails.io/) as it is much easier to work with both in terms of support for web libraries and native OS components across supported platforms (Mac, Windows and Linux). [Wails](https://wails.io/) is used to generate native apps for MacOS and Windows. Migrating from react-native to Wails also made it possible to setup a [webapp](https://fallout2-savegame-editor.netlify.app/) as well.

[Octane](https://octanejs.dev/) was a fun framework to work with. It offers blazing performance and no virtual DOM or rules of hook. However, after version 0.2.0 the bundle size exploded, that's when I looked to [Preact](https://preactjs.com/). At version 0.2.16 octane's bundle size came in at 65 kb gzipped. In comparison preact's bundle size (11.0.0-rc2) 5.72 kb gzipped, that's a **91,2% decrease in size**.

In addition I've been testing out different css framework:

- [Tailwind CSS](https://tailwindcss.com/). No introduction needed...
- [UnoCSS](https://unocss.dev/). Uno supports all of Tailwind but has some extra things such as variant groups, fluid columns with CSS grids which are useful.
- [PandaCSS](https://panda-css.com/). Tailwind is great, but I find it hard to read as the number of classes add up. Panda is definitely more verbose, however, I prefer its readability and clarity over Tailwind.
- [BambooCSS](https://bamboocss.com/). Bamboo CSS a true zero-runtime fork of Panda CSS designed to fix runtime overhead and eliminate unused styles and as a result produces smaller CSS than PandaCSS. It's what I ended up using in this project.

There's a branch for each for these migrations if you're interested in looking at the code.

## Features

Editable stats:

- [x] Attributes (ST, PE, EN, CH, IN, AG, LK)
- [x] Skills
- [x] Perks
- [x] Traits
- [x] Health (HP, posioned, radiated and injuries)
- [x] Mischellaneous (AC, AP, Carry Weight etc.)
- [x] Reputation (karma + various reps such as champion, berserker, childkiller etc.)
- [x] Kills (amount of kills per critter)
- [x] Tag/untag skills

Supported platforms:

- [x] MacOS - Tested on MacOS Monterey (12.6.1) and Ventura (13.0)
- [x] Windows 10/11 (amd64 + arm64)
- [x] [Web](https://fallout2-savegame-editor.netlify.app)
- [ ] Linux (might be added later)

## Disclaimer

This editor is not in any way extensively tested. The author is not responsible for lost or corrupted data. Use on your own responsibility.

<b>When clicking "Save" no backup is created. Therefore, always manually create a backup.</b>

## Known Issues

- Not all perks may correctly update stats (most of them will, but I may have overlooked one or two)
- ~~App does not open with the full window size so you'll have to expand the window by dragging the corners to view the full app.~~
- ~~Quitting the app by clicking on the "Quit" button does not work. Just press Cmd+Q~~
- ~~When the file modal is open, hover effect is still triggered on the elements underneath the modal. No harm done, the modal still works as it should.~~

## Credits

Inspired by https://github.com/freesalu/fallout-2-editor. Item data (for inventory) is taken from this repository.

Based on the great documentation from http://falloutmods.wikia.com/wiki/SAVE.DAT_File_Format

App icon from [getdrawings.com](http://getdrawings.com/get-icon#fallout-2-desktop-icon-76.png)

## License

GNU General Public License v3.0
