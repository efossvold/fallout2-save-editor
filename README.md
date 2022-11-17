# Fallout 2 Save Game Editor

Basic save game editor for Fallout 2 for MacOS (Windows support might be added later).

I wrote this editor for fun as hobby project for learning react-native. While replying the classic Fallout 2 recently I ran into an issue where I got the reputation "childkiller" when a kid accidentally got hit by a shrapnel. This reputation blocks a LOT of quests and there's no way of removing it. To make matters worse I also got eye damage which gives you severely poor aim. One can remove this if you have the doctor skill, but there was also a bug in Fallout CE, where if using the doctor skill the screen would go black. Thus, two major pains ruining the fun. So I could start over or write an editor, obviously I chose the latter.

Tested on MacOS Monterey (12.6.1) and Ventura (13.0). Mainly tested with the amazing [Fallout CE](https://github.com/alexbatalov/fallout2-ce) (check it out), but also briefly verified it works with the GoG version.

## Disclaimer

This editor is not in any way extensively tested. The author is not responsible for data lost or corrupted. Use on your own responsibility.

<b>When clicking "Save" no backup is created. Therefore always manually created a backup.</b>

## Todo

- Windows version

## Nice to have

- Add inventory/item editing

## Known Issues

- Quitting the app by clicking on the "Quit" button does not work. Just press Cmd+Q

## Credits

Inspired by https://github.com/freesalu/fallout-2-editor. Item data (for inventory) is taken from this repository.

Based on the great documentation from http://falloutmods.wikia.com/wiki/SAVE.DAT_File_Format
