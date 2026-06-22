let nutritionChart;

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("calculateHealthBtn")
        .addEventListener("click", calculateHealth);

});

function calculateHealth() {

    const age =
        Number(document.getElementById("age").value);

    const height =
        Number(document.getElementById("height").value);

    const weight =
        Number(document.getElementById("weight").value);

    const gender =
        document.getElementById("gender").value;

    const goal =
        document.getElementById("goal").value;

    const gym =
        document.getElementById("gym").value;

    const targetWeight =
        Number(document.getElementById("targetWeight").value);

    const sleepHours =
        Number(document.getElementById("sleepHours").value);

    const workoutDays =
        Number(document.getElementById("workoutDays").value);

    const foodPreference =
        document.getElementById("foodPreference").value;

    const selectedExercises =
        Array.from(
            document.querySelectorAll(".exercise:checked")
        ).map(exercise => exercise.value);

    if (!height || !weight || !age || !gender) {

        alert("Please fill all required fields.");
        return;

    }

    // BMI

    const bmi =
        weight /
        ((height / 100) * (height / 100));

    document.getElementById("bmiResult")
        .textContent =
        bmi.toFixed(1);

    let bmiStatus = "";

    if (bmi < 18.5)
        bmiStatus = "Underweight";

    else if (bmi < 25)
        bmiStatus = "Normal Weight";

    else if (bmi < 30)
        bmiStatus = "Overweight";

    else
        bmiStatus = "Obese";

    document.getElementById("bmiStatus")
        .textContent =
        bmiStatus;

    // Ideal Weight

    const heightInMeters =
        height / 100;

    const idealMin =
        18.5 *
        heightInMeters *
        heightInMeters;

    const idealMax =
        24.9 *
        heightInMeters *
        heightInMeters;

    const recommendedWeight =
        (idealMin + idealMax) / 2;

    const idealWeightElement =
        document.getElementById("idealWeight");

    if (idealWeightElement) {

        idealWeightElement.innerHTML =
        `
        ${idealMin.toFixed(1)}kg -
        ${idealMax.toFixed(1)}kg
        <br>
        Recommended:
        ${recommendedWeight.toFixed(1)}kg
        `;
    }

    // BMR

    let bmr;

    if (gender === "male") {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) + 5;

    } else {

        bmr =
            (10 * weight) +
            (6.25 * height) -
            (5 * age) - 161;
    }

    document.getElementById("bmrResult")
        .textContent =
        Math.round(bmr) +
        " kcal/day";

    // Activity Factor

    let activityFactor = 1.2;

    const activityMap = {

        walking: 0.10,
        running: 0.20,
        aerobics: 0.15,
        yoga: 0.05,
        strength_training: 0.25,
        cycling: 0.15,
        swimming: 0.20,
        zumba: 0.15

    };

    selectedExercises.forEach(exercise => {

        activityFactor +=
            activityMap[exercise] || 0;

    });

    // Calories

    let calories =
        bmr * activityFactor;

    if (goal === "weight_loss")
        calories -= 400;

    if (goal === "weight_gain")
        calories += 400;

    if (goal === "muscle_gain")
        calories += 300;

    // Macronutrients

    const protein =
        weight * 2;

    const fat =
        weight * 0.9;

    const carbs =
        (
            calories -
            (
                (protein * 4) +
                (fat * 9)
            )
        ) / 4;

    document.getElementById(
        "recommendedCalories"
    ).textContent =
        Math.round(calories) +
        " kcal/day";

    document.getElementById(
        "recommendedProtein"
    ).textContent =
        Math.round(protein) +
        " g/day";

    document.getElementById(
        "recommendedCarbs"
    ).textContent =
        Math.round(carbs) +
        " g/day";

    document.getElementById(
        "recommendedFat"
    ).textContent =
        Math.round(fat) +
        " g/day";
            // Water Intake

    const water =
        (weight * 0.035).toFixed(1);

    document.getElementById("waterIntake")
        .textContent =
        water + " Litres/day";

    // Health Score

    let healthScore = 50;

    if (bmi >= 18.5 && bmi <= 24.9)
        healthScore += 20;

    if (gym === "yes")
        healthScore += 10;

    if (workoutDays >= 4)
        healthScore += 10;

    if (sleepHours >= 7 && sleepHours <= 9)
        healthScore += 10;

    document.getElementById("healthScore")
        .textContent =
        healthScore + "/100";

    // Diet Plan

    let dietPlan = "";

    if (foodPreference === "veg") {

        dietPlan = `
        <h3>🥗 Vegetarian Diet</h3>

        <h4>Breakfast</h4>
        <ul>
            <li>Oats - 60g</li>
            <li>Milk - 250ml</li>
            <li>Apple - 150g</li>
        </ul>

        <h4>Lunch</h4>
        <ul>
            <li>Rice - 150g</li>
            <li>Dal - 120g</li>
            <li>Vegetables - 200g</li>
        </ul>

        <h4>Snack</h4>
        <ul>
            <li>Mixed Nuts - 30g</li>
        </ul>

        <h4>Dinner</h4>
        <ul>
            <li>Paneer - 150g</li>
            <li>Roti - 2</li>
            <li>Salad - 150g</li>
        </ul>
        `;

    }

    else if (foodPreference === "eggetarian") {

        dietPlan = `
        <h3>🥚 Eggetarian Diet</h3>

        <ul>
            <li>Eggs - 3</li>
            <li>Oats - 60g</li>
            <li>Rice - 150g</li>
            <li>Dal - 120g</li>
            <li>Paneer - 150g</li>
        </ul>
        `;

    }

    else if (foodPreference === "nonveg") {

        dietPlan = `
        <h3>🍗 Non-Vegetarian Diet</h3>

        <ul>
            <li>Eggs - 4</li>
            <li>Chicken - 180g</li>
            <li>Rice - 180g</li>
            <li>Fish - 150g</li>
            <li>Salad - 150g</li>
        </ul>
        `;

    }

    else if (foodPreference === "vegan") {

        dietPlan = `
        <h3>🌱 Vegan Diet</h3>

        <ul>
            <li>Soy Milk - 250ml</li>
            <li>Oats - 60g</li>
            <li>Quinoa - 150g</li>
            <li>Beans - 120g</li>
            <li>Tofu - 180g</li>
        </ul>
        `;

    }

    else {

        dietPlan = `
        <h3>Balanced Diet</h3>

        <ul>
            <li>Protein Rich Foods</li>
            <li>Whole Grains</li>
            <li>Fresh Fruits</li>
            <li>Vegetables</li>
        </ul>
        `;
    }

    document.getElementById("dietPlan")
        .innerHTML =
        dietPlan;

    // Workout Plan

    let workoutPlan = "";

    if (gym === "yes") {

        workoutPlan = `
        <ul>
            <li>Monday - Chest</li>
            <li>Tuesday - Back</li>
            <li>Wednesday - Legs</li>
            <li>Thursday - Shoulders</li>
            <li>Friday - Arms</li>
            <li>Saturday - Cardio</li>
            <li>Sunday - Rest</li>
        </ul>
        `;

    }

    else {

        workoutPlan = `
        <ul>
            <li>30 Minutes Walking</li>
            <li>20 Squats</li>
            <li>15 Pushups</li>
            <li>10 Minutes Stretching</li>
            <li>15 Minutes Yoga</li>
        </ul>
        `;
    }

    document.getElementById("workoutPlan")
        .innerHTML =
        workoutPlan;
            // Lifestyle Tips

    let tips = "";

    if (sleepHours < 7)
        tips +=
        "<p>😴 Sleep at least 7-8 hours daily.</p>";

    if (selectedExercises.length === 0)
        tips +=
        "<p>🏃 Add some physical activity daily.</p>";

    if (bmi > 25)
        tips +=
        "<p>🥗 Focus on calorie deficit and cardio.</p>";

    if (Number(water) < 2.5)
        tips +=
        "<p>💧 Increase your water intake.</p>";

    tips +=
    `<p>💧 Recommended Water Intake:
    ${water} Litres/day</p>`;

    tips +=
    `<p>🎯 Maintain consistency with your fitness routine.</p>`;

    document.getElementById("lifestyleTips")
        .innerHTML =
        tips;

    // Progress Tracker

    let progressText = "";

    if (targetWeight > 0) {

        const difference =
            Math.abs(weight - targetWeight);

        if (weight > targetWeight) {

            progressText = `
            Current Weight: ${weight} kg
            <br>
            Target Weight: ${targetWeight} kg
            <br>
            Weight To Lose:
            ${difference.toFixed(1)} kg
            <br>
            Recommended Weight:
            ${recommendedWeight.toFixed(1)} kg
            `;

        }

        else {

            progressText = `
            Current Weight: ${weight} kg
            <br>
            Target Weight: ${targetWeight} kg
            <br>
            Weight To Gain:
            ${difference.toFixed(1)} kg
            <br>
            Recommended Weight:
            ${recommendedWeight.toFixed(1)} kg
            `;
        }

    }

    else {

        if (weight > recommendedWeight) {

            progressText = `
            Current Weight: ${weight} kg
            <br>
            Recommended Weight:
            ${recommendedWeight.toFixed(1)} kg
            <br>
            Suggested Loss:
            ${(weight - recommendedWeight).toFixed(1)} kg
            `;

        }

        else {

            progressText = `
            Current Weight: ${weight} kg
            <br>
            Recommended Weight:
            ${recommendedWeight.toFixed(1)} kg
            <br>
            Suggested Gain:
            ${(recommendedWeight - weight).toFixed(1)} kg
            `;
        }
    }

    document.getElementById("progressResult")
        .innerHTML =
        progressText;

    // Nutrition Chart

    const chartCanvas =
        document.getElementById("nutritionChart");

    if (
        chartCanvas &&
        typeof Chart !== "undefined"
    ) {

        if (nutritionChart)
            nutritionChart.destroy();

        nutritionChart =
            new Chart(chartCanvas, {

                type: "pie",

                data: {

                    labels: [
                        "Protein",
                        "Carbs",
                        "Fat"
                    ],

                    datasets: [{

                        data: [
                            Math.round(protein),
                            Math.round(carbs),
                            Math.round(fat)
                        ]
                    }]
                },

                options: {

                    responsive: true,

                    plugins: {

                        legend: {
                            position: "bottom"
                        }
                    }
                }
            });
            
    }
    // Save data to MongoDB

fetch("http://localhost:5000/api/users/save", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        age,
        height,
        weight,
        gender,
        goal,
        gym,
        targetWeight,
        sleepHours,
        workoutDays,
        foodPreference,
        exercises: selectedExercises,

        bmi: Number(bmi.toFixed(1)),
        calories: Math.round(calories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
        healthScore
    })
})
.then(response => response.json())
.then(data => {
    console.log("Saved Successfully:", data);
    alert("Health Plan Saved Successfully ✅");
})
.catch(error => {
    console.error("FULL ERROR:", error);

    if (error.message) {
        console.error("Message:", error.message);
    }

    alert("Failed to Save Data ❌");
});

}