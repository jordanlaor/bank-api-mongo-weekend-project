const mongoose = require("mongoose");

const password = process.env.MONGO_PASSWORD
mongoose.connect(`mongodb+srv://mongoose-user:${password}@jordans.hfi6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)