import mongoose, { mongo } from 'mongoose';


export const connectDB = async() => {

    let url;

    if (process.env.NOVE_ENV === 'production') {
        url = process.env.MONG_URL;
    } else if (process.env.NODE_ENV === 'test') {
        url = process.env.MONGO_TEST;
    } else if (process.env.NODE_ENV === 'development') {
        url = process.env.MONGO_DEV 
    }

    try {
        await mongoose.connect(url || "mongodb://localhost:27017/todo_draketech", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Connected in', process.env.NODE_ENV, mongoose.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export const clearDB = async() => {
    const { collections } = mongoose.connection;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}

export const closeDB = async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}

export const disconnectDB = async () => { await mongoose.disconnect(); }

