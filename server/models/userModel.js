import dbConnect from '../config/db-config.js';

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        })
    })
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM user WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        })
    })
}

// CREATE
const createNew = (user) => {
    const { email, password, is_admin } = user;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO user (email, password, is_admin) VALUES (?, ?, ?)',
        [email, password, is_admin], (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        });
    });
};

export default { findByEmail, createNew, findById };