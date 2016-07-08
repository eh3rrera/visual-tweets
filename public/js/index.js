$(document).ready(function() {

    var pubnub = PUBNUB(pubnubConfig);

    // Listen for tweets to add to the window
    pubnub.subscribe({
        message : function(m) {
            //console.log(m);

            var x = Math.random() * 100;
            var y = Math.random() * 100;
            var style = 'top:' + y + '%; left:' + x + '%;';
            (function (el) {
                setTimeout(function () {
                    el.remove();
                }, 10000);
             } (
                $('<a href="' + m.url + '" class="' + m.hashtag + '" title="' + m.text +'" style="' + style +'" target="_blank"></a>')
                    .appendTo('.area')
               )
            );
        },
        connect : function () {
            console.log('Connected to receive tweets');
        },
        error : function (error) {
            console.log(JSON.stringify(error));
        },
        channel_group: channelGroup
    });

    // Listen for updates to the channel group
    pubnub.subscribe({
        message : function(m) {
            console.log(m);

            if(m.add) {
                $('#' + m.hashtag).css("visibility", "visible"); // show the added hashtag
            } else {
                $('#' + m.hashtag).css("visibility", "hidden"); // hide the removed hashtag
                $('a.' + m.hashtag).each(function () { // hide all the tweets shown that belong to that hashtag
                    var $this = $(this);
                    $this.hide();
                });
            }
        },
        connect : function () {
            console.log('Connected to receive hashtags updates');
        },
        error : function (error) {
            console.log(JSON.stringify(error));
        },
        channel: channelUpdates
    });
});