import mongoose from 'mongoose';

import TransactionModel from './TransactionModel.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION;
db.TransactionModel = TransactionModel(mongoose);

export { db };