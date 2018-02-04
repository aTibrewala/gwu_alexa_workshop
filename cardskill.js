'use strict';
const Alexa = require("alexa-sdk");
const cards = require('./data.json');

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('WantACard');
    },
    'NextCardIntent': function () {
        this.emit('WantACard');
    },
    'WantACard': function () {
        var randomCardIndex = Math.floor(Math.random() * Math.floor(cards.length));

        this.attributes['lastRandomCard'] = cards[randomCardIndex];
      
        this.response.speak(cards[randomCardIndex].question)
                     .listen('Say give me the answer to get the answer.');

        this.emit(':responseReady');
    },
    'AnswerCardIntent': function () {
        this.emit('AnswerTheCard');
    },
    'AnswerTheCard': function () {
        var lastRandomCard = this.attributes['lastRandomCard'];

        if (lastRandomCard != null) {
            this.response.speak(lastRandomCard.answer + ' <break time="1s"/> Say give me the next card to get another card.')
                         .listen('Say give me the next card to get another card.');
        } else {
            this.response.speak('Please ask for a card first. <break time="1s"/> Say give me a card to get a card.')
                         .listen('Say give me a card to get a card.');
        }
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = 'This is the Flash Card Skill. ';
        const reprompt = 'Say give me a new card, to get a new card.';

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('See you later!');
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak('I did not understand the request. To ask for help say help.');
        this.emit(':responseReady');
    }
};
