fetch('http://localhost:7000/stats/average')
    .then(response => response.json())
    .then(jsonData => {
        console.log("Respuesta del servidor:", jsonData);

        document.getElementById('box_graph').classList.add('visible');

        const labels = jsonData.name;
        const cantidades = jsonData.amount;
        const ingresos = jsonData.price.map((p, i) => p * jsonData.amount[i]);

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Cantidad vendida',
                        data: cantidades,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Ingreso total ($)',
                        data: ingresos,
                        backgroundColor: 'rgba(255, 159, 64, 0.5)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error cargando datos:', error));
