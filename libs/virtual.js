var mongoose = require('mongoose')
var log         = require('./log')(module);
var config      = require('./config');
var crypto      = require('crypto');


mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;


// define a schema
var personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
});

personSchema.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});

personSchema.virtual('name.full').set(function (name) {
  var split = name.split(' ');
  this.name.first = split[0];
  this.name.last = split[1];
});

// compile our model
var Person = mongoose.model('Person', personSchema);

// create a document
var bad = new Person({
    name: { first: 'Walter', last: 'White' }
});

console.log(bad.name.first + ' ' + bad.name.last); // Walter White


console.log('%s is insane', bad.name.full); 

bad.name.full = 'Duraimurugan Govindaraj';

console.log('%s is insane', bad.name.full); 

bad.save(function(err, data)
{
	if(err) console.log(err);

	console.log('DATA' + data);
}
);

