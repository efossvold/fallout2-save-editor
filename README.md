# Fallout 2 Save Game Editor

Very basic save game editor for Fallout 2 (tested on OSX with the GoG.com version.)

Wrote this since I couldn't find any save game editors that immediately worked on OSX (and as a fun little learning project!)

It _should_ work outside of OSX, but no promises.

## Word of Caution

<b>Make a backup of any save files before using this!</b>

This script edits the save file continuously (i.e. as soon as you set a value it is set in the file) and it is easy to corrupt a save file.

## Usage

Most users will probably want to use the command line shell available by running (requires Python 2.7):

```
python main.py
```

(Make sure the save file path defined in `main.py` is correct for your system.)

After selecting a save file, `help` will give you an overview of the available commands:

```
Command: help

Documented commands (type help <topic>):
========================================
exit  help  perks  set_perk  set_skill  set_stat  skills  stats
```

and you can explore the different commands by `help <command>`

```
Command: help set_stat
set_stat [stat]
        Modify stats. Values are limited to be in [1, 10].
```

and example usage:

```
Command: set_skill <TAB>
Barter          Energy Weapons  Lockpick        Repair          Sneak           Throwing
Big Guns        First Aid       Melee Weapons   Science         Speech          Traps
Doctor          Gambling        Outdoorsman     Small Guns      Steal           Unarmed
Command: set_skill Ene<TAB>
Command: set_skill Energy Weapons
[Value: 0] New value: 100
Done.
```

_Caveats:_

- Skills are the unmodified value (so for a new game all values are 0.)
- Some perks can be set to more than `1`, but not all support it (and might crash the game.)

## Todo

- Add item editing.
- Show actual modified skill values.

## Known Issues

- Some valid save game files fail the parsing stage. This seems to mostly happen with saves towards the end of the game.

## Credits

Based on the great documentation from http://falloutmods.wikia.com/wiki/SAVE.DAT_File_Format
