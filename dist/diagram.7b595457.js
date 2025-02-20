document.addEventListener("DOMContentLoaded", async ()=>{
    try {
        //länk till json
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
        const data = await response.json();
        //filtrera kurser och program
        const kurser = data.filter((item)=>item.type === "Kurs");
        const program = data.filter((item)=>item.type === "Program");
        //sortera efter flest totala sökande
        const topKurser = kurser.sort((a, b)=>Number(b.applicantsTotal) - Number(a.applicantsTotal)).slice(0, 10);
        const topProgram = program.sort((a, b)=>Number(b.applicantsTotal) - Number(a.applicantsTotal)).slice(0, 10);
        //färger till diagram
        const colors = [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4CAF50',
            '#9C27B0',
            '#FF9800',
            '#8BC34A',
            '#00ACC1',
            '#795548',
            '#607D8B'
        ];
        //kursdiagram
        new Chart(document.getElementById('kursChart'), {
            type: 'bar',
            data: {
                labels: topKurser.map((kurs)=>kurs.name),
                datasets: [
                    {
                        label: "Totalt antal s\xf6kande",
                        data: topKurser.map((kurs)=>kurs.applicantsTotal),
                        backgroundColor: colors
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        //programdiagram
        new Chart(document.getElementById('programChart'), {
            type: 'pie',
            data: {
                labels: topProgram.map((prog)=>prog.name),
                datasets: [
                    {
                        label: "Totalt antal s\xf6kande",
                        data: topProgram.map((prog)=>prog.applicantsTotal),
                        backgroundColor: colors
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Fel vid h\xe4mtning av data:", error);
    }
});

//# sourceMappingURL=diagram.7b595457.js.map
