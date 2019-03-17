// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');

let numberDataArray = undefined;

function drawArrayNumber (canvContext2D, numArray){
    console.log(numArray);
    canvContext2D.lineJoin = "round";
    canvContext2D.moveTo(0,0);//move path to spepcity point,do not create any line
    for(var i = 0; i < numArray.length; ++i){
        canvContext2D.lineTo(i,  (200 - numArray[i]));
    }
    //canvContext2D.lineTo(50,  100);
    canvContext2D.stroke();
}

/**
 * asunc callback
 */
function cBack(error, data){
    if(error){
        document.write("<p>Read file Error!");
        console.log("read File ERROR");
    }else{
        console.log("Bengin read File ===>");
        numberDataArray = (data.split("\n").map(Number));
        console.log("===>END read");
        var canv = document.getElementById("ecg").getContext("2d");
        drawArrayNumber(canv,numberDataArray.slice(1000,2000));
    }
}

/**
 * read a file async
 */
function readerAsunc(cb){
    fs.readFile('./HolterV1V5_ecg.txt','utf-8',cb);
}

/**
 * read a file sync
 */
function readerSync(){
    console.log("Bengin read File ===>");
    return fs.readFileSync('./HolterV1V5_ecg.txt','utf-8').split("\n").map(Number);
}

/**
 * moudle.exports = {}
 */
exports.figure =function(){
    numberDataArray = readerSync();
    console.log("===>END read");
    var canv = document.getElementById("ecg").getContext("2d");
    drawArrayNumber(canv,numberDataArray.slice(50000,51000));
}

exports.asyncFigure = function(){
    readerAsunc( cBack );
}

