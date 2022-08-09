import mongoose from 'mongoose';
// connect
module.exports = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect('mongodb://localhost:27017/todo-app', connectionParams);
    console.info('Connected to database.');
  } catch (error) {
    console.info('Could not connect to database.', error);
  }
};
