import { Schema, model, models } from 'mongoose';

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true },
});

let User = models.User || model('User', userSchema);

export default User;
