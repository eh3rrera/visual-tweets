var express = require('express');
var config = require('../config');

var router = express.Router();

router.get('/', function (req, res, next) {
	req.app.get('pubnub').channel_group_list_channels({
        channel_group: config.channelGroup,
        callback : function(m){
            res.render('admin', {
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

router.put('/add/:channel', function (req, res, next) {
    req.app.get('pubnub').channel_group_add_channel({
        callback : function(m,e,c,d,f){
            //console.log(JSON.stringify(m));
            res.json({
                status: 'OK'
            });
        },
        error : function (error) {
            console.log(JSON.stringify(error));
            res.json({
                status: 'Error'
            });
        },
        channel: req.params.channel,
        channel_group: config.channelGroup
    });
});

router.put('/remove/:channel', function (req, res, next) {
	req.app.get('pubnub').channel_group_remove_channel({
        callback : function(m,e,c,d,f){
            //console.log(JSON.stringify(m));
            res.json({
                status: 'OK'
            });
        },
        error : function (error) {
            console.log(JSON.stringify(error));
            res.json({
                status: 'Error'
            });
        },
        channel: req.params.channel,
        channel_group: config.channelGroup
    });
});

module.exports = router;