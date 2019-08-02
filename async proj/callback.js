// const doit=()=> { //doit is a function which has setTimeout. Since setTimeout is accepting another func, it is an async call which will only return the object after 3 seconds. Fat arrow doesnt need return keyword if it only has a single statement. automatucaly returns thenext line 
//     setTimeout(()=>{
//         return{
//             data: "I am working inside." //this is returning an object
//         }
//     },3000)
// }

// const todo = doit(); //todo is now a function call
// console.log(todo.data); //this throws an error because setTimeout is an async call and this line is not waiting for todo.data which is still processing the data. To avoid this error, we use callbacks. because we need someone to tell us when the async func is done - these are callbacks.
//who is the "someone" provided by JS?
//1) function callbacks, //promises, //async/await

//1) Callbacks are simple functions which are used to notify the calling instance when an async code block has been executed and the result is available 

// const doit=(callback)=> { 
//     setTimeout(()=>{
//         callback({
//             data: "I am working inside." 
//         })
//     },3000)
// }

// doit((todo)=>{console.log(todo.data)})
// console.log("i am working outside") //this will be sent first 

//-------------
//example 1
// function levelOne(value, callback) {
//     var newScore = value + 5;
//     callback(newScore);
// }
// function levelTwo(value, callback) {
//     var newScore = value + 10;
//     callback(newScore);
// }
// function levelThree(value, callback) {
//     var newScore = value + 30;
//     callback(newScore);
// }
// // Note that it is not needed to reference the callback function as callback when we call levelOne(), levelTwo() or levelThree(), it can be named anything.
// function startGame() {
//     var currentScore = 5;
//     console.log('Game Started! Current score is ' + currentScore);
//     levelOne(currentScore, function (levelOneReturnedValue) {
//         console.log('Level One reached! New score is ' + levelOneReturnedValue);
//         levelTwo(levelOneReturnedValue, function (levelTwoReturnedValue) {
//             console.log('Level Two reached! New score is ' + levelTwoReturnedValue);
//             levelThree(levelTwoReturnedValue, function (levelThreeReturnedValue) {
//                 console.log('Level Three reached! New score is ' + levelThreeReturnedValue);
//             });
//         });
//     });
// }
// startGame();

//example 2
function serverRequest(query, callback){
    setTimeout(function(){
      var response = query + "full!";
      callback(response);
    },1000);
  }

  function getResults(results){
    console.log("Response from the server: " + results);
  }

  serverRequest("The glass is half ", getResults);

//Error Handling included (written in ES6 format)
// const serverReq = (query, callback) => {
//   setTimeout(() => {
//     callback(query + "full!", true);
//   }, 1000);
// }

// serverReq("The glass is half ", (results, is_error) => {
//   if (is_error == true) { console.log("Response from the server: " + results) }
//   else { console.log("error YASSSSSSS BIJ") }
// })

  // Result in console after 1 second delay:
  // Response from the server: The glass is half full!


//Error Handling if setTimeout itself doesnt work
function abc(callback){
  let a = ((setTimeout(function(){ 
    callback({ data : "Server Response"});
}, 5000))||0)
    if(a==0){
      console.log("there is an error")
    }
}
abc(function(x){
    console.log(x);
});
console.log('Hi');