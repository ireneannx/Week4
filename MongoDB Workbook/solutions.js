// to make the output come on the terminal, go to terminal and write mongo > ex1.js

//these are the exercises from MongoDB workbook by nicholas johnson
use people;

(function() {
  var names = [
    'Yolanda',
    'Iska',
    'Malone',
    'Frank',
    'Foxton',
    'Pirate',
    'Poppelhoffen',
    'Elbow',
    'Fluffy',
    'Paphat'
  ]
  var randName = function() {
    var n = names.length;
    return [
      names[Math.floor(Math.random() * n)],
      names[Math.floor(Math.random() * n)]
    ].join(' ');
  }
  var randAge = function(n) {
    return Math.floor(Math.random() * n);
  }
  for (var i = 0; i < 1000; ++i) {
    var person = {
      name: randName(),
      age: randAge(100)
    }
    if (Math.random() > 0.8) {
      person.cat = {
        name: randName(),
        age: randAge(18)
      }
    }
    db.people.insert(person);
  };
})();

//-----------------
db.people.find({age:{$eq:99}})
db.people.find({age:{$gt:65}}).pretty()
db.people.find({age:{$gt:12,$lt:20}}).pretty()
//Exists
db.people.find({cats:{$exists:true}}).pretty()
db.people.find({cat:{$exists:true},age:{$gt:60}}).pretty()
db.people.find({"cat":{$exists:true},"age":{$gt:13,$lt:20},"cat.age":{$gt:13,$lt:20}}).pretty()
​
//Where
db.people.find({$where:"this.cat=true"})
db.people.find({"cat":{$exists:true},$where:"this.age<this.cat.age"}).pretty()
db.people.find({"cat":{$exists:true},$where:"this.name==this.cat.name"}).pretty()
​
//Tidy up your output
db.people.find({},{name:true})
db.people.find({},{name:true},{age:{$eq:99}})
db.people.find({"cat":{$exists:true}},{cat:true}).pretty()
​
//remove the ids
db.people.find({"cat":{$exists:true}},{cat:true,_id:false}).pretty()
​
//count the people
db.people.find().count()
db.people.find({cat:{$exists:true}}).count()
db.people.find({"cat":{$exists:true},$where:"this.age<this.cat.age"}).count()
​
//limit the people
db.people.find().limit(5)
db.people.find().limit(5).skip(5)
db.people.find({cat:{$exists:true},"cat.name":/Yolanda/}).sort({age:1}).limit(5)
​
//Exercise - Order the people--------------
//Give me the 5 oldest cats
//db.people.find({"cat":{$exists:true}}).sort({'cat.age':-1}).limit(5)

//Give me the next 5 oldest cats
//db.people.find({"cat":{$exists:true}}).sort({'cat.age':-1}).limit(5).skip(5)
​

//Stockbrokers
// mongoimport --db stocks --collection stocks --file stocks.json
db.stocks.find()
db.stocks.find({"Profit Margin":{$gt:0.5}}).pretty()
db.stocks.find({"EPS growth past 5 years":{$lt:0}}).pretty()
​
//Stocks
db.stks.find().sort({"Profit Margin":-1}).limit(10).pretty()
db.stks.find({},{Sector:true}).sort({"Profit Margin":-1}).limit(1).pretty()
db.stks.find({},{Sector:true}).sort({"Profit Margin":1}).limit(1).pretty()

//Exercise - Cursor methods------------------
//Iterate over each of the people and output them.
db.people.find().forEach(function(p){print(p.name)})
//change the find function to find only the people with cats.
db.people.find({"cat":{$exists:true}}).forEach(function(p){print(p.name)})
//Iterate over each of the people, outputting just the cat name and age each time.
db.people.find({"cat":{$exists:true}}).forEach(function(p){print(p.cat.name+" "+p.cat.age)})
//Use Map to generate an array containing all of the cat names.
db.people.find({$where:"this.cat"}).map((function(thing){return thing.cat.name}))

//Exercise - Create a document
//Refresh your muscle memory. Create a new person now. Ensure that person has a shark.
db.people.insert({"name": "Irene Ann","age":22,"shark":{"name":"MrShark","age":1}})

//Exercise - Find the shark
//Refresh your muscle memory. Find the person who has a shark.
db.people.find({"shark":{$exists:true}})
//Use findOne instead of find. This will return only one document.
db.people.findOne({"shark":{$exists:true}})

//Exercise - Make everyone older!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//A year has gone by. Write a loop that iterates over a cursor and makes everyone one year older.
//Remember to make the cats older too. See if you can do both in the same loop.
//Exercise pirates

//Exercise - remove all the people.
//It's time for a cull. Delete all the 50 year olds.
db.people.remove({"age":50})
//We also heard there was some guy running round with a shark. That's a dangerous animal. Take him out, in fact take out anyone with a shark.
db.people.remove({"shark":{$exists:true}}

//


