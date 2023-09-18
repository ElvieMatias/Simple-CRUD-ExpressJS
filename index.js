
// [SECTION] DEPENDENCIES and MODULES
// Express ----
const express = require("express");
// Mongoose ----
const mongoose = require("mongoose");

// Allows our backend application to be available to our frontend application
// Allows us to control the app's Cross Origin Resource Sharing Setting
// Cors ----
const cors = require("cors");
// Allows access to routes defined within our application
const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoutes");

const orderRoutes = require("./routes/orderRoutes");

const cartRoutes = require("./routes/cartRoutes");

// [SECTION] Environment Setup
const port = 4012;

// [SECTION] Server Setup
// Create an "app" variable that stores the result of the "express" function that initializes our express application and allows us to access to different methods that will make backend creation easy

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Allows all resources to access our backend application
app.use(cors());

// [SECTION] Backend Routes
// http://localhost:4000/users
// Defiles the "/users" string to be included for all user routes defines in the "user" route
app.use("/b12/users", userRoutes);

app.use("/b12/products", productRoutes);

app.use("/b12/orders", orderRoutes);

app.use("/b12/carts", cartRoutes);

// [SECTION] Database Connection
mongoose.connect("mongodb+srv:/******DB Connection HERE******/E-commerceAPI?retryWrites=true&w=majority", {

	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Promts a message in the terminal once the connection is "open" and we are able yo successfully connect to our database
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));


// Will used the defined port number for the application whenever an environment variable is available OR will used  port 4000 if none is defined
// This syntax will allow flexibility when using the application locally or as a hosted application
// [SECTION] Server gateway response
// if(require.main) would allow to listen to the app directly if it is not imported to another module, it will run the app directly
// else, if it is neede to be imported, it will not run the app and instead export it to be used in another file
if(require.main === module){
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${process.env.PORT || port}`)
	})
}

// export mongoose only for checking
module.exports = {app, mongoose};
