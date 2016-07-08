var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var config = require('./config');
var Handlebars = require('handlebars');
var Twit = require('twit');
var Pubnub = require("pubnub");

var T = new Twit({
	consumer_key        :  config.twitter.consumer_key,
	consumer_secret     :  config.twitter.consumer_secret,
	access_token        :  config.twitter.access_token,
	access_token_secret :  config.twitter.access_token_secret
});

var pubnub = Pubnub({
    ssl           : config.pubnub.ssl,  
    publish_key   : config.pubnub.publish_key,
    subscribe_key : config.pubnub.subscribe_key
});

var tagsToTrack = config.hashtagsToTrack.map(function(val) {
    return val.substr(1);
});

var hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        active: function (hashtag, group, options) { 
            var data;
            if (options.data) {
                data = Handlebars.createFrame(options.data);
            }
            data.active = data && group.indexOf(hashtag) > -1;
            
            return options.fn(hashtag, { data: data }); 
        }
    }
});

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.set('pubnub', pubnub);
app.set('tagsToTrack', tagsToTrack);

var indexRoutes = require('./routes/index');
var adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);


app.listen(config.port, function() {
    console.log('Server up and listening on port %d', config.port);

    // Add channels to the group
    pubnub.channel_group_add_channel({
        channel_group: config.channelGroup,
        channel: tagsToTrack,
        callback: function(m){
            //console.log(m);

            // Get tweets from the hashtags to track
            var stream = T.stream('statuses/filter', { track: config.hashtagsToTrack })
            stream.on('tweet', function (tweet) {
                var channel = '';

                // Which hashtag the tweet belongs to?
                for(var index in tweet.entities.hashtags) {
                    var hashtag = tweet.entities.hashtags[index].text.toLowerCase();
                    
                    if(tagsToTrack.indexOf(hashtag) > -1) {
                        channel = hashtag;
                        break;
                    }
                }

                // Publish tweet data
                if(channel !== '') {
                    var obj = {"text": tweet.text, "url": 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str, "hashtag": channel};
                    //console.log(channel + ': ' + JSON.stringify(obj));

                    pubnub.publish({
                        channel : channel,
                        message : obj,
                        callback : function(m){
                            console.log(m)
                        },
                        error : function(m){
                            console.log(m)
                        }
                    });
                }
            });
        },
        error: function(err){
            console.log(err);
        },
    });
});