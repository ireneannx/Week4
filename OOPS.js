// //function prototypes------------------------------------------------------------

// //Bootcamper is the constructor function(just like class) with some properties 
// function Bootcamper(property1,prop2,name,age){ //all the properties of bootcamper get defined inside this constructor function
//     this.name = name;
//     this.prop = {
//         property1,
//         prop2
//     }
//     this.age = age;
// }
// //all the methods of Bootcamper constructor function/class get defined on the constructors prototype

// Bootcamper.prototype.method1 = function(){
//     console.log(`hi i am a method which is common over ALL bootcamper objects such as ${this.name}`) 
// }
// Bootcamper.prototype.study = function(){
//     console.log('studying how to code ')
// }

// //instantiation - creating a new instance of the bootcamper class
// var Irene = new Bootcamper('phys bkground','beginner af', 'irene', 22); //instantiating object irene
// //the new keyword means the OS is telling the browser to allocate space for this object in the heap segment dynamic memory
// console.log(Irene.prop.prop2); //understand the outputs
// console.log(Irene); //output wont show methods but methods like method1 for example is still a part of irene's class
// Irene.method1(); //put brackets coz its a method

// var Rush = new Bootcamper('ee bkground','not a noob','rushyab',22); //insantiating object rush
// console.log(Rush.name); //understand the outputs
// Rush.study();

// //inhertitance- instuctor is inheriting properties from bootcamper
// console.log("---------------------------------");
// function Instructor(property1, prop2, name,age,skill){
//     Bootcamper.call(this, property1,prop2, age,name) //prop2 isnt called //do NOT forget the this keyword - refers to the THIS Bootcamper points to which Instructor should also point to after inheriting parameters
//     this.skill = skill; //Note: without "this", it cant inherit
// }

// Instructor.prototype = Object.create(Bootcamper.prototype); //to call a method in bootcamper to instructor we need to use object.create()
// Instructor.prototype.constructor = Instructor; //this and the line above needs to be created BEFORE creating the object prash otherwise calling the method WONT work. This is because otherwise, prash has not even been created but the .prototype has being created. So it shows up at undefined obvs
// var Prash = new Instructor('pro from middle school','cs bkgrnd', 'prashant','23','MERN'); //instantiation

// console.log(Prash);
// console.log(Prash.age);
// console.log(Prash.prop.property1);
// //


// Prash.study();

//using classes from ES6------------------------------------------this is more popular

class cBootcamper{
    //every class must have a constructor method which represents that particular class- it defines the properties in that class
    constructor(property1,prop2,name,age){
        this.name = name;
        this.age = age;
        this.prop ={
            property1, prop2
        }
    }
    //methods for this class are also defined within the cBootcamper class
    method1(){
        console.log(`hi im from method one and i can access "this" which is the object ${this.name}`)
    }
    study(){
        console.log('i am studying');
    }
}

//inheritance: we want cInstructor to inherit properties and methods from cBootcamper

class cInstructor extends cBootcamper{ //extends tells JS which class we want to base the new class on. This is called creating a subclass.
    constructor(property1,prop2,name,age,skills){
        super(property1,prop2,name,age); //Now `this` is initialized by calling the parent constructor. for functional prototype, this is automatically done by the new keyword. Now when you use super, the 'this' of cBootcamper is accessible via teacher

        //skills specific to instructor
        this.skills = skills;
    }
}

let snape = new cInstructor('its Prop1','its prop2','Severus Snape', 62,'Defence against the Dark Arts')
let maria = new cBootcamper('prop1','pop2','maria jamal',18)

// console.log(maria.prop.property1);
// console.log(maria.prop.prop2);
// console.log(maria);
//maria.method1();


console.log(snape)
snape.method1(); //method1 can be accessed!

