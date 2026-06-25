const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    age: Number,
    height: Number,
    weight: Number,
    gender: String,
    goal: String,
    gym: String,
    targetWeight: Number,
    sleepHours: Number,
    workoutDays: Number,
    foodPreference: String,
    exercises: [String],

    bmi: Number,
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    healthScore: Number

}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);