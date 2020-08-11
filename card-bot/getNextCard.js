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
    console.log("getNextCard......");
    class Card{
        faceValue;
        cardType;
    }

    var cardsOnHand = json.cardsOnHand;
    var totalCardsOnHand=cardsOnHand.length;
    var isTrumpKnown=json.isTrumpKnown;
 //   var isMyTrump=json.isMyTrump;
    let trumpCard = new Card();
    let startingCard = new Card();
    if (isTrumpKnown=="Y"){
        trumpCard =json.trumpCard;
    }
    ///////////////////////////////////////////////////////
    let cardToPlay = new Card();
    cardToPlay.cardType="";
    cardToPlay.faceValue="";
    ////////////////////////////// Get Next CARD   /////////////////////////

    startingCard=json.startingCard;    
    var isStartingCardWithMe="N";
    for (var i = 0; i < totalCardsOnHand; i++) {
        if (cardsOnHand[i].cardType==startingCard.cardType){
            if (cardsOnHand[i].faceValue=="J"){
                cardToPlay.cardType=cardsOnHand[i].cardType;
                cardToPlay.faceValue=cardsOnHand[i].faceValue;
                isStartingCardWithMe="Y";
            }
            else if(isStartingCardWithMe=="N"){
                cardToPlay.cardType=cardsOnHand[i].cardType;
                cardToPlay.faceValue=cardsOnHand[i].faceValue;
                isStartingCardWithMe="Y";
            }
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////
    if(isStartingCardWithMe=="N"){
        var isTrumFound="N";        
        if (isTrumpKnown=="N"){  //Ask for Trump
            cardToPlay.cardType="X";
            cardToPlay.faceValue="X";
        }
        else{
            for (var i = 0; i < totalCardsOnHand; i++) {
                if (cardsOnHand[i].cardType==trumpCard.cardType){
                    var isLarge=isCardLarge(cardsOnHand[i].faceValue,cardToPlay.faceValue);
                    if(isLarge=="Y"){
                        cardToPlay.cardType=cardsOnHand[i].cardType;
                        cardToPlay.faceValue=cardsOnHand[i].faceValue;
                        isTrumFound="Y";
                    }
                }
            }
        
            if (isTrumFound=="N"){
                for (var i = 0; i < totalCardsOnHand; i++) {
                    if (cardsOnHand[i].faceValue!="J"){
                        var isLarge=isCardLarge(cardsOnHand[i].faceValue,cardToPlay.faceValue);
                        if(isLarge=="N"){
                            cardToPlay.cardType=cardsOnHand[i].cardType;
                            cardToPlay.faceValue=cardsOnHand[i].faceValue;
                        }
                    }
                }
            }
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////
    
    if (cardToPlay.cardType==""){
        cardToPlay.cardType=cardsOnHand[0].cardType;
        cardToPlay.faceValue=cardsOnHand[0].faceValue;
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(cardToPlay),
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
};

var isCardLarge = function(faceValue1,faceValue2) {
    var isLarge="N";
    var cardRanking="7 8 Q K 10 A 9 J";
    var index1 = cardRanking.indexOf(faceValue1);
    var index2 = cardRanking.indexOf(faceValue2);
    if (index1>index2){
        isLarge="Y";
    }
    return isLarge;    
};