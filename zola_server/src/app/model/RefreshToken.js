const mongoose = require('mongoose')

const RefreshToken = new mongoose.Schema({
    token: {type: String}
}, {
    timestamps: true
})


module.exports = mongoose.model('RefreshToken', RefreshToken)