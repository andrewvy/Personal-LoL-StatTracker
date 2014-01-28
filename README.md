Personal-LoL-StatTracker
========================

Node.js + MySQL back-end, with a focus on gathering and tracking League of Legends statistics.

Uses
'''
[node-restify](https://github.com/mcavage/node-restify)
[node-mysql](https://github.com/felixge/node-mysql)
[node-schedule](https://github.com/mattpat/node-schedule)
[Riot's API](https://developer.riotgames.com/)
'''

What it does
------------

Retrieves data via Riot's API service, and stores game statistics into a MySQL database.
Computes total and misc statistics and allows access to the data via API calls.
Front-end will call from the exposed API and display every statistics, compute even more random statistics.

What works right now
--------------------

Automatic fetching new games, saving to MySQL DB, and computing statistics.

How to use
----------

Documentation needed!
