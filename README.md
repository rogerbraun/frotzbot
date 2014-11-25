frotzbot
========

A frotz wrapper, mainly for IRC. Not affiliated with the Frotz interpreter, but it uses it.

Features
--------
* Command line frontend!
* IRC frontend!
* XMPP/Jabber/HipChat frontend!
* Frotz backend!
* Comes with a [game] [0]!

Setup
-----
If you are using x64 Linux, you are in luck, as I already compiled frotz for you:

1. Clone this repo.
2. Do an `npm install`.
3. Run `node app.js`

You should now have frotzbot running with a command line frontend. If you want the irc or xmpp frontend, look into the example in the `config` folder.

If you are using a different OS, you will have to point the config to the frotz binary. I'm pretty sure it needs to be 'dumb Frotz' (see https://github.com/DavidGriffith/frotz/blob/master/DUMB), so try to get that.

Commands
--------

These commands work with all frontends. Remember to prefix your command with a "!" for the irc frontend.

* `gamelist`: List all games that are available
* `startgame gamename`: Start a specific game.

And all your favorite infocom commands like `save`, `restore`, `look` and `take lamp`.

Future
------
* Use other interpreters than Frotz!
* Specs, tests, mocks, and other one-syllable words!
* Hack the Gibson!

[0]: http://ifwiki.org/index.php/Pick_Up_The_Phone_Booth_And_Die
