const mongo = require('../database/mongodb');
const jwt = require('jsonwebtoken');

async function login(req, res) {

    const conn = await mongo.connection();
    const collection = await conn.collection('users');

    const {email, password} = req.body;
    const user = await collection.findOne({email});
    if (!user) {
        return res.status(200).json({
            message: 'User not found',
            status: false
        });
    }
    if (user.password !== password) {
        return res.status(200).json({
            message: 'Invalid password',
            status: false
        });
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
    }, 'omeusegredoe...', {
        expiresIn: '1d',
    });

    return res.status(200).json({
        message: 'Login successful',
        status: true,
        token
    })
}

async function register(req, res) {

    const conn = await mongo.connection();
    const collection = await conn.collection('users');

    const {email, password, name} = req.body;
    const user = await collection.findOne('users', {email});
    if (user) {
        return res.status(401).json({
            message: 'User already exists',
        });
    }

    const newUser = await collection.insertOne('users', {
        email,
        name,
        password,
    });

    const token = jwt.sign({
        id: newUser._id,
        email: newUser.email,
    }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return res.status(200).json({
        message: 'Registration successful',
        status: true,
        user: newUser,
        token
    });
}

module.exports = {
    login,
    register,
};