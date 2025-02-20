document.addEventListener("DOMContentLoaded", async () => {
    try {
        //länk till json
        const response = await fetch('/statistik_sokande_ht24.json');
        const data = await response.json();

        //filtrera kurser och program
        const kurser = data.filter(item => item.type === "Kurs");
        const program = data.filter(item => item.type === "Program");

        //sortera efter flest totala sökande
        const topKurser = kurser.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 10);
        const topProgram = program.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, 10);

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
