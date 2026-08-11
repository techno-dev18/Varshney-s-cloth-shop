import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

    console.log("Testing MongoDB DNS...");

    const addresses = await dns.promises.resolveSrv(
      "_mongodb._tcp.pregrad.5kvepa8.mongodb.net"
    );

    console.log("MongoDB SRV records:");
    console.log(addresses);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
  }
};

export default connectDB;