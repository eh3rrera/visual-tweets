module.exports = {
	twitter: {
	    consumer_key        :  '<INSERT_TWITTER_CONSUMER_KEY_HERE>',
	    consumer_secret     :  '<INSERT_TWITTER_CONSUMER_SECRET_HERE>',
	    access_token        :  '<INSERT_TWITTER_ACCESS_TOKEN_HERE>',
	    access_token_secret :  '<INSERT_TWITTER_ACCESS_TOKEN_SECRET_HERE>'
    },

    pubnub: {
        ssl           : false,  
        publish_key   : '<INSERT_PUBNUB_PUBLISH_KEY_HERE>',
        subscribe_key : '<INSERT_PUBNUB_SUBSCRIBE_KEY_HERE>'
    },

    hashtagsToTrack: ['#news', '#family', '#quote', '#love', '#today', '#programming'],

    channelGroup: 'hashtags',

    channelUpdates: 'hashtag_updates',

	port: process.env.APP_PORT || 3000
}