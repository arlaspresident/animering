/**
 * Initierar diagrammen för kurser och program genom att hämta data från en extern källa,
 * filtrera och sortera datan och sedan skapa ett stapeldiagram för de mest sökta kurserna 
 * samt ett cirkeldiagram för de mest sökta programmen med chart.js.
 *
 * Data hämtas asynkront från en extern URL som förväntas returnera json data med objekt
 * som innehåller egenskaperna type, name, applicantsTotal osv
 *
 * @async
 * @function initCharts
 * @returns {Promise<void>} ett promise som löses när diagrammen har skapats.
 */
document.addEventListener("DOMContentLoaded", async () => {
    try {
        //länk till json
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json();

        //filtrera kurser och program
        const kurser = data.filter(item => item.type === "Kurs");
        const program = data.filter(item => item.type === "Program");

        //sortera efter flest totala sökande
        const topKurser = kurser
            .sort((a, b) => Number(b.applicantsTotal) - Number(a.applicantsTotal))
            .slice(0, 10);
        const topProgram = program
            .sort((a, b) => Number(b.applicantsTotal) - Number(a.applicantsTotal))
            .slice(0, 10);

        //färger till diagram
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF9800', '#8BC34A', '#00ACC1', '#795548', '#607D8B'];

        //kursdiagram
        new Chart(document.getElementById('kursChart'), {
            type: 'bar',
            data: {
                labels: topKurser.map(kurs => kurs.name),
                datasets: [{
                    label: 'Totalt antal sökande',
                    data: topKurser.map(kurs => kurs.applicantsTotal),
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        //programdiagram
        new Chart(document.getElementById('programChart'), {
            type: 'pie',
            data: {
                labels: topProgram.map(prog => prog.name),
                datasets: [{
                    label: 'Totalt antal sökande',
                    data: topProgram.map(prog => prog.applicantsTotal),
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

    } catch (error) {
        console.error("Fel vid hämtning av data:", error);
    }
});
