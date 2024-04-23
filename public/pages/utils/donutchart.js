export function generateDonutChart(title, totalValue, consumedValue, chartId,color) {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Consumido', 'Restante'],
      datasets: [{
        label: title,
        data: [consumedValue, totalValue - consumedValue],
        backgroundColor: [
          color,
          '#b5d7b0'
        ],
        borderColor: [
          color,
          '#b5d7b0'
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
  
  const chartContainer = document.getElementById(chartId);
  chartContainer.appendChild(canvas);
}