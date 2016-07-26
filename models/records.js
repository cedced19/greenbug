var Waterline = require('waterline');

var Records = Waterline.Collection.extend({
    identity: 'records',
    connection: 'save',
    autoUpdatedAt: false,

    attributes: {
        ram: { // Ex: 2304 MB
            type: 'float'
        },
        totalRam: { // Ex: 4096 MB
            type: 'float'
        },
        up: { // Optional, the server will check some pages. Ex: true
            type: 'boolean'
        },
        server: {
            model: 'servers'
        }
    }

});

module.exports = Records;
