# visual-tweets
This web application shows you how to use channel groups with PubNub's Stream Controller API to visualize tweets with certain hashtags in real-time. You can follow the [tutorial](http://tutorials.pluralsight.com/interesting-apis/visualizing-tweets-with-pubnub-s-stream-controller-and-css3-animations) to build this application or jump straight to the code.

# Requirements

- [Twitter API access](https://dev.twitter.com/apps/new)
- [Pubnub account](https://admin.pubnub.com/#/register)
- [Node.js](https://nodejs.org/en/download/)

# Installation
1. Clone this repository and `cd` into it.
2. Copy `config.sample.js` into a `config.js` file to enter your Twitter and PubNub API keys.
3. Optionally, in this file you can change the hashtags to be tracked also.
    1. If you change a hashtags, you have to update the `public/css/hashtags.css` file to update the class name for the color too.
4. Execute `npm install` to download dependencies.
5. Execute `node app.js` to start the Node.js server.
6. Go to `http://localhost:3000` to visualize the tweets.
7. Go to `http://localhost:3000/admin` to control which hastags to show. 

# License
MIT