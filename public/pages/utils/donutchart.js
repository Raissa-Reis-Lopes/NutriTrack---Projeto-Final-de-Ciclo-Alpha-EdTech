export function generateDonutChart(title, totalValue, consumedValue, chartId, color, backgroundColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  
  const ctx = canvas.getContext('2d');

  const chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Consumido', 'Restante'],
      datasets: [{
        label: title,
        data: [consumedValue, totalValue - consumedValue],
        backgroundColor: [
          color,
          backgroundColor
        ],
        borderColor: [
          color,
          backgroundColor
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
          position: 'top'
        },
        legend: {
          display: false,
        }
      }
    }
  });

  console.log(`Esse é o totalValue na função do donut ${totalValue}`)
  console.log(`Esse é o consumedValue na função do donut ${consumedValue}`)

  // Retornar a instância do gráfico para armazenamento
  return { chartInstance, canvas };

  //   // Armazenar a instância do gráfico para atualizações futuras
  //   if (title === 'Proteína') proteinChartInstance = chartInstance;
  //   if (title === 'Carboidrato') carboChartInstance = chartInstance;
  //   if (title === 'Gordura') lipidChartInstance = chartInstance;
  
  // const chartContainer = document.getElementById(chartId);
  // chartContainer.appendChild(canvas);
}

export function updateCharts(chart, title, totalValue, consumedValue, color, backgroundColor) {
  chart.data.datasets[0].data = [consumedValue, totalValue - consumedValue];
  chart.data.datasets[0].backgroundColor = [color, backgroundColor];
  chart.data.datasets[0].borderColor = [color, backgroundColor];
  chart.options.plugins.title.text = title;
  chart.update();
}