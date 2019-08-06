//We use the require directive to load the http module and store the returned HTTP instance into an http variable
const http = require("http") //no need to install since http is available by default. 
const port = 3000; //port numbers allow clients to access a particular server. That server will only be available via this port now.

//creating server
const server = http.createServer(function(req,res){
    res.end("this is my first node server"); //whenever there is a request, we will end the response using this statement
});

server.listen(port,function(){
    console.log(`Server started at ${port}`);
})
//console.log(window) will throw an error coz node has no window object 

console.log(); //global object. Globally available in node
setTimeout() ; //another example of global object. There are many more

//in browsers we have smth called window obj which represents our global scope. Therefore all the variables/methods declared gobally can be acceseed through this window obj. 
// for this use window.console.log, window.setTimeout.But in node we dont have window obj so use the obj "global instead". global.setTimeout etc. 


//if port number is changed, use nodemon which will automaticaly restart the server at the new port
//install nodemon using npm 