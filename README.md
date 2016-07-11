# greenbug
A web application to get bugs from users of web.

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
