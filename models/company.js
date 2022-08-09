import mongoose from 'mongoose';
import { connectToDatabase } from 'lib/mongoose';
import User from './user';

/* employeeSize::Employee size map
  1. xs: Less than 10
  2. sm: 11-50
  3. md: 51-100
  4. lg: 101-1000
  5. xl: More than 1000
*/

/* role::Access-control policy
  2. manager: All access
*/

/** @type {import('mongoose').Connection} */
let mirrageDB = await connectToDatabase();
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employeeSize: {
    type: String,
    enum: ['xs', 'sm', 'md', 'lg', 'xl']
  },
  apiKey: {
    type: String,
    required: true,
    unique: true
  },
  apiSecret: {
    type: String,
    required: true
  },
  // Onboarding is complete if company exists in DB and has 
  // selected a plan.
  isOnboardingComplete: {
    type: Boolean,
    default: false,
    required: true
  },
  team: [{
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
      unique: true
    },
    isAdmin: Boolean,
    role: {
      type: String,
      enum: ['manager', 'member']
    },
    position: String
  }],
  invited: [{
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['manager', 'member']
    }
  }]
  // subscription_id: String,
  // payments: [{
  // 	timestamp: { type: Date, default: Date.now(), required: true },
  // 	paymentId: { type: String, required: true },
  // 	razorpaySignature: { type: String, required: true }
  // }]
});

export default mongoose.models.company || mirrageDB.model('company', companySchema, 'company');
