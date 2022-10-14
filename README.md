# Project Summary

This project sets up the back end for my project using Node.js, Psql. It connects various APIs to the database returning different values based on the given input.

Link to hosted website
https://felix-game-server.herokuapp.com/api

Instruction for setup
If you wish to clone this repo you will not have access to the necessary environment variables. To gain access you must add ... a .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names in order to successfully connect to the two databases locally.

Minimum versions required
Node - 8.15.0 PSQL - 14.5