//getTrumpCard
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
//////////////////////////////////////////////////////
   var json = event;
    //exports.handler = async (event, context) => {
    //var json = JSON.parse(event.body);
    console.log("Get Deal");
    class Card{
        faceValue;
        cardType;
    }

    var cardsOnHand = json.cardsOnHand;
    var totalCardsOnHand=cardsOnHand.length;
    let trumpCard = new Card();
    // Todo @Thomas - pls refactor the get deal logic
    var myDeal=20;
    for (var i = 0; i < totalCardsOnHand; i++) {
        if (cardsOnHand[i].faceValue=="J"){
            myDeal+=3;
        }else if (cardsOnHand[i].faceValue=="9"){
            myDeal+=2;
        }
    }
    if (cardToPlay.cardType==""){
        cardToPlay.cardType=cardsOnHand[0].cardType;
        cardToPlay.faceValue=cardsOnHand[0].faceValue;
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(myDeal),
        headers: {
            "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS 
            "Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Content-Type": "application/json",
            "test":"value2"
        },

    };
    return response;
}