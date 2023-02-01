const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI;

const start = async () => {
  try {
    await mongoose.connect(db);
    app.listen(PORT, () => console.log(`Server started on port ${5000}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
