var Waterline = require('waterline');

var Records = Waterline.Collection.extend({
    identity: 'records',
    connection: 'save',
    autoUpdatedAt: false,

    attributes: {
        freeRam: {
            type: 'number',
            required: true
        },
        up: {
          type: 'boolean'
        },
        server: {
            model: 'servers'
        }
    }

});

module.exports = Records;
