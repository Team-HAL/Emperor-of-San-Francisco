var thinky = require('thinky')();
var type   = thinky.type;

// Create a model - the table is automatically created
var Player = thinky.createModel("Player", {
  id: type.number(),
  monster_type: type.string(),
  hp: type.number(),
  vp: type.number(),
  energy: type.number(),
  next: type.number(),
  card: [type.number()],
  boardid: type.number(),
});

// You can also add constraints on the schema
var Board = thinky.createModel("Board", {
  id: type.number(),      // a normal string
  //name: type.string().min(2),  // a string of at least two characters
  //email: type.string().email() // a string that is a valid email
});

var CardStore = thinky.createModel("CardStore", {
  boardid: type.number(),
  card: [type.string()],
})

var Card = thinky.createModel("Card", {
  id: type.number(),
})
// Join the models
Post.belongsTo(Author, "author", "idAuthor", "id");