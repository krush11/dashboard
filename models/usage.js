import mongoose from 'mongoose';
import { connectToDatabase } from 'lib/mongoose';

/** @type {import('mongoose').Connection} */
let mirrageDB = await connectToDatabase();
const UsageSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	tryon: {
		type: Array,
		default: new Array(60).fill(0)
	},
	humanSegmentation: {
		type: Array,
		default: new Array(60).fill(0)
	},
	designSegmentation: {
		type: Array,
		default: new Array(60).fill(0)
	},
	interpolation: {
		type: Array,
		default: new Array(60).fill(0)
	}
});

export default mongoose.models.usage || mirrageDB.model('usage', UsageSchema, 'usage');
