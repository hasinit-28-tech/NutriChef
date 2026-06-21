// Calculate BMI and Nutrition Goals

document.addEventListener("DOMContentLoaded", () => {

    const calculateHealthBtn = document.getElementById("calculateHealthBtn");

    if (calculateHealthBtn) {
        calculateHealthBtn.addEventListener("click", calculateHealth);
    }

    const calculateNutritionBtn = document.getElementById("calculateNutritionBtn");

    if (calculateNutritionBtn) {
        calculateNutritionBtn.addEventListener("click", calculateNutrition);
    }

});

function calculateHealth() {

    const height = Number(document.getElementById("height").value);
    const weight = Number(document.getElementById("weight").value);
    const goal = document.getElementById("goal").value;
    const activity = document.getElementById("exerciseType").value;

    if (!height || !weight) {
        alert("Please enter height and weight.");
        return;
    }

    // BMI Calculation
    const bmi = weight / Math.pow(height / 100, 2);

    document.getElementById("bmiResult").textContent =
        bmi.toFixed(1);

    let status = "";

    if (bmi < 18.5) {
        status = "Underweight";
    }
    else if (bmi < 25) {
        status = "Normal Weight";
    }
    else if (bmi < 30) {
        status = "Overweight";
    }
    else {
        status = "Obese";
    }

    document.getElementById("bmiStatus").textContent =
        status;

    // Daily Calories
    let calories = weight * 24;

    switch (activity) {

        case "walking":
            calories *= 1.3;
            break;

        case "running":
            calories *= 1.5;
            break;

        case "aerobics":
            calories *= 1.55;
            break;

        case "strength_training":
            calories *= 1.7;
            break;

        default:
            calories *= 1.2;
    }

    // Goal Adjustment

    if (goal === "weight_loss") {
        calories -= 400;
    }

    if (goal === "weight_gain") {
        calories += 400;
    }

    if (goal === "muscle_gain") {
        calories += 300;
    }

    const protein = weight * 2;
    const fat = weight * 0.9;

    const carbs =
        (calories - (protein * 4 + fat * 9)) / 4;

    document.getElementById("recommendedCalories").textContent =
        Math.round(calories) + " kcal/day";

    document.getElementById("recommendedProtein").textContent =
        Math.round(protein) + " g/day";

    document.getElementById("recommendedCarbs").textContent =
        Math.round(carbs) + " g/day";

    document.getElementById("recommendedFat").textContent =
        Math.round(fat) + " g/day";
}

function calculateNutrition() {

    // Temporary demo values
    // Later replace with Nutrition API

    const calories =
        Math.floor(Math.random() * 500) + 200;

    const protein =
        Math.floor(Math.random() * 40) + 10;

    const carbs =
        Math.floor(Math.random() * 80) + 20;

    const fat =
        Math.floor(Math.random() * 30) + 5;

    document.getElementById("calories").textContent =
        calories;

    document.getElementById("protein").textContent =
        protein + " g";

    document.getElementById("carbs").textContent =
        carbs + " g";

    document.getElementById("fat").textContent =
        fat + " g";
}