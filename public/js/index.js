$(document).ready(function() {

    var pubnub = new PubNub(pubnubConfig);

    pubnub.addListener({
        message: function(data) {
            var m = data.message;

            if(data.subscribedChannel === channelUpdates) { // updates to the channel group
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
            } else { // tweets to add to the window
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
            }
        }
    });

    // Listen for updates to the channel group
    pubnub.subscribe({
        channels: [channelUpdates]
    });

    // Listen for tweets to add to the window
    pubnub.subscribe({
        channelGroups: [channelGroup]
    });
});