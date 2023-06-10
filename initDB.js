
const mongoose = require('mongoose')
module.exports = ()=>{

    mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_PASS,
    pass: process.env.DB_USER,
  })
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch(err=>console.log(err.message));

  //handle mongoose events
  mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to the DB');
  });
  mongoose.connection.on('error', err=>{
    console.log(err.message);
  });
  mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose connection is disconnected');
  });
  process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log('Mongoose connection is terminated');
      process.exit(0); 
    });
    
  });
}