var Waterline = require('waterline');
var randomstring = require('randomstring');

var Labels = Waterline.Collection.extend({
    identity: 'labels',
    connection: 'save',
    autoUpdatedAt: false,
    autoCreatedAt: false,

    attributes: {
        color: {
            type: 'string',
            required: true,
            defaultsTo: function () {
                return '#fff'; // Should return a random color in the future
            }
        },
        bugs: {
            collection: 'bugs',
            via: 'labels'
        },
        name: {
            type: 'string',
            required: true
        }
    }

});

module.exports = Labels;
