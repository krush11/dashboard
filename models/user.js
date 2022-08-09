import mongoose from 'mongoose';
import { connectToDatabase } from 'lib/mongoose';
import Company from 'models/company';

/** @type {import('mongoose').Connection} */
let mirrageDB = await connectToDatabase();
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	company: {
		type: mongoose.Types.ObjectId,
		ref: 'company'
	}
});

export default mongoose.models.user || mirrageDB.model('user', userSchema, 'user') ;
