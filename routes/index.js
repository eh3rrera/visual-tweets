var express = require('express');
var config = require('../config');

var router = express.Router();

router.get('/', function (req, res, next) {
    req.app.get('pubnub').channelGroups.listChannels(
        {
            channelGroup: config.channelGroup
        }, 
        function (status, response) {
            if (status.error) {
                console.log(JSON.stringify(status));
                return;
            }

            //console.log(JSON.stringify(response));
            res.render('index', {
                hashtagsToTrack: req.app.get('tagsToTrack'),
                hashtagsInGroup: response.channels,
                config: config
            });
        }
    );
});

module.exports = router;