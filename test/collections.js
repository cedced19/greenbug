process.env.NODE_ENV = 'production';

var assert = require('assert');
var expect = require('chai').expect;
var Waterline = require('waterline');
var memoryAdapter = require('sails-memory');

suite('Test models', function () {
    var waterline = new Waterline();
    var config = {
        adapters: {
            'default': memoryAdapter,
            memory: memoryAdapter
        },
        connections: {
            save: {
                adapter: 'memory'
            }
        },
        defaults: {
            migrate: 'safe'
        }
    };


    setup(function (done) {
        waterline.loadCollection(require('../models/users.js'));
        waterline.loadCollection(require('../models/registrants.js'));
        waterline.loadCollection(require('../models/bugs.js'));
        waterline.loadCollection(require('../models/projects.js'));
        waterline.loadCollection(require('../models/servers.js'));
        waterline.loadCollection(require('../models/records.js'));
        waterline.initialize(config, function  (err, ontology) {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    teardown(function () {
        var adapters = config.adapters || {};
        var promises = [];

        Object.keys(adapters)
            .forEach(function (adapter) {
                if (adapters[adapter].teardown) {
                    var promise = new Promise(function (resolve) {
                        adapters[adapter].teardown(null, resolve);
                    });
                    promises.push(promise);
                }
            });

        return Promise.all(promises);
    });

    test('should be able to create a user', function () {
        var Users = waterline.collections.users;

            return Users.create({
                email: 'cedced19@gmail.com',
                password: '123456',
                admin: true
            })
            .then(function (user) {
                assert.equal(user.email, 'cedced19@gmail.com', 'should have set the email');
                assert.equal(user.admin, true, 'should have set the admin state');
                assert.notEqual(user.password, '123456', 'should have hash the password');
            });
    });

    test('should be able to create a registrant', function () {
        var Registrants = waterline.collections.registrants;

            return Registrants.create({
                email: 'cedced19@gmail.com',
                password: '123456'
            })
            .then(function (registrant) {
                assert.equal(registrant.email, 'cedced19@gmail.com', 'should have set the email');
                assert.equal(registrant.password, '123456', 'should haven\'t hash the password');
            });
    });

    test('should be able to create a bug and link it to a project', function (done) {
        var Projects = waterline.collections.projects;
        var Bugs = waterline.collections.bugs;

        Projects.create({
            title: 'Pizzayolo',
            description: 'A application to order a pizza.'
        })
        .then(function (project) {
            assert.equal(project.title, 'Pizzayolo', 'should have set the title');
            assert.equal(project.description, 'A application to order a pizza.', 'should have set the description');
            assert.equal(project.bugs.length, 0, 'should have no tasks');
            Bugs.create({
                description: 'Cannot order a royal pizza.',
                project: project.id
            }).then(function(bug) {
                assert.equal(bug.description, 'Cannot order a royal pizza.', 'should have set the description');
                Bugs.find()
                .populate('project')
                .exec(function(err, bug) {
                    if (err) throw err;
                    assert.equal(bug[0].project.title, 'Pizzayolo', 'should have linked to a project');
                    done();
                });
            });
        });
    });
});
