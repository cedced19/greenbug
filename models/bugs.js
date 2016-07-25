var Waterline = require('waterline');
var randomstring = require('randomstring');

var Bugs = Waterline.Collection.extend({
    identity: 'bugs',
    connection: 'save',
    autoUpdatedAt: false,
    autoPK: false,

    attributes: {
        id: {
            type: 'string',
            primaryKey: true,
            defaultsTo: function () {
                return randomstring.generate(11);
            }
        },
        description: {
            type: 'string',
            required: true
        },
        project: {
            model: 'projects'
        },
        path: {
            type: 'string'
        },
        mimetype: {
            type: 'string'
        },
        email: {
            type: 'string',
            email: true
        },
        labels: {
          collection: 'labels',
          via: 'bugs'
        }
    }

});

module.exports = Bugs;
