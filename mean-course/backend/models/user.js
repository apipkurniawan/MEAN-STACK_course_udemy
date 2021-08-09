const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// membuat schema/tabel
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);