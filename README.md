# Fallout 2 Save Game Editor

Basic save game editor for Fallout 2 for MacOS (Windows support might be added later).

[![Image from Gyazo](https://i.gyazo.com/54d3c99457a4ce4f454f701c12c2494b.png)](https://gyazo.com/54d3c99457a4ce4f454f701c12c2494b)

I wrote this editor for fun as hobby project for learning react-native. While replying the classic Fallout 2 recently I ran into an issue where I got the reputation "childkiller" when a kid accidentally got hit by a shrapnel. This reputation blocks a LOT of quests and AFAIK there's no way of removing it. To make matters worse I also got eye damage which gives you severely poor aim. One can remove this if you have the doctor skill, but there was also a bug in Fallout CE, where when using the doctor skill the screen would go black. Thus, two major pains ruining the fun. So I could start over or write an editor, obviously I chose the latter.

Mainly tested with the amazing [Fallout CE](https://github.com/alexbatalov/fallout2-ce) (check it out), but also briefly verified it works with the GoG version.

**Update:**
I migrated from react-native to [Wails](https://wails.io/) as it is much easier to work with both in terms of support for web libraries and native OS components across supported platforms (Mac, Windows and Linux).

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

Supported platforms:

- [x] MacOS - Tested on MacOS Monterey (12.6.1) and Ventura (13.0)
- [x] Windows 10/11 (amd64 + arm64)

## Todo

- [ ] Add inventory/item editing
- [ ] Tag/untag skills

## Disclaimer

This editor is not in any way extensively tested. The author is not responsible for data lost or corrupted. Use on your own responsibility.

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
