const StockXAPI = require('stockx-api');
const accountSid = 'ACbd4a5c5ab3f42a8d4631c6711ddfff59';
const authToken = 'c7054c3d9807d2d365acdd971fb1a432';
const client = require('twilio')(accountSid, authToken); 
const stockX = new StockXAPI({'currency':'EUR'});
{
    (async () => {
        try {
            console.log('loggando');
            
            //Logs in using account email and password
            await stockX.login({
                user: 'itzme.trentaeuro@gmail.com', 
                password: 'Alessio2016!'
            });
            
            
            console.log('loggato');

            const product = await stockX.fetchProductDetails("https://stockx.com/air-jordan-1-retro-high-court-purple-white", {})
            for (i in product.variants) {
                if (product.variants[i]["size"]=='8.5') {
                    var size85 = product.variants[i]["market"];
                    var lastsale = size85["lastSale"], lowestask = size85["lowestAsk"]
                    break}
                }

                console.log("!!! INFO !!!\nLAST SALE:",lastsale,"\nLOWEST ASK:",lowestask);
            
            
            while(true) {
                const product = await stockX.fetchProductDetails("https://stockx.com/air-jordan-1-retro-high-court-purple-white", {})
                for (i in product.variants) {
                    if (product.variants[i]["size"]=='8.5') {
                        var size85 = product.variants[i]["market"];
                        var lastsale2 = size85["lastSale"], lowestask2 = size85["lowestAsk"]
                        break}
                    }
                    if(
                        lastsale == lastsale2 && lowestask == lowestask2
                    ) {}
                    else {
                        var mess = "!!! INFO !!!\nOLD LAST SALE: "+lastsale+" \nOLD LOWEST ASK: "+lowestask+" \n\nNEW LAST SALE: "+lastsale2+" \nNEW LOWEST ASK: "+
                        lowestask
                        client.messages 
                        .create({ 
                            body: mess, 
                            from: 'whatsapp:+14155238886',       
                            to: 'whatsapp:+15702157333' 
                        })
                        .done();
                        var lastsale = lastsale2
                        var lowestask = lowestask2
                    }
                    
                }
            }
        
    catch(e) {
        console.log("Error "+e.message)
    }})();}