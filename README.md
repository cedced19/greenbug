# greenbug
A web application to get bugs from users of web.

It should be host by the developer of those different web application.  
The goal is to provide a link to this web appliction which drives the user to this website.  
When the user is on this website, he can report the bug he has seen.   
Now the developer can have a feedback from the users and improve his application.  


__When those features will be developed__, some monitoring of your servers will be added.
It will required a small software on your servers to send informations to Greenbug.

[![Build Status](https://travis-ci.org/cedced19/greenbug.svg)](https://travis-ci.org/cedced19/greenbug)
[![NPM version](https://badge.fury.io/js/greenbug.svg)](http://badge.fury.io/js/greenbug)

## CLI (soon)

```bash
$ npm install greenbug -g
```

Go in command line to the directory where you have your save.

```bash
$ greenbug
```

## Server

```bash
$ git clone --depth=1 https://github.com/cedced19/greenbug
$ cd ./greenbug
$ npm install --production
$ npm start --production
```

## API

There are Rest API on:
* `http://localhost:8881/api/bugs/` for bugs
* `http://localhost:8881/api/projects/` for projects
* `http://localhost:8881/api/users/` for users
* `http://localhost:8881/api/registrants/` for registrants (a person who intends to be an user)

## Developers

There are two npm commands with which you can compile javascript and css:
* `npm run dev`: reload page on change and build bundle
* `npm run prod`: build and uglify bundle
