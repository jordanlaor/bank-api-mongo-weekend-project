const mongoose = require("mongoose");

const password = process.env.MONGO_PASSWORD;
console.log(password);
mongoose.connect(`mongodb+srv://mongoose-user:${password}@jordans.hfi6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
