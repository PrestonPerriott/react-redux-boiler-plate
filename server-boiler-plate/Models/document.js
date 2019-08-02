'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DocumentSchema = mongoose.Schema({

    filename: {
        type: String,
        required: true
    },

    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    }, 

    docType: {
        type: String,
        required: true
    },

    ///likely going to bbe associated with just an email.
    ownedBy: { 
        type: String,
        require: true
    },

    isPublicDoc: {
        type: Boolean,
        required: true,
        default: false
    },

    comments: [
        {
         author: {  
            type: Schema.Types.ObjectId,
            ref: 'User' 
            }, 
         text: String
        }
    ],

    fileID: {
        type: String,
        required: true
    }
});

DocumentSchema.methods.comment = function (comment) {
    this.comment.push(comment);
    return this.save();
};

DocumentSchema.methods.changeName = function (newName) {
    this.filename = newName;
    return this.save();
};

DocumentSchema.methods.updatePublicity = function (val) {
    this.public = val;
    return this.save();
}

var Document = module.exports = mongoose.model('Document', DocumentSchema);