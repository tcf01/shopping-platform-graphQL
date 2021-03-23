require('dotenv').config()
require('../db/connection'); //呢個file要落左先可以連到mongoDB

const path = require('path')
const jwt = require('jsonwebtoken');
const { GraphQLServer } = require('graphql-yoga');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const { FRONTEND_WEB_DOMAIN } = require('./utils/constants');


const options = {
    port: 5000,
    endpoint: '/graphql',
    cors: {
        credentials: true,
        origin: FRONTEND_WEB_DOMAIN // your frontend url.
    }
};
const SECRET = "createaverystrongsec34!retthatalsoincludes2423412wdsa324e34e";


const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'schema.graphql'),
    upload: {
    },
    resolvers: {
        Query,
        Mutation,
    },
    context: async ({ req }) => {
        const token = req && await req.headers["authentication"];
        let user;

        try {
            user = await jwt.verify(token, SECRET);
            console.log(`${user.user} user`);
        } catch (error) {
            console.log(`${error.message} caught`);
        }
        // resolvers can get these param
        return {
            req,
            user,
            SECRET
        };
    }
});

server.start(options, ({ port }) =>
    console.log(`server started on port ${port}.`)
);