import mongoose from "mongoose";

export const connectToDatabase = async() => {
    try{
        if(process.env.NODE_ENV === 'development'){
            const connectionString = `${process.env.DB_PROTOCOL}://${process.env.DB_IP}/${process.env.DB_NAME}`
            const connectDB = await mongoose.connect(connectionString)
            console.log(`Node has successfully connected to ${process.env.DB_NAME} database!`)
        }
        if(process.env.NODE_ENV !== 'development'){
            const connectionString = `${process.env.DB_URI}`
            const connectDB = await mongoose.connect(connectionString)
            console.log(`Node has successfully connected to database!`)
        }

    }
    catch(err){
        console.log(err, "Failed to connect to database");
        process.exit(1);
    }
}

export const disconnectFromDatabase = async () => {
    await mongoose.connection.close();
    console.log("Diconnected from database");
    return;
}