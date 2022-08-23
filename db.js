const mongoose = require("mongoose");

const { MongoMemoryServer } = require("mongodb-memory-server");
const port = process.env.PORT || 5000; //Line 3

module.exports.connect = async () => {
  try {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();

    mongoose.connect(uri, { useNewUrlParser: true });
  } catch (err) {
    console.log(err, "WHHY");
  }
  mongoose.Promise = Promise;
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.stop();
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
