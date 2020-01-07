
// server.js
var Server = require('ws').Server;
var port = process.env.PORT || 9030;
var ws = new Server({port: port});
var bestscore = 0;
var globalsize = 0;
console.log('START');
 
class Data{
 
    constructor(player, number, ballx, bally, bonus, edges){
        this.player=player;
        this.number=number;
        this.ballx=ballx;
        this.bally=bally;
        this.bonus=bonus;
        this.edges=edges;
        this.type ="data";
    }
}
 
class Player{
 
    constructor(player){
        this.player=player;
        this.type="player";
    }
}
 
class Information{
 
    constructor(number, msg){
        this.number=number;
        this.msg=msg;
        this.type="info";
    }
}
 
let pair = [];
let pairs = [];
let number = 0;
 
ws.on('connection', function(w){
 
    globalsize++;
    w.id=globalsize;
    //pair.push(w);
 
    console.log("Connected id: "+w.id);
    w.send(JSON.stringify(new Information(bestscore,"newS")));

    //w.send(JSON.stringify("Hello client"));
 
    // if(player==2){
    //     err=false;
    //     for(i=0;i<2;i++){
    //         if(err==false){
    //             pair[i].send(JSON.stringify(new Information(number,"ready")), function(e){
    //                 err = true;
    //             });  
    //         } else {
    //             pair[i].send(JSON.stringify(new Information(number,"close")));
    //         }
    //     }
 
    //     if(err==true){
    //         number--;
    //         for(i=0;i<2;i++){
    //             // console.log("TUTEJ1!");
    //             try{
    //                 pairs[number-1][i].send(JSON.stringify(new Information(number,"close")), function(ee){
    //                     // console.log("TUTEJJJJ1!");
    //                 });
    //             } catch(ex) {
    //                 // do nothing
    //             }
    //         }
    //     } else {
    //         pairs.push(pair);
    //     }  
    //     pair = [];
    //}
 
    w.on('message', function(msg){
        let data = JSON.parse(msg);

        if (data.type=="info"){
            console.log(data.number);
            if(bestscore < data.number)
            {
                bestscore = data.number;
                w.send(JSON.stringify(new Information(bestscore,"newS")));
                w.send(JSON.stringify(new Information(globalsize,"playersN")));
            }

            // if(data.msg=="close"){
            //     for(i=0;i<2;i++){
            //         // console.log("TUTEJ2!");
 
            //         try{
            //             pairs[number-1][i].send(JSON.stringify(new Information(number,"close")));
            //         } catch (errr){
            //             // do nothing

            //         }
            //     }
            // }
        }
        //console.log(data);
        //console.log("MSG");
        //if(data.type=="data"){
            //number = data.number;
 
            // console.log("TYPE: "+data.type);
            // console.log("BONUS: "+data.bonus);
 
        //     if(data.bonus==false){
        //         if(data.player==1) data.player = 2;
        //         else data.player = 1;
        //     }
 
        //     // console.log("Current player: "+data.player);
        //     // console.log("NUMBER OF GAME: "+number);
 
        //     for(i=0;i<2;i++){
        //         pairs[number-1][i].send(JSON.stringify(data));
        //     }
        // } else if (data.type=="info"){
        //     number = data.number;
        //     if(data.msg=="close"){
        //         for(i=0;i<2;i++){
        //             // console.log("TUTEJ2!");
 
        //             try{
        //                 pairs[number-1][i].send(JSON.stringify(new Information(number,"close")));
        //             } catch (errr){
        //                 // do nothing
        //                 // console.log("TUTEJ3!");
        //             }
        //         }
        //     }
        // }
    });
 
    w.on('close', function(code,msg) {
        // for(i=0;i<2;i++){
        //     // console.log("TUTEJ2!");
        //     try{
        //         pairs[w.id-1][i].send(JSON.stringify(new Information(number,"close")));
        //     } catch (errr){
        //         // do nothing
        //         // console.log("TUTEJ333!");
        //     }
        // }
        // console.log('Closing connection:' +w.id);
    });
});