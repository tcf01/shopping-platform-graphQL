const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        skuId: String,
        image: [
            {
                isMain: Boolean,
                data: mongoose.Schema.Types.Buffer,
                contentType: String
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Image', imageSchema)