var express = require('express');
var config = require('../config');

var router = express.Router();

router.get('/', function (req, res, next) {
    req.app.get('pubnub').channel_group_list_channels({
        channel_group: config.channelGroup,
        callback : function(m){
            //console.log(JSON.stringify(m));
            res.render('index', {
                hashtagsToTrack: req.app.get('tagsToTrack'),
                hashtagsInGroup: m.channels,
                config: config
            });
        },
        error : function (error) {
            console.log(JSON.stringify(error));
        }
    });
});

module.exports = router;