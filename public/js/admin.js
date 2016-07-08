$(document).ready(function() {

    var pubnub = PUBNUB(pubnubConfig);

    // Add/Remove a channel from the group and publish an event to notifiy users
    $('input[type="checkbox"]').change(function() {
        var hashtag = this.id;
        var isChecked = this.checked;
        var url = isChecked ? '/admin/add/' : '/admin/remove/';
        $.ajax({
            type: 'PUT',
            url: url + hashtag,
            success: function(data) {
                pubnub.publish({
                    channel  : channelUpdates,
                    message  : { 
                        "hashtag": hashtag,
                        "add":  isChecked
                    },
                    callback : function(m){
                        console.log(m)
                    }
                });
            }
        });
    });

    /* // In case there are multiple admin windows open, listen for channel updates
    pubnub.subscribe({
        message : function(m) {
            console.log(m);

            $('#' + m.hashtag).prop('checked', m.add);
        },
        connect : function () {
            console.log('Connected to hashtags_update');
        },
        error : function (error) {
            console.log(JSON.stringify(error));
        },
        channel: channelUpdates
    });*/
});