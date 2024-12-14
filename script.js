// fetch and display student data
async function fetchStudentData() {
    const apiUrl = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        const records = data.results;

        // Sort data by year, semester, and nationality
        const semesterOrder = {
            "First Semester": 1,
            "Second Semester": 2,
            "Summer Semester": 3,
        };
        const nationalityOrder = {
            Bahraini: 1,
            "GCC National": 2,
            Other: 3,
        };

        records.sort((a, b) => {
            const yearA = parseInt(a.year.split("-")[0]);
            const yearB = parseInt(b.year.split("-")[0]);
            if (yearA !== yearB) return yearA - yearB;

            const semesterA = semesterOrder[a.semester] || 99;
            const semesterB = semesterOrder[b.semester] || 99;
            if (semesterA !== semesterB) return semesterA - semesterB;

            const nationalityA = nationalityOrder[a.nationality] || 99;
            const nationalityB = nationalityOrder[b.nationality] || 99;
            return nationalityA - nationalityB;
        });

        const tableBody = document.getElementById("data-table");
        tableBody.innerHTML = ""; // Clear any existing data

        records.forEach(record => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${record.year || "N/A"}</td>
                <td>${record.semester || "N/A"}</td>
                <td>${record.the_programs || "N/A"}</td>
                <td>${record.nationality || "N/A"}</td>
                <td>${record.colleges || "N/A"}</td>
                <td>${record.number_of_students || "N/A"}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Unable to fetch data. Please try again later.");
    }
}

// Call the function to fetch and display student data
fetchStudentData();