async function loadReports() {
    try {

        const response = await fetch(
            "http://localhost:5000/api/users"
        );

        const reports = await response.json();

        const container =
            document.getElementById("reportsContainer");

        container.innerHTML = "";

        if (reports.length === 0) {

            container.innerHTML = `
                <h2>No Reports Found</h2>
            `;

            return;
        }

        reports.forEach(report => {

            container.innerHTML += `
                <div style="
                    border:1px solid #ddd;
                    padding:20px;
                    margin:15px;
                    border-radius:12px;
                    background:white;
                    box-shadow:0 2px 10px rgba(0,0,0,0.1);
                ">

                    <h2>📋 Health Report</h2>

                    <p><strong>Age:</strong> ${report.age}</p>

                    <p><strong>Height:</strong>
                    ${report.height} cm</p>

                    <p><strong>Weight:</strong>
                    ${report.weight} kg</p>

                    <p><strong>BMI:</strong>
                    ${report.bmi}</p>

                    <p><strong>Goal:</strong>
                    ${report.goal}</p>

                    <p><strong>Calories:</strong>
                    ${report.calories}</p>

                    <p><strong>Protein:</strong>
                    ${report.protein} g</p>

                    <p><strong>Carbs:</strong>
                    ${report.carbs} g</p>

                    <p><strong>Fat:</strong>
                    ${report.fat} g</p>

                    <p><strong>Health Score:</strong>
                    ${report.healthScore}/100</p>

                    <p><strong>Saved On:</strong>
                    ${new Date(
                        report.createdAt
                    ).toLocaleString()}</p>

                    <button
                        onclick="deleteReport('${report._id}')"
                        style="
                            background:#dc3545;
                            color:white;
                            border:none;
                            padding:10px 15px;
                            border-radius:6px;
                            cursor:pointer;
                            margin-top:10px;
                        "
                    >
                        🗑 Delete Report
                    </button>

                </div>
            `;
        });

    } catch (error) {

        console.error(error);

    }
}

async function deleteReport(id) {

    const confirmDelete =
        confirm("Delete this report?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `http://localhost:5000/api/users/${id}`,
            {
                method: "DELETE"
            }
        );

        const data =
            await response.json();

        alert(data.message);

        loadReports();

    } catch (error) {

        console.error(error);

        alert("Failed to Delete ❌");
    }
}

loadReports();