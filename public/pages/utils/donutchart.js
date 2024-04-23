const generateDonutChart = (title, totalValue, consumedValue, subtitleConsumed,subtitleTotal) => {
    const consumedPercentage = ((consumedValue / totalValue) * 100).toFixed(2);
    const remainingPercentage = (100 - consumedPercentage).toFixed(2);
  
    // Criar elemento canvas
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
  
    const ctx = canvas.getContext('2d');
  
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Consumido', 'Restante'],
        datasets: [{
          label: `${title}`,
          data: [consumedPercentage, remainingPercentage],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
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
            display: true,
            labels: {
              generateLabels: function(chart) {
                return [
                  `${subtitleConsumed}/${subtitleTotal}`,
                  ...Chart.defaults.global.legend.labels.generateLabels(chart)
                ];
              }
            },
            position: 'bottom'
          }
        }
      }
    });
  
    return canvas;
  };
  
  module.exports = generateDonutChart;
  


  /* SIMLUAÇÂO DO USO
  
  import { generateDonutChart } from ('./donutChart.js')

  //dailyLimits vem do banco
 // consumed Nutrients vem do banco a cada alimento adicionado

const proteinChartContainer = document.getElementById('proteinChartContainer');
proteinChartContainer.appendChild(generateDonutChart('Proteína', dailyLimits.protein_limit, consumedNutrients.total_protein));

const carbChartContainer = document.getElementById('carbChartContainer');
carbChartContainer.appendChild(generateDonutChart('Carboidrato', dailyLimits.carb_limit, consumedNutrients.total_carb));

const fatChartContainer = document.getElementById('fatChartContainer');
fatChartContainer.appendChild(generateDonutChart('Gordura', dailyLimits.fat_limit, consumedNutrients.total_fat));
  
  
  
  */