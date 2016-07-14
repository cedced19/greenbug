var Waterline = require('waterline');
var randomstring = require('randomstring');

var Projects = Waterline.Collection.extend({
    identity: 'projects',
    connection: 'save',
    autoUpdatedAt: false,
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
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
            required: true
        },
        bugs: {
            collection: 'bugs',
            via: 'project'
        }
    }

});

module.exports = Projects;
