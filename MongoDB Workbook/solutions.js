// to make the output come on the terminal, go to terminal and write mongo > ex1.js

//these are the exercises from MongoDB workbook by nicholas johnson
use people;

(function () {
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
  var randName = function () {
    var n = names.length;
    return [
      names[Math.floor(Math.random() * n)],
      names[Math.floor(Math.random() * n)]
    ].join(' ');
  }
  var randAge = function (n) {
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
db.people.find({ age: { $eq: 99 } })
db.people.find({ age: { $gt: 65 } }).pretty()
db.people.find({ age: { $gt: 12, $lt: 20 } }).pretty()
//Exists
db.people.find({ cats: { $exists: true } }).pretty()
db.people.find({ cat: { $exists: true }, age: { $gt: 60 } }).pretty()
db.people.find({ "cat": { $exists: true }, "age": { $gt: 13, $lt: 20 }, "cat.age": { $gt: 13, $lt: 20 } }).pretty()

//Where
db.people.find({ $where: "this.cat=true" })
db.people.find({ "cat": { $exists: true }, $where: "this.age<this.cat.age" }).pretty()
db.people.find({ "cat": { $exists: true }, $where: "this.name==this.cat.name" }).pretty()

//Tidy up your output
db.people.find({}, { name: true })
db.people.find({}, { name: true }, { age: { $eq: 99 } })
db.people.find({ "cat": { $exists: true } }, { cat: true }).pretty()

//remove the ids
db.people.find({ "cat": { $exists: true } }, { cat: true, _id: false }).pretty()

//count the people
db.people.find().count()
db.people.find({ cat: { $exists: true } }).count()
db.people.find({ "cat": { $exists: true }, $where: "this.age<this.cat.age" }).count()

//limit the people
db.people.find().limit(5)
db.people.find().limit(5).skip(5)
db.people.find({ cat: { $exists: true }, "cat.name": /Yolanda/ }).sort({ age: 1 }).limit(5)

//Exercise - Order the people--------------
//Give me the 5 oldest cats
//db.people.find({"cat":{$exists:true}}).sort({'cat.age':-1}).limit(5)

//Give me the next 5 oldest cats
//db.people.find({"cat":{$exists:true}}).sort({'cat.age':-1}).limit(5).skip(5)

//Stockbrokers
// mongoimport --db stocks --collection stocks --file stocks.json
// Find all the stocks where the profit is over 0.5
db.getCollection('stocks').find({ "Profit Margin": { $gt: 0.5 } })
//Find all the stocks with negative growth
db.stocks.find({ "EPS growth past 5 years": { $lt: 0 } }).pretty()

//Exercise Stocks
//mongoimport --db stocks --collection stocks --file stocks.json
//Find me the top 10 most profitable stocks
db.getCollection('stocks').find({}, { Sector: true }).sort({ "Profit Margin": -1 }).limit(10).pretty()
//Add a projection, tell me which sector the most profitable stocks are in.
db.getCollection('stocks').aggregate([{
  $group: {
    "_id": "$Sector",
    "av": {
      $avg: "$Profit Margin"
    },
    "count": { $sum: 1 }
  }
},
{
  $sort: { "av": -1 }
}])
//Which is the least profitable sector.
//healthcare

//Exercise - Cursor methods------------------
//Iterate over each of the people and output them.
db.people.find().forEach(function (p) { print(p.name) })
//change the find function to find only the people with cats.
db.people.find({ "cat": { $exists: true } }).forEach(function (p) { print(p.name) })
//Iterate over each of the people, outputting just the cat name and age each time.
db.people.find({ "cat": { $exists: true } }).forEach(function (p) { print(p.cat.name + " " + p.cat.age) })
//Use Map to generate an array containing all of the cat names.
db.people.find({ $where: "this.cat" }).map((function (thing) { return thing.cat.name }))

//exercise- STock ticker!!!!!!!!!!!

//Exercise - Create a document
//Refresh your muscle memory. Create a new person now. Ensure that person has a shark.
db.people.insert({ "name": "Irene Ann", "age": 22, "shark": { "name": "MrShark", "age": 1 } })

//Exercise - Find the shark
//Refresh your muscle memory. Find the person who has a shark.
db.people.find({ "shark": { $exists: true } })
//Use findOne instead of find. This will return only one document.
db.people.findOne({ "shark": { $exists: true } })

//Exercise - Make everyone older
//A year has gone by. Write a loop that iterates over a cursor and makes everyone one year older.
db.people.find().forEach((function (person) { db.people.update({ "_id": person._id }, { $inc: { "age": 1 } }) }))
//Remember to make the cats older too. See if you can do both in the same loop.
//use $inc to increment 
db.people.find().forEach(function (person) {
  db.people.update({ "_id": person._id }, { $inc: { "age": 1 } })
  if (person.cat) {
    db.people.update({ "_id": person._id }, { $inc: { "cat.age": 1 } })
  }
})

//Exercise pirates
//use $set to set and $unset to remove
db.getCollection('people').find({ name: /Pirate/ }).forEach(person => {
  db.getCollection('people').update({ "_id": person._id }, { $set: { "pirana": 1 } }, false, true)
});

//Exercise - remove all the people.
//It's time for a cull. Delete all the 50 year olds.
db.people.remove({ "age": 50 })
//We also heard there was some guy running round with a shark. That's a dangerous animal. Take him out, in fact take out anyone with a shark.
db.people.remove({ "shark": { $exists: true } }

//Larger Exercise - Enron fraud search !!!!!!!!!!!!!!!!!!!!!!!!!!!

//The Mongo Aggregation Framework
//Exercise - Create an Empty pipeline
//db.people.aggregate()

//Exercise - $match!!!!!!!!!!!!!!!!!!!!!!!!!!
//Use the people dataset. Match all the people who are 10 years old who have ten year old cats.
//Match all the people who are over 80 years old, and who's cats are over 15 years old.

//Exercise
//Make a list of cat names.
//First $match people with cats, or the output will be a bit sparse.
db.getCollection('people').aggregate([{ $match: { cat: { $exists: true } } }])
//Now use $project to pull out only the cat names. You will need to use the dot syntax: '$cat.name'.
db.getCollection('people').aggregate([{ $match: { cat: { $exists: true } } }, { $project: { catname: "$cat.name" } }])

// Exercise - Stocks!!!!!!!!!!!!!!!!!!!!!
// Use the stocks JSON file.
// rename "Profit Margin" to simply "Profit". Surpress all other output including the id. I only want to see profit, the company name and the ticker.
db.getCollection('stocks').aggregate([{ $project: { Profit: '$Profit Margin', Ticker: true, Company: true, _id: false } }])

//Exercise - String aggregation operators
db.getCollection('people').aggregate([{ $project: { name: { $toUpper: ['$name'] } } }])

//Exercise - Add a hasCat field
db.people.aggregate([{ $project: { hasCat: { $cond: { if: '$cat', then: true, else: false } } } }])

//Exercise - Project the stocks
//Modify your stocks. Project the profit as a profit field.
db.getCollection('stocks').aggregate([{ $project: { profit: '$Profit Margin' } }])
//Add a isProfitable field to show if the profit is greater than 0.
db.getCollection('stocks').aggregate([{ $project: { profit: '$Profit Margin', isProfitable: { $cond: { if: { $gte: ['$Profit Margin', 0] }, then: true, else: false } } } }])
//Add a buyNow field to show if the profit is greater than 0.5
db.getCollection('stocks').aggregate([{ $project: { profit: '$Profit Margin', isProfitable: { $cond: { if: { $gte: ['$Profit Margin', 0] }, then: true, else: false } }, buyNow: { $cond: { if: { $gte: ['$Profit Margin', 0.5] }, then: true, else: false } } } }])

//Exercise
//Try this out on your people data set. You should get a list of distinct names.
db.people.aggregate([{ $group: { _id: '$name' } }])
//The output is untidy, each name output in the id field. Add a $project step to the popeline to rename the '_id' field to 'name'.
//You just wrote a function for getting distinct emails.
db.people.aggregate([{ $group: { _id: "$name" } }, { $project: { name: "$_id", _id: false } }])

//Exercise - Grouping by object
//Try out the above. Notice that the _id field is now an object. Use $project to reformat the data. You now have distinct names and ages.
db.people.aggregate([{ $group: { _id: { name: '$name', age: '$age' } } }])
//reformated
db.people.aggregate([{ $group: { _id: { name: '$name', age: '$age' } } }, { $project: { name: '$_id.name', age: '$_id.age' } }])


//Exercise - Group and push
//Use $match to select only people with cats
//Now group by name, and for each person.
//Push the cats into the result.
//We can now see a list of all the cats owned by people with a particular name.
db.people.aggregate([
  { $match: { cat: { $exists: true } } },
  {
    $group: {
      _id: '$name',
      count: { $sum: 1 }, //shows the count of people in this group with this name + owns a cat
      cat_details: {
        $push: {
          name: '$cat.name',
          age: '$cat.age'
        }
      }
    }
  }
])

//Exercise - Enron
//Take the Enron dataset and group by sender.
//Push $$ROOT into the group. You now have the emails handily grouped by sender.

//Exercise - Count everything
//Count all the people. How many are there?
//Count with $match
//Add a $match step to the start of your pipeline. Count all the people with cats using the aggregate pipeline. How many do you have?
//Harder - Count with $project and $cond
//Use project to create a 'hasCat' field. You will need to use $cond to do this: http://docs.mongodb.org/manual/reference/operator///aggregation/cond/. Check that your pipeline now contains the hasCat field.
//Now group by hasCat and count.
//Finally use $project to clean up your stats. You now have a JSON API call for finding the cat status in your application.

//Exercise - Stocks
//group the stocks data by sector.
//Use $sum to discover the most profitable sector
//Sort by profitability
//$project the results

//Exercise - Enron
//The Enron dataset is a publically available database of emails sent during the Enron scandal.
//http://nicholasjohnson.com/mongo/datasets/enron.json
//Import it into Mongo using mongoimport, something like this:
//mongoimport --db enron --collection emails --file enron.json
//List all the unique senders.
//Count all the unique senders.
//group by sender and count to find out which email address sent the most emails.
//Rank the senders in order or emails sent.
//Harder
//Rank the senders in order or emails sent + emails received. You will need to use a project stage to do this.



