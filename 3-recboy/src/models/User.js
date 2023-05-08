import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    data: {
        closingDay: {
            date: { type: String },
            values: [
                { name: { type: String, uppercase: true }, value: Number },
            ],
            total: { type: Number },
        },
        closingWeek: {
            values: [
                {
                    date: { type: String },
                    values: [
                        {
                            name: { type: String, uppercase: true },
                            value: Number,
                        },
                    ],
                    total: { type: Number },
                },
            ],
            total: { type: Number },
        },
        closingAggregate: {
            values: [
                {
                    values: [
                        {
                            date: { type: String },
                            values: [
                                {
                                    name: { type: String, uppercase: true },
                                    value: Number,
                                },
                            ],
                            total: { type: Number },
                        },
                    ],
                    total: { type: Number },
                },
            ],
            total: { type: Number },
        },
    },
});

const User = models.User || model('User', userSchema);

export default User;
