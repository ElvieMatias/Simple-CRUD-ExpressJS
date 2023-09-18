// /[SECTION]Dependencies and modules

const User = require("../models/User");

const Order = require("../models/Order");

const bcrypt = require("bcrypt");

const auth = require("../auth");

module.exports.registration = (req, res) =>{

    let newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    return newUser.save().then((user,err) =>{
        if(err){
            return res.send(false);
        } else {
            return res.send({ success: true, user: user });
        }
    }).catch(err => err)

}

module.exports.loginUser = (req, res) =>{
	return User.findOne({email : req.body.email}).then(result => {
		// User does not exist
		if(result == null){
			return false;
		}else{
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			if(isPasswordCorrect){
				// Generates an access token
				// Uses the "createAccessToken" method defined in the auth.js file
				return res.send({access: auth.createAccessToken(result)})
				// Password do not match
			}else{
				return res.send(false);
			}
		}
	}).catch(err => res.send(err))
}

module.exports.getUserDetails = (req, res) => {
	
	return User.findById(req.params.userId).then(user =>{
		
		user.password = "";
		return res.send(user);

	}).catch(err => res.send(err))
}

module.exports.updateUserToAdmin = (req, res) => {
	let userAccess = {
		isAdmin: true
	}

	return User.findByIdAndUpdate(req.body.userId, userAccess).then((user, err) =>{
		if(err){
            return res.send(false);
        }else{
            return res.send(true)
        }
	})
}

module.exports.getUserOrders = (req, res) =>{
    console.log(req.user.id);

    return Order.find({userId: req.user.id}).then(order => {
        if(order == null || order.length == 0){
            return res.send({message: "No Order Found"});
        } else {
            return res.send(order);
        }
    })


}

module.exports.getAllOrders = (req, res) => {
    return Order.find({}).then(orders => {
        if(orders == null){
            return res.send({message: "No Orders Found"});
        } else {
            return res.send(orders);
        }
    })
}