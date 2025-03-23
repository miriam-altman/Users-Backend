import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyId?: string;   
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema: Schema<IUser> = new Schema(
    {
        _id: { type: String, required: false },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        companyId: { type: String, required: false },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
