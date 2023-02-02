const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;

// const start = async () => {
//   try {
//     await mongoose.connect(uri);
//     // const db = mongoose.connection;
//     // db.on("error", (error) => console.error(error));
//     // db.once("open", () => console.log("Connected to database"));

//     app.listen(PORT, () => console.log(`Server started on port ${5000}`));
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };
