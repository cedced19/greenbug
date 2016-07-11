var Waterline = require('waterline');
var randomstring = require('randomstring');

var Bugs = Waterline.Collection.extend({
    identity: 'bugs',
    connection: 'save',
    autoCreatedAt: false,

    attributes: {
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