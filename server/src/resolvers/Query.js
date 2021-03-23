const Product = require("../../model/Product");
const Review = require("../../model/Review")
const User = require("../../model/User");
const mongoose = require('mongoose')
const _ = require('lodash');
const { getMessage } = require('../utils/functions');
const jwt = require('jsonwebtoken')


const handleAggregationCriteria = (argsFromFn) => {
    const aggregateStage = []
    const { filter, category, userId } = argsFromFn;


    if (category && userId) {
        aggregateStage.push({
            $match: {
                user: new mongoose.Types.ObjectId(userId),
                category: new RegExp(`${category ? category : '.*'}`, 'i')
            }
        })
    }

    if (filter) {
        aggregateStage.push({
            $sort: filter
        })
    }

    // aggregateStage.push({
    //     $group: {
    //         category
    //     }
    // })


    return aggregateStage;
}


const Query = {
    async getAllProducts() {
        const stage = [
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user',
                    'foreignField': '_id',
                    'as': 'user'
                }
            }, {
                '$unwind': {
                    'path': '$user'
                }
            }, {
                '$project': {
                    "user.role": 0,
                    "user.password": 0
                }
            }
        ]

        try {
            const products = await Product.aggregate(stage);
            const orderedProducts = _.orderBy(products, ['updatedAt', 'desc'])

            return orderedProducts;
        } catch (e) {
            throw new Error(e)
        }
    },

    async getProductsByUser(root, args) {
        try {
            const aggregateCriteria = handleAggregationCriteria(args)

            const products = await Product.aggregate(aggregateCriteria)
            const uniqueCategory = await Product.distinct("category")

            return {
                products,
                extraInfo: {
                    category: uniqueCategory
                }
            };
        } catch (e) {
            console.log(e);
            throw new Error('Error while getting list of products.')
        }
    },

    async specificProduct(root, args) {
        try {
            const { skuId } = args;
            const product = await Product.findOne({ skuId })

            return product;
        } catch (e) {
            throw new Error('Error while getting specific product');
        }
    },

    async authenticateUserLogin(parent, args) {
        try {
            const { token } = args
            const { payload: { username, role, email, userId } } = jwt.decode(token, { json: true });

            return {
                username, role, email, _id: userId
            };
        } catch (error) {
            throw new Error('Error while authenticate login.')
        }
    },

    async user(parent, args) {
        try {
            const { username, password } = args

            const targetUser = await User.findOne(
                { username, password }, (err, obj) => console.log('shd', obj)
            )


            if (!targetUser) {
                return new Error('please check your username or password')
            }

            return targetUser;
        } catch (e) {
            throw new Error('Error while getting list of users.')
        }
    },

    async reviews(parent, args, ctx, info) {
        try {
            const { skuId } = args;
            const product = await Product.findOne({ skuId });

            if (!product) {
                throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
            }

            let reviews = await Review.find({
                product: product._id
            });

            reviews = _.orderBy(reviews, ['updatedAt'], ['desc']);

            return reviews;
        } catch (error) {
            const message = error.message;
            if (message.startsWith('Message')) {
                throw new Error(getMessage(message));
            } else {
                throw new Error('Error while getting reviews. Try again later.');
            }
        }
    }
}

module.exports = Query;
