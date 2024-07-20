import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverimage: {
        type: String,
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: true,
        unique: true,
    },
    refreshToken: {
        type: String
    },

}, { timestamps: true });

userSchema.pre("save", function (next) {
    if (!this.isModified("password"))
        return next()
    this.password = bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.isCorrectPassword(async function (password) {
    return await bcrypt.compare(password, this.password);
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this.id,
        email: this.email,
        username: this.username
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this.id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User", userSchema);