
export function generateBarChart(dias){
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  
  const ctx = canvas.getContext('2d');
  
  let labels = dias.map(dia => dia.data);
  let dados = {
      calorias: dias.map(dia => dia.calorias),
      gordura: dias.map(dia => dia.gordura),
      proteina: dias.map(dia => dia.proteina),
      carboidrato: dias.map(dia => dia.carboidrato)
  };
  
  let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
          datasets: [
              {
                label: 'Calorias',
                backgroundColor: '#FDFD96',
                borderColor: '#C8CA66',
                borderWidth: 1,
                data: dados.calorias
              },
              {
                  label: 'Gordura',
                  backgroundColor: '#D9D8F7',
                  borderColor: '#1E1BFF',
                  borderWidth: 1,
                  data: dados.gordura
                },
              {
                  label: 'Proteína',
                  backgroundColor: '#F5D8C4',
                  borderColor: '#E96001',
                  borderWidth: 1,
                  data: dados.proteina
                },
                {
                  label: 'Carboidrato',
                  backgroundColor: '#FACFF6',
                  borderColor: '#FF0DE5',
                  borderWidth: 1,
                  data: dados.carboidrato
                }
              ]
            },
      options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
      }
    });
    const chartContainer = document.getElementById("week-chart");
    chartContainer.appendChild(canvas);
};

// export function generateBarChart(title, totalValue, consumedValue, chartId, color, backgroundColor) {
//     const canvas = document.createElement("canvas");
//     canvas.width = 300;
//     canvas.height = 300;
    
//     const ctx = canvas.getContext('2d');
  
//     const chartInstance = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
//         datasets: [{
//           label: title,
//           data: [consumedValue, totalValue - consumedValue],
//           backgroundColor: [
//             color,
//             backgroundColor
//           ],
//           borderColor: [
//             color,
//             backgroundColor
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           title: {
//             display: true,
//             text: title,
//             position: 'top'
//           },
//           legend: {
//             display: false,
//           }
//         }
//       }
//     });
  
//     console.log(`Esse é o totalValue na função da barra ${totalValue}`)
//     console.log(`Esse é o consumedValue na função da barra ${consumedValue}`)
  
//     // Retornar a instância do gráfico para armazenamento
//     return { chartInstance, canvas };
  
//     //   // Armazenar a instância do gráfico para atualizações futuras
//     //   if (title === 'Proteína') proteinChartInstance = chartInstance;
//     //   if (title === 'Carboidrato') carboChartInstance = chartInstance;
//     //   if (title === 'Gordura') lipidChartInstance = chartInstance;
    
//     // const chartContainer = document.getElementById(chartId);
//     // chartContainer.appendChild(canvas);
// }
  
// export function updateChart(chart, title, totalValue, consumedValue, color, backgroundColor) {
//     chart.data.datasets[0].data = [consumedValue, totalValue - consumedValue];
//     chart.data.datasets[0].backgroundColor = [color, backgroundColor];
//     chart.data.datasets[0].borderColor = [color, backgroundColor];
//     chart.options.plugins.title.text = title;
//     chart.update();
// }