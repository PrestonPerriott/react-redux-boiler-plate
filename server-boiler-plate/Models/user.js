'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


var UserSchema = mongoose.Schema ({

    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    comments: [{
        type: String,
    }], 
    uploadedDocs: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }],
    likedDocs: [{
        type: Schema.Types.ObjectId,
        ref: 'Document'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    accessToken: {
        type: String,
        default: ''
    },
    organization: {
        type: String,
        default: ''
    }
});

///statics vs methods: statics can be invoked by model
///methods are instance methods
UserSchema.methods.updateName = function (newName) {
    this.name = newName
    return this.save()
}

UserSchema.methods.updateEmail = function (newEmail) {
    this.email = newEmail
    return this.save()
}

UserSchema.methods.updatePassword = function (newPass) {
    ///TODO: Going to have to rehash
    this.password = newPass
    return this.save()
}

UserSchema.methods.updateCompnay = function (newOrg) {
    this.organization = newOrg
    return this.save()
}

UserSchema.methods.updateToken = async function (token) {
    this.accessToken = token
    return this.save()
}

UserSchema.statics.getUserFromEmail = async function (email) {
    var search = {email : email}
    var foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.getUserFromName = async function (name) {
    var search = {name : name}
    var foundUser = null
    foundUser = await User.findOne(search)
    return foundUser
}

UserSchema.statics.getUserFromID = async function (id) {
    ///Make sure to cast id as ObjectID
    let objID = mongoose.Types.ObjectId(id)
    var search = {_id: objID}
    var user = null
    user = await User.findById(search)
    return user
} 

UserSchema.statics.comparePasswords = async function (candidatePassword, password) {
    ///Gonna utilize bcrypt for hashing/dehashing -> Should look into limitations of bcrypt
    let comparison = await bcrypt.compare(candidatePassword, password)
    return comparison ///Will return true or false in promise form
}

UserSchema.statics.saltAndSave = async function (user) {
    let encrypt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(user.password, encrypt)
    user.password = hash
    let newUser = await user.save()
    return newUser
}

UserSchema.methods.follow = async function (user_id) {
    if (this.following.indexOf(user_id) === -1 ) { ///indeof method returns the first index at which a given element can be found in the array
        this.following.push(user_id)
    }
    return this.save()
}

UserSchema.methods.addFollower = async function (follower) {
    this.followers.push(follower)
}

UserSchema.statics.stripToJSON = async function (user) {
    var obj = user.toObject()
    await delete obj['password']
    return obj
}

var User = module.exports = mongoose.model('User', UserSchema)
