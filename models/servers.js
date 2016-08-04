var Waterline = require('waterline');
var hash = require('password-hash-and-salt');

var format = function(server, cb) {
    if (server.password) {
        hash(server.password).hash(function(err, crypted) {
          if (err) return cb(err);
          server.password = crypted;
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
        password: {
          type: 'string',
          required: true
        },
        project: {
            model: 'projects'
        }
    },
    
    beforeCreate: format,
    beforeUpdate: format
});

module.exports = Servers;
