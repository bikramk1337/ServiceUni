// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     if (!process.env.MONGO_URL) {
//       return console.log(
//         "Make sure environment variable MONGO_URL has mongodb connection link "
//       );
//     }
//     mongoose.set("strictQuery", true);
//     const conn = await mongoose.connect(process.env.MONGO_URL);

//     conn?.connections && console.log("MongoDB connected!");
//   } catch (error) {
//     console.log(error);
//   }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const str =
      process.env.MONGO_URL || "mongodb://localhost:27017/library_mgmt";
    console.log(str);
    mongoose.set("strictQuery", true);
    const con = await mongoose.connect(str);
  } catch (error) {
    console.log(error);
  }
};
