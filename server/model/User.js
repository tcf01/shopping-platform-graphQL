const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: [String],
        required: true
    },
    stripeId: {
        type: String,
        require: true
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    isActive: {
        type: Boolean,
        require: true
    }
},
    {
        timestamps: true
    }
);


module.exports = mongoose.model("User", UserSchema);
