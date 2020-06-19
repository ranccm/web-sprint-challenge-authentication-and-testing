const db = require("../database/dbConfig");

module.exports = {
    add,
    find,
    findById,
    findBy,
}

function find() {
    return db("users").select("id", "username").orderBy("id");
}

function findById(id) {
    return db("users").where({ id }).first();
}

function findBy(filter) {
    return db('users').where(filter).first()
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}