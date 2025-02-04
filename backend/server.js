const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // Corrected import
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // You already imported dotenv

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// MongoDB URL from environment variables
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Fixed typo
});

// Check MongoDB connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});


const TrashBinRouter = require("./routes/TrashBinRoutes.js");
const PickupRouter = require("./routes/PickupRoutes.js");
const UserRouter = require("./routes/UserRoutes.js");
const DriverRouter = require("./routes/DriverRoutes.js");
const RouteRouter = require("./routes/RouteRoutes.js");


app.use("/TrashBin",TrashBinRouter);
app.use("/Pickup",PickupRouter);
app.use("/Users",UserRouter);
app.use("/Driver",DriverRouter);
app.use("/Routek",RouteRouter);
app.use("/User",UserRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
