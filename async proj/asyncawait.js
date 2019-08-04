//await is a syntactic sugar for promises. It makes the async code look more like synchronous/proeedural code which is easier for humans to understand


//promise
// const abc = ()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             let error = true;
//             if(!error){
//                 resolve({ data : "Server Response",
//                         fun : ()=> console.log("Not Funny")
//              });
//             } 
//             else{
//                 reject({err : "Error"});
//             }  
//      }, 2000);
//     })
// }
//     abc()
//         .then((data)=> {
//             console.log(data.data);
//             data.fun();
//         })
//         .catch((err)=> console.log(err.err));
// console.log('Hi');

// //async await
// const abc = ()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             let error = false;
//             if(!error)  resolve({ data : "Server Response"});
//             else    reject({err:"Error"});  
//      }, 2000);
//     })
// }
// async function new_server(){
//     const data = await abc();
//     return data;
// }
// new_server().then(final_data => console.log(final_data.data));

// console.log('Hi');
