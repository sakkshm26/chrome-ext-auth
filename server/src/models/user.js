import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    openai_api_key: { type: String },
    requests_remaining: { type: Number, default: 50 },
    tier: { type: String, enum : ['FREE', 'PAID'], default: 'FREE' }
})

const User = mongoose.model("User", userSchema);

export default User;