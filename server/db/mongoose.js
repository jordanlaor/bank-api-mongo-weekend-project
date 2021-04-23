const mongoose = require("mongoose");

const password = process.env.MONGO_PASSWORD;
mongoose.connect(`mongodb+srv://mongoose-user:${password}@jordans.hfi6y.mongodb.net/bankApiDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
