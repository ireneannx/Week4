//OOPS

//Funtion Prototypes
//function protoypes always start with capital letter by convention
function Bootcamper(name, age, address, gender ){ //bootcamper is a function prototype
    this.name = name;
    this.age = age;
    this.address = address;
    this.gender = gender
}
//object creation for function prototypes
const rizwan = new Bootcamper("Rizwan", 12, "hyd", "M"); //new creates a new instance of the bootcamper function prototype
//at time of rizwan, rizwan.name = rizwan. Relates to use of this. Note: whenever there is "this" inside a function, its a function protoype not a function
const rituraz = new Bootcamper("Rithraz", 10, "Delhi", "M");

//say i forgot to add a proterty to bootcamper
Bootcamper.prototype.habits = function(){
    console.log("eating an sleeping");
}

//console.log(rizwan) wont show the added property habits 
//but
rizwan.habits(); //will show it. Note that all bootcampers will have the same habits using this method. 

//inheritance with JS prototypes: use .call
///---------------------------------------------------

//Using classes (preferred over function prototypes)
class Brootcamper{
    constructor(fname,iname,age){
        this.name = fname;
        this.iname = iname;
        this.age = age;
    }
}

//instructor INHERITS from brootcamper
class instructor extends Brootcamper{
    constructor(fname,iname,age,skills){
        super(fname,iname,age); //for inheriting
        this.skills = skills;
    }
}
const rixwan = new Brootcamper("Rizxamn","zxc",10) //instantiation
console.log(rixwan);

const prash = new instructor("prash","anth",10,"MERN"); //instantiation
console.log(prash);