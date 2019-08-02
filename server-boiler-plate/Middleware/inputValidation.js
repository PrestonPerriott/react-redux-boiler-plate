'use strict';
const { check, validationResult } = require('express-validator');

module.exports = {

    ///Returns either an error or the name, email and password provided
    validateRegistrationInput: async function (req, res, next)  {
        var validationErrors;
        var localError = new Error();
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        console.log('Our registration name & email were mapped to: ' + name, email);
        console.log('Attempting to validate registration input...');

        ///Pass name, email and password to internal validation functions
        if (isName(name) && isEmail(email) && isPassword(password)) {
            ///Check for client side validation errors
            validationErrors = validationResult(req);
            return (validationErrors.isEmpty ? {name: name, email: email, password: password} : await handleValidationErrors(validationErrors));
        } else { 
            /// if either name, email or password input didn't pass internal validation functions
            if (!isName(name)) {
                localError.message += 'Invalid Name ';
            } else if (!isEmail(email)) {
                localError.message += 'Invalid Email ';
            } else if (!isPassword(password)) {
                localError.message += 'Invalid Password ';
            }

            console.log('the message from error is: ' + localError.message);
            return (({error: localError.message}));
        }
    },

    validateLoginInput: async function (req, res, next) {
        var validationErrors;
        var localError = new Error();
        const email = req.body.email;
        const password = req.body.password;

        console.log('Attempting to validate login input...');
        ///Checkbody is a function of req that checks for valid email addresses
        if (isEmail(email) && isPassword(password)) {
            validationErrors = validationResult(req);
            return (validationErrors.isEmpty ? {email: email, password: password} : await handleValidationErrors(validationErrors));
        } else {
            ///Error with either email or password input
            ///input didn't pass
            if (!isEmail(email)) {
                localError.message += 'Invalid Email ';
            } else if (!isPassword(password)) {
                localError.message += 'Invalid Password ';
            }

            console.log('the message from error is: ' + localError.message);
            return (({error: localError.message}));
        }
    },

    validateProfileInput: async function(req, res, next) {
        var validationErrors
        var localError = new Error()
        const {email, password, organization, name} = req.body
        console.log('Unfinished route, validateProfileInput')
        ///TODO: Finish Profile Input validation after logout
    }
};

async function handleValidationErrors (errors) {
    var genError = new Error();
    console.log('Found Validation errors');
    for (var err in errors) {
        const msg = errors[err].msg;
        genError += ' ' + msg;
    }
    console.log("Internal validation errors: " + JSON.stringify(errors));
    return (genError);
}

function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isName(name) {
    /// At least 3 letters, but no more than 25.
    /// All alphabetical characters & spaces.
    var re = /^[A-Za-z ]{3,25}$/;
    return re.test(String(name));
}

function isPassword(password) {
    // at least one number, one lowercase and one uppercase letter
    // at least eight characters that are letters, numbers or the underscore
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
    return re.test(String(password));
}