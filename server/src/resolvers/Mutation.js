const { processUpload } = require('../utils/uploadFiles');

const { User, Review, Product } = require('../../model')
const { getMessage } = require('../utils/functions');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const stripe = require('../externalService/stripePayment/stripe.js');


const createStripeCustomer = async (user, stripeToken) => {

  const customer = await stripe.stripe.customers.create({
    email: user.email,
    description: `userId: ${user.userId}`,
    source: stripeToken
  })

  return customer;
}

const Mutation = {
  //example of adding subscription
  /* updateUser(_, args, ctx) {
      const { id } = args
      const { users, pubsub } = ctx;


      const targetUser = users.find((user) => id === user.id)

      if (!targetUser) {
          throw new Error(`no used with id - ${id}`)
      }


      for (const [key, value] of Object.entries(args)) {
          if (args.hasOwnProperty(key)) {
              if (value) {
                  targetUser[key] = value;
              }
          }
      }

      pubsub.publish('update_user', {
          update: targetUser
      })

      return targetUser;
  }, */

  async payWithCreditCardStripe(root, args) {
    try {

      const { userId, stripeToken, checkoutProduct } = args
      const targetProducts = checkoutProduct.reduce((acc, elem) => {
        acc.push(elem.name)
        return acc;
      }, [])

      const user = await User.findOne({ _id: userId })
      const products = await Product.aggregate([{
        $match: {
          name: new RegExp(`${targetProducts.join('|')}`, 'g')  //  /name1|name2|name3/
        }
      }])

      if (!user) {
        throw new Error('no such user');
      }

      // const isCustomerFirstPurchase = await stripe.stripe.customers.retrieve(user.stripeId)

      // if (isCustomerFirstPurchase) {
      const customer = await createStripeCustomer(user, stripeToken)

      user.stripeId = customer.id
      await user.save();

      return user;
      // }

      // throw new Error('save to stripe failed, please check the error log')

    } catch (e) {
      console.log(e)
    }
  },

  async register(root, args) {

    try {
      let registerData = args.registerData
      let user = new User({
        ...registerData,
        password: await bcrypt.hash(registerData.password, 12)
      })

      return user.save()
    } catch (error) {
      const message = error.message;

      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while registering user. Try again later.');
      }
    }
  },

  async login(root, { username, password, role }, ctx) {
    const { SECRET } = ctx
    const user = (await User.find({ username, role }))[0]

    if (!user) {
      throw new Error('Incorrect username or password')
    }

    //compare password from the arguments
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Incorrect username or password')
    }

    // create the token return to the user for sign in 
    const token = await jwt.sign(
      {
        payload: { username, role, email: user.email, userId: user.id },
      },
      SECRET,
      { expiresIn: '1d' }
    )

    const userInfo = { ...user.toObject(), role }

    return {
      userInfo,
      token
    }
  },

  async addProduct(parent, args) {
    try {
      const { name, description, price, userId, files, category } = args.data;
      const skuId = shortid.generate()

      // const images = await processUpload(await files)
      const owner = await User.findById(userId);
      const product = await Product.findOne({ skuId });

      if (product !== null) {
        throw new Error(`product ${skuId} exists, please try again later`)
      } else {
        const newProduct = new Product({
          skuId,
          name,
          description,
          price,
          category,
          user: owner._id,
          images: files
        });

        await newProduct.save();

        return newProduct;
      }
    } catch (error) {
      console.log(error)
      const message = error.message;

      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while adding product. Try again later.');
      }
    }
  },


  async editProduct(parent, args) {
    try {
      const { skuId, name, description, price, files, category } = args.data;
      let product = await Product.find({ skuId });

      if (product.length === 0) {
        throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
      }


      product = await Product.findOneAndUpdate(
        { skuId },
        {
          name,
          description,
          price,
          files,
          category
        },
        {
          new: true
        }
      );

      return product;
    } catch (error) {
      const message = error.message;
      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while editing product. Try again later.');
      }
    }
  },


  async deleteProduct(parent, args, ctx, info) {
    try {
      const { skuId } = args;
      const product = await Product.findOneAndDelete({ skuId });

      if (!product) {
        throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
      }

      await Review.deleteMany({ product: product._id });

      return product;
    } catch (error) {
      const message = error.message;

      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while deleting product. Try again later.');
      }
    }
  },

  async addReview(parent, args, ctx, info) {
    try {
      const { skuId } = args;
      const { title, comment } = args.data;
      const product = await Product.findOne({ skuId });

      if (!product) {
        throw new Error(`Message:Product with skuId ${skuId} does not exist.`);
      }

      const review = new Review({
        title,
        comment,
        product: product._id
      });

      await review.save();

      return review;
    } catch (error) {
      const message = error.message;
      if (message.startsWith('Message')) {
        throw new Error(getMessage(message));
      } else {
        throw new Error('Error while adding review. Try again later.');
      }
    }
  },

  async deleteReview(parent, args, ctx, info) {
    const { reviewId } = args;

    try {
      await Review.findByIdAndDelete(reviewId);
      return true;
    } catch (error) {
      throw new Error('Error while deleting review. Try again later.');
    }
  }
}

module.exports = Mutation;