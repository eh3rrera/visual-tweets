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

            res.render('admin', {
                hashtagsToTrack: req.app.get('tagsToTrack'),
                hashtagsInGroup: response.channels,
                config: config
            });
        }
    );
});

router.put('/add/:channel', function (req, res, next) {
    req.app.get('pubnub').channelGroups.addChannels(
        {
            channels: [req.params.channel],
            channelGroup: config.channelGroup
        }, 
        function (status) {
            if (status.error) {
                console.log(JSON.stringify(status));
                res.json({
                    status: 'Error'
                });
            } else {
                //console.log(JSON.stringify(m));
                res.json({
                    status: 'OK'
                });
            }
        }
    );
});

router.put('/remove/:channel', function (req, res, next) {
    req.app.get('pubnub').channelGroups.removeChannels(
        {
            channels: [req.params.channel],
            channelGroup: config.channelGroup
        }, 
        function (status) {
            if (status.error) {
                console.log(JSON.stringify(status));
                res.json({
                    status: 'Error'
                });
            } else {
                //console.log(JSON.stringify(m));
                res.json({
                    status: 'OK'
                });
            }
        }
    );
});

module.exports = router;