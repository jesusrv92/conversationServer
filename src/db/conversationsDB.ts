// // This one doesn't use import from structure because it makes the Promise property read-only
import mongoose from 'mongoose';
console.log('Connecting to mongoDB using mongoose.');

const connectionWithRetry = (mongoose: any) => mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    useCreateIndex: true
}).catch(() => console.log('Connection error.'));

connectionWithRetry(mongoose);

mongoose.connection.on('error', () => {
    console.log('Conection failed. Retrying in 5 seconds.')
    setTimeout(connectionWithRetry, 5000, mongoose);
})

console.log('Exporting connection object.');
export default mongoose;