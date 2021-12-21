const mongo = require('../database/mongodb');
const { ObjectId } = require("mongodb");
const { getUser } = require("../utils/token");

async function createContact(req, res) {
    const { name, email, phone, street, city, neighborhood, number, birthday, image } = req.body;

    const conn = await mongo.connection();
    const collection = await conn.collection('contacts');

    const userId = await getUser(req);

    if(!name || !email || !phone || !street || !city || !neighborhood || !number || !birthday) {
        return res.status(400).json({
            message: 'Preencha todos os campos'
        });
    }

    const contact = {
        name,
        email,
        phone,
        street,
        city,
        neighborhood,
        number,
        birthday,
        userId,
        image
    };

    await collection.insertOne(contact);

    res.status(201).json({
        message: 'Contact created',
        status: true
    });
}

async function getContacts(req, res) {
    try {
        const conn = await mongo.connection();
        const collection = await conn.collection('contacts');

        const userId = await getUser(req);

        const contacts = await collection.find({ userId }).toArray();

        res.status(200).json({
            message: 'Contacts found',
            status: true,
            data: contacts
        });
    } catch(err) {
        res.status(200).json({
            message: err,
            status: false
        });
    }
}

async function getContactById(req, res) {
    const conn = await mongo.connection();
    const collection = await conn.collection('contacts');

    const userId = await getUser(req);

    const contact = await collection.findOne({ _id: ObjectId(req.params.id), userId });

    if(!contact) {
        return res.status(404).json({
            message: 'Contact not found',
            status: false
        });
    }

    res.status(200).json({
        message: 'Contact found',
        status: true,
        data: contact
    });
}

async function deleteContact(req, res) {

    const conn = await mongo.connection();
    const collection = await conn.collection('contacts');

    const userId = await getUser(req);

    const contact = await collection.findOne({ _id: ObjectId(req.params.id), userId });

    if(!contact) {
        return res.status(404).json({
            message: 'Contact not found',
            status: false
        });
    }

    await collection.deleteOne({ _id: ObjectId(req.params.id) });

    res.status(200).json({
        message: 'Contact deleted',
        status: true
    });
}

async function updateContact(req, res) {
    const { name, email, phone, type, address } = req.body;

    const conn = await mongo.connection();
    const collection = await conn.collection('contacts');

    const userId = await getUser(req);

    const contact = await collection.findOne({ _id: ObjectId(req.params.id), userId });

    if(!contact) {
        return res.status(404).json({
            message: 'Contact not found',
            status: false
        });
    }

    const update = {
        name,
        email,
        phone,
        type,
        address
    };

    await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: update });

    res.status(200).json({
        message: 'Contact updated',
        status: true
    });
}

module.exports = { createContact, getContacts, getContactById, deleteContact, updateContact };

