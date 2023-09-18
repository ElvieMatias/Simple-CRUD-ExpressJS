const jwt = require("jsonwebtoken");
// User defined string data that will be used to create our JSON web tokens 
// Used in the algorithm for encryption our data which makes it difficult to decode the information without the defined secret code
const secret = "E-CommerceAPI";

// [SECTION] JSON Web Tokens
// Token creation
module.exports.createAccessToken = (user) => {
	// The data will be received from the registration form
	// When the user logs in, a token will be created with user's information
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};
	// Generate a JSON web token using the jwt's sign method
	// Generates the token using the form data and the secret code with no additional options provided
	return jwt.sign(data, secret, {});
}

// [SECTION] Token Verification

module.exports.verify = (req, res, next) =>{
	// The token is retrieved from the request header
	// This can be provided in postman
	console.log(req.headers.authorization);

	// req.headers.authorization contains sensitive data
	let token = req.headers.authorization;

	// if we are not passing token in our request authorization or in our postman authorization, then here in our api, req.headers.authorization will be undefined

	// This if statement will check if the token contains undefined or a proper jwt
	if(typeof token === "undefined"){
		return res.send({auth : "Failed. No Token"});
	} else {
		console.log(token);

		token = token.slice(7,token.length); 

		console.log(token);
		// [SECTION] Token Decrypts
		/*
			-Open the gift and get the content
		*/
		// Validate the token using "verify" method decryption the token using the secret code
		jwt.verify(token, secret, function(err, decodedToken){
			// err will contain the error from decoding your token. This will contain the reason why we will reject the token
			// If verification of the token is a success, then jqt.verify return the decoded token

			if(err){
				return res.send({
					auth: "Failed",
					message : err.message
				});

			}else{
				console.log(decodedToken); //contains the data from our token
				req.user = decodedToken
				// user property will added to request object and will contain our decoded token. It can be acccessed in the next middleware/controller

				next();
				// next() will let us proceed to the next middleware of controller
			}

		})
	}
}


// [SECTION] verifyAdmin will also be used as a middleware
module.exports.verifyAdmin =(req, res, next) => {

	if(req.user.isAdmin){
		// if the logged in user, based  on his token is an admin, we will proceed to the next middleware/controller
		next();
	}else{
		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}
}
