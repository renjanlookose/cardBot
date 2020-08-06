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
    var totalCardsOnHand=6;
    console.log("Starting......");
    class Card{
        faceValue;
        cardType;
    }
    let startingCard = new Card();
    startingCard.cardType=event.startingCard_cardType;
    startingCard.faceValue=event.startingCard_faceValue;
    let trumpCard = new Card();
    trumpCard.cardType=event.trumpCard_cardType;
    trumpCard.faceValue=event.trumpCard_faceValue;

    var cardsOnHand = [
        {cardType: "", faceValue: ""},
        {cardType: "", faceValue: ""},
        {cardType: "", faceValue: ""},
        {cardType: "", faceValue: ""},
        {cardType: "", faceValue: ""},
        {cardType: "", faceValue: ""},
    ];

    cardsOnHand[0].cardType=event.cardsOnHand_cardType0;
    cardsOnHand[1].cardType=event.cardsOnHand_cardType1;
    cardsOnHand[2].cardType=event.cardsOnHand_cardType2;
    cardsOnHand[3].cardType=event.cardsOnHand_cardType3;
    cardsOnHand[4].cardType=event.cardsOnHand_cardType4;
    cardsOnHand[5].cardType=event.cardsOnHand_cardType5;

    cardsOnHand[0].faceValue=event.cardsOnHand_faceValue0;
    cardsOnHand[1].faceValue=event.cardsOnHand_faceValue1;
    cardsOnHand[2].faceValue=event.cardsOnHand_faceValue2;
    cardsOnHand[3].faceValue=event.cardsOnHand_faceValue3;
    cardsOnHand[4].faceValue=event.cardsOnHand_faceValue4;
    cardsOnHand[5].faceValue=event.cardsOnHand_faceValue5;
    
    var isMyTeamIsWinning=event.isMyTeamWinning;
    var isTrumpKnown=event.isTrumpKnown;
    var isGetFirstCard=event.isGetFirstCard;
    var isMyTrump=event.isMyTrump;
///////////////////////////////////////////////////////
    let cardToPlay = new Card();
    cardToPlay.cardType="";
    cardToPlay.faceValue="";
////////////////////////////// Renjan changing from here   /////////////////////////
if (isGetFirstCard=="Y"){
    cardToPlay.cardType=cardsOnHand[0].cardType;
    cardToPlay.faceValue=cardsOnHand[0].faceValue;
    var isJackFound="N";
    if (isMyTrump=="N"){
        for (var i = 0; i < totalCardsOnHand; i++) {
            if (cardsOnHand[i].cardType=="J"){
                isJackFound="Y";
                cardToPlay.cardType=cardsOnHand[i].cardType;
                cardToPlay.faceValue=cardsOnHand[i].faceValue;
            }
            if (isJackFound=="N"){
                var isLarge=isCardLarge(cardsOnHand[i].faceValue,cardToPlay.faceValue);
                if(isLarge=="N"){
                    cardToPlay.cardType=cardsOnHand[i].cardType;
                    cardToPlay.faceValue=cardsOnHand[i].faceValue;
                }
            }
        }
    }
    else if (isTrumpKnown=="Y"){ //My Trump
        isTrumpeWithMe="N";
        for (var i = 0; i < totalCardsOnHand; i++) {
            if (cardsOnHand[i].cardType==trumpCard.cardType){
                isTrumpeWithMe="Y";
                var isLarge=isCardLarge(cardsOnHand[i].faceValue,cardToPlay.faceValue);
                if(isLarge=="Y"){
                    cardToPlay.cardType=cardsOnHand[i].cardType;
                    cardToPlay.faceValue=cardsOnHand[i].faceValue;
                }
            }
        }
    }
    else if (isMyTrumpKnown=="N"){ //My Trump
        for (var i = 0; i < totalCardsOnHand; i++) {
            if (cardsOnHand[i].cardType!=trumpCard.cardType){
                if (cardsOnHand[i].cardType=="J"){
                    isJackFound="Y";
                    cardToPlay.cardType=cardsOnHand[i].cardType;
                    cardToPlay.faceValue=cardsOnHand[i].faceValue;
                }
                if (isJackFound=="N"){
                    var isLarge=isCardLarge(cardsOnHand[i].faceValue,cardToPlay.faceValue);
                    if(isLarge=="N"){
                        cardToPlay.cardType=cardsOnHand[i].cardType;
                        cardToPlay.faceValue=cardsOnHand[i].faceValue;
                    }
                }
            }
        }
    }
}else{
    var isStartingCardWithMe="N";
    for (var i = 0; i < totalCardsOnHand; i++) {
        if (cardsOnHand[i].cardType==startingCard.cardType){
            if(isStartingCardWithMe=="N"){
                cardToPlay.cardType=cardsOnHand[i].cardType;
                cardToPlay.faceValue=cardsOnHand[i].faceValue;
                isStartingCardWithMe="Y";
            }
            else{
                var isLarge=isCardLarge(cardsOnHand[i].faceValue,cardToPlay.faceValue);
                if(isLarge=="Y"){
                    if (isMyTeamIsWinning=="Y"){
                        cardToPlay.cardType=cardsOnHand[i].cardType;
                        cardToPlay.faceValue=cardsOnHand[i].faceValue;
                    }
                }
                else if(isLarge=="N"){
                    if (isMyTeamIsWinning=="N"){
                        cardToPlay.cardType=cardsOnHand[i].cardType;
                        cardToPlay.faceValue=cardsOnHand[i].faceValue;
                    }
                }
            }
        }
    }
////////////////////////////////////////////////////////////////////////////////////
    if(isStartingCardWithMe=="N"){
        var isTrumFound="N";
        isTrumpKnown="Y";
        for (var i = 0; i < totalCardsOnHand; i++) {
            if (cardsOnHand[i].cardType==trumpCard.cardType){
                cardToPlay.cardType=cardsOnHand[i].cardType;
                cardToPlay.faceValue=cardsOnHand[i].faceValue;
                isTrumFound="Y";
            }
        }
        if (isTrumFound=="N"){
            for (var i = 0; i < totalCardsOnHand; i++) {
                if (cardsOnHand[i].faceValue!="J"){
                    var isLarge=isCardLarge(cardsOnHand[i].faceValue,cardToPlay.faceValue);
                    if(isLarge=="Y"){
                        if (isMyTeamIsWinning=="Y"){
                            cardToPlay.cardType=cardsOnHand[i].cardType;
                            cardToPlay.faceValue=cardsOnHand[i].faceValue;
                        }
                    }
                    else if(isLarge=="N"){
                        if (isMyTeamIsWinning=="N"){
                            cardToPlay.cardType=cardsOnHand[i].cardType;
                            cardToPlay.faceValue=cardsOnHand[i].faceValue;
                        }
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
        body: JSON.stringify('getNextCard v1.1'),
        cardToPlay,
        isTrumpKnown,
        trumpCard,
        startingCard,
        isMyTeamIsWinning,
        isStartingCardWithMe,
        cardsOnHand,
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