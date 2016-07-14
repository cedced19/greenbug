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
                return randomstring.generate(11);
            }
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
