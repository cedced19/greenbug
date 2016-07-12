var Waterline = require('waterline');
var randomstring = require('randomstring');

var Bugs = Waterline.Collection.extend({
    identity: 'bugs',
    connection: 'save',
    autoCreatedAt: false,
    autoPK: false,

    attributes: {
        id: {
            type: 'string',
            primaryKey: true,
            defaultsTo: function () {
                return randomstring(11);
            }
        },
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        project: {
            model: 'projects'
        }
    }

});

module.exports = Bugs;
