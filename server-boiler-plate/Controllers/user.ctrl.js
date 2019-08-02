'use strict';

///Add user model 
var bcrypt = require('bcryptjs');
const User = require('../Models/user');
const Auth = require('../Middleware/jwt-auth');
const inputValidation = require('../Middleware/inputValidation');

module.exports = {

    registerUser: async function (req, res, next) {
        const input = await inputValidation.validateRegistrationInput(req, res, next);
        var localError = new Error();
        var didFindUser = false;
        /// If we have validation errors send them, else, check if user already exists & set to var
        if (input.error != null ? res.send(input.error) : didFindUser = await doesUserExist(input.email));
        if (!didFindUser) {
            ///Register new user ##User will be given access to their profile later to update
            console.log('Attempting to save new user...');
            var user = new User({
                date: Date.now(),
                name: input.name,
                email: input.email,
                password: input.password
            });

            try {
                console.log('Saving new user...');
                const newUser = await User.saltAndSave(user);
                const token = await Auth.tokenize(newUser);
                newUser.accessToken = token;
                console.log("\n Our new user is : " + newUser);
                await newUser.save();
                const savedUser = await User.stripToJSON(newUser);
                console.log('\n' + newUser.name + ' has been successfully added to the DB');
                return (res.send(savedUser));
            } catch (err) {
                console.log('Error accessing the DB ' + err); ///TODO: handle error
                return ((res.send(err.message)));
            }
        } else {
            ///Existing user found handle error
            console.log('A user was found');
            localError.message = 'A user with those credentials already exists'
            return (res.send(localError.message));
        }
    },

    loginUser: async function (req, res, next) {
        let input = await inputValidation.validateLoginInput(req, res, next);
        console.log('Our input response is : ' + JSON.stringify(input));
        var localError = new Error();
        var didFindUser = false;
        if (input.error ? (res.send(input.error)) : didFindUser = await doesUserExist(input.email));
        if (!didFindUser) {
            ///If we couldn't find user through email, should redirect
            localError.message = 'Please register there is no existing user with those credentials';
            return (res.send(localError.message));
        } else {
            ///Existing user found try and match passwords
            console.log('A user was found that matches that email address');
            let existingEmailUser = await User.getUserFromEmail(input.email);
            let doesMatch = await User.comparePasswords(input.password, existingEmailUser.password);
            if (doesMatch) {
                console.log('The password entered matches what we have on file');
                let newOneDayToken = await Auth.tokenize(existingEmailUser);
                existingEmailUser.accessToken = newOneDayToken;
                await existingEmailUser.save();
                let returnedUser = await User.stripToJSON(existingEmailUser);
                return (res.send(returnedUser));
            } else {
                ///Passwords do not match
                console.log('The password entered does not match whats on file');
                localError.message = 'Password mismatch';
                return (res.send(localError.message));
            }
        }
    },

    logoutUser: async function (req, res, next) {
        console.log("TODO logout user")
    },

    getUser: async function (req, res, next) {

    },

    getProfile: async function (req, res, next) {
        ///Likely going to need input validation on client supplied profile values
        ///get local user from browser
        let currUser = req.user
        console.log('Our current user is: ' + currUser)

    }, 

    updateProfile: async function (req, res, next) {

    }
}

async function doesUserExist (email) {
    var existingEmailUser = null
    existingEmailUser = await User.getUserFromEmail(email)
    if (existingEmailUser != null ) {
        return true
    } 
    console.log('Could not find existing user')
    return false
}
