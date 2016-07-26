var Waterline = require('waterline');
var hash = require('password-hash-and-salt');

var format = function(server, cb) {
    if (server.token) {
        hash(server.token).hash(function(err, crypted) {
          if (err) return cb(err);
          server.token = crypted;
          cb();
        });
    } else {
      cb();
    }
};


var Servers = Waterline.Collection.extend({
    identity: 'servers',
    connection: 'save',
    autoUpdatedAt: false,
    autoCreatedAt: false,

    attributes: {
        title: {
            type: 'string',
            required: true
        },
        records: {
            collection: 'records',
            via: 'server'
        },
        token: {
          type: 'string',
          required: true,
          defaultsTo: function () {
              return randomstring.generate(64);
          }
        },
        project: {
            model: 'projects'
        }
    }

});

module.exports = Servers;
