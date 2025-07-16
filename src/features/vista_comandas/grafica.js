let graph = document.getElementById("graph");

graph.addEventListener("click", () => {
    // La corrección está aquí: el ID debe coincidir con el del HTML ('myChart')
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['tacos', 'champala', 'bolillo', 'cheve', 'pizza', 'pollito'],
            datasets: [{
                label: 'Productos mas comprados',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});