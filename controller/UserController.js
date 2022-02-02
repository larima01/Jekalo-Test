/**
|----------------------------------------------
| User Controller
|----------------------------------------------
| Holds all user operations
|----------------------------------------------
*/
const callbacks = require('../function/index.js')
const User = require('../database/models/').User;
const formvalidator = require('../middlewares/formvalidator');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");



class UserController {
	
	/**
	* register user
	*/
	static async registerUser(req, res){
		try{
			// collect data
			let {first_name,last_name, username, date_of_birth} =  req.body;


			// validate input
		    let rules = {
		    	'first_name':'required',
		    	'username':'required',
		    	'date_of_birth':'required',
		    };

		    let validator = formvalidator(req, rules);
			if(validator){
				return res.status(203).json({
					error:true,
					validator:validator,
					message:'First Name/ Username/ Date of Birth fields are required.'
				});
			}

			// validate user
			let validateUser = await callbacks.findOne(User, {username:username});

			if(validateUser != null){
				return res.status(200).json({
					error:true,
					message:'Username already exist.'
				});
			}

	    	// create user account
	    	let userAccount = {
	    		name_prefix: callbacks.getPrefix(first_name, last_name),
	    		first_name:first_name,
	    		last_name:last_name,
	    		username:username,
	    		date_of_birth:date_of_birth
	    	};

	    	User.create(userAccount)
	    	.then(saved=>{
	    		if(saved){
	    			return res.status(201).json({
	    				error:false,
	    				message:"Registration Successful.",
	    				data:saved
	    			});
	    		}else{
	    			return res.status(203).json({
	    				error:true,
	    				message:'Failed to register user.'
	    			})
	    		}
	    	})
	    	.catch(err=>{
	    		return res.status(203).json({
	    			error:true,
	    			message:err.message
	    		})
	    	});
		}catch(e){
			return res.status(500).json({
				error:true,
				message:e.message
			});
		}
	}

	
	/**
	* fetch users
	*/
	static async getUsers(req, res){
		try{
			// fetch data
	    	User.findAll({
	    		attributes:['name_prefix', 'first_name', 'last_name', 'username', 'date_of_birth'],
	    		order:[
	    			['id', 'DESC']
	    		]
	    	})
	    	.then(records=>{
	    		let data =  [...records];
	    		return res.status(200).json({
	    			error:false,
	    			data:data
	    		});
	    	})
	    	.catch(err=>{
	    		return res.status(203).json({
	    			error:true,
	    			message:err.message
	    		})
	    	});
		}catch(e){
			return res.status(500).json({
				error:true,
				message:e.message
			});
		}
	}

	/**
	* delete user
	*/
	static async deleteUser(req, res){
		try{
			// validate user
			let checkUser  = await callbacks.findOne(User,{username:req.params.username});

			if(checkUser == null){
				return res.status(203).json({
	    			error:true,
	    			message:"Failed to delete user. Record not found"
	    		});
			}
			// delete data
	    	User.destroy({
	    		where:{
	    			username:req.params.username
	    		}
	    	})
	    	.then(deleted=>{
	    		if(deleted){

		    		return res.status(200).json({
		    			error:false,
		    			message:"You deleted the user successfully."
		    		});
	    		}else{
	    			return res.status(203).json({
		    			error:true,
		    			message:"Failed to delete user."
		    		});
	    		}
	    	})
	    	.catch(err=>{
	    		return res.status(203).json({
	    			error:true,
	    			message:err.message
	    		})
	    	});
		}catch(e){
			return res.status(500).json({
				error:true,
				message:e.message
			});
		}
	}		


}

module.exports =  UserController;
