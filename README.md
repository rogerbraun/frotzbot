frotzbot
========

A frotz wrapper, mainly for IRC. Not affiliated with the Frotz interpreter, but it uses it.

Features
--------
* Command line frontend!
* IRC frontend!
* XMPP/Jabber/HipChat frontend!
* Frotz backend!
* Runs on Heroku!
* Comes with a [game] [0]!

Setup
-----
If you are using x64 Linux, you are in luck, as I already compiled frotz for you:

1. Clone this repo.
2. Do an `npm install`.
3. Run `node app.js`.

You should now have frotzbot running with a command line frontend. If you want the irc or xmpp frontend, look into the example in the `config` folder.

If you are using a different OS, you will have to point the config to the frotz binary. I'm pretty sure it needs to be 'dumb Frotz' (see https://github.com/DavidGriffith/frotz/blob/master/DUMB), so try to get that.

Running on Heroku
-----------------

This bot runs on heroku, which is nice for IRC/XMPP/Hipchat usage. Here's how to set it up. This assumes you have the `heroku` tool installed.

1. `git clone` this repo.
2. Add all the games you want to the `./games` folder.
3. Create a new heroku app with `heroku create`.
4. Configure your bot either via environment variables or by adding a `config/config.json` to your local repo and committing it.
5. Do a `git push heroku master`. Heroku will install the npm packages.
6. Make the zork worker actually run with `heroku ps:scale zork=1`

Your bot should now run and show up wherever you configured it to be. If not, check `heroku logs`.

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
