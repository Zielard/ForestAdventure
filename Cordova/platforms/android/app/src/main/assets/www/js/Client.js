
let IP = "192.168.1.22";
class Information{

    constructor(number, msg){
        this.number=number;
        this.msg=msg;
        this.type="info";
    }
}

function connectToServer(){
 
    // WebSocket = require('ws');
 
    // CONNECT TO SERVER
    connection = new WebSocket("ws://"+IP+":9030");
    // Open connection
    connection.onopen = function () {
        console.log('Connected');
        connectClient = true;
        // Log messages from the server
        connection.onmessage = function (e) {
            console.log("ONMESSAGE");
            //console.log('message from server', e.data);
            d = JSON.parse(e.data);
            if(d.msg == "newS")
            {
                bestscoreServer = d.number;
                console.log('message from server', d.type);
            }
            else if(d.msg == "playersN")
            {
                NumberOFLogins = d.number;
                console.log('message from server', d.type);
            }

 
            //connection.send(JSON.stringify(new Information(201,"Stats")));
                // if(d.type=="player"){
                //     yourplayer = d.player;
                //     player = 1;
                //     close=false;
                // } else if(d.type=="info"){
                //     if(d.msg=="ready"){
                //         ready=true;
                //         number=d.number;
                //         console.log("NUMBER "+number);
                //     } else if(d.msg=="close"){
                //         ready=false;
                //         close=true;
                //         connection.close(1000,number+"");
                //         connection = null;
                //     }
                // } else if(d.type=="data"){
                //     player = d.player;
                //     console.log("Current player: "+player);
                //     edges = [];
 
                //     for(i=0;i<d.edges.length;i++){
                //         edges.push(new Edge(new Vertex2f(d.edges[i].begin.x, d.edges[i].begin.y), new Vertex2f(d.edges[i].end.x, d.edges[i].end.y)));
                //     }
                //     ball.x = d.ballx;
                //     ball.y = d.bally;
                //     whoWon();
                // }
                // draw();
        };
    };
 
    // Log errors
    connection.onerror = function (error) {
        connectClient = false;
        console.error('WebSocket Error ' + error);
        
    };
 
    connection.onclose = function (code, msg) {
        connectClient = false;
        console.log("Close: "+code+" "+msg);
        connection.send(new Information(number,"close"));
    };
}
 