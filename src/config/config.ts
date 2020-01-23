const env = process.env.NODE_ENV || 'development';

console.log('env *****', env);

if (env === "development") {
    process.env.PORT = '3003';
    process.env.MONGODB_URI = 'mongodb://localhost:27019/conversationsdb';
} else if (env === 'test') {
    process.env.PORT = '3003';
    process.env.MONGODB_URI = 'mongodb://localhost:27019/conversationsdb';
}