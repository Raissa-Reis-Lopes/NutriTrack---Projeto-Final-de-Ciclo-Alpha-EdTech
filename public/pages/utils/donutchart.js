// export function generateDonutChart(title, totalValue, consumedValue, chartId, color, backgroundColor) {
//   const canvas = document.createElement("canvas");
//   canvas.width = 300;
//   canvas.height = 300;
  
//   const ctx = canvas.getContext('2d');

//   const chartInstance = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: ['Consumido', 'Restante'],
//       datasets: [{
//         label: title,
//         data: [consumedValue, totalValue - consumedValue],
//         backgroundColor: [
//           color,
//           backgroundColor
//         ],
//         borderColor: [
//           color,
//           backgroundColor
//         ],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         title: {
//           display: true,
//           text: title,
//           position: 'top'
//         },
//         legend: {
//           display: false,
//         }
//       }
//     }
//   });


//   // Retornar a instância do gráfico para armazenamento
//   return { chartInstance, canvas };
// }



export function generateDonutChart(title, totalValue, consumedValue, chartId, color, backgroundColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  
  const ctx = canvas.getContext('2d');

  let chartData = {};
  if (consumedValue >= totalValue) {
    // Se o valor consumido for igual ou maior que o total, exibir apenas o valor consumido
    chartData = {
      labels: ['Consumido'],
      datasets: [{
        label: title,
        data: [consumedValue],
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 1
      }]
    };
  } else {
    // Caso contrário, exibir tanto o valor consumido quanto o restante
    chartData = {
      labels: ['Consumido', 'Restante'],
      datasets: [{
        label: title,
        data: [consumedValue, totalValue - consumedValue],
        backgroundColor: [color, backgroundColor],
        borderColor: [color, backgroundColor],
        borderWidth: 1
      }]
    };
  }

  const chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
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

  // Retornar a instância do gráfico para armazenamento
  return { chartInstance, canvas };
}


export function updateCharts(chart, title, totalValue, consumedValue, color, backgroundColor) {
  chart.data.datasets[0].data = [consumedValue, totalValue - consumedValue];
  chart.data.datasets[0].backgroundColor = [color, backgroundColor];
  chart.data.datasets[0].borderColor = [color, backgroundColor];
  chart.options.plugins.title.text = title;
  chart.update();
}