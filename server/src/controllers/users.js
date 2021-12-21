const mongo = require('../database/mongodb');
const { getUser } = require('../utils/token');
const {ObjectId} = require("mongodb");

async function getUserInfos(req, res) {

    const userId = await getUser(req);

    const conn = await mongo.connection();
    const collection = await conn.collection('users');

    const user = await collection.findOne({ _id: ObjectId(userId) })

    return res.status(200).json(user);

}

module.exports = {
    getUserInfos
}