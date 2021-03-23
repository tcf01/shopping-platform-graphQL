const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    //product就係一個foreign key，ref to Product
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Review", ReviewSchema);