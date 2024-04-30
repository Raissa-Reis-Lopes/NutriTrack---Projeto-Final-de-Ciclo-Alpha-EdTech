// Função para criar e renderizar o gráfico de barras
export function renderBarChart(responseData, container, colorCalorie, colorProtein, colorCarbo, colorLipid) {
 
  // Dias da semana
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  console.log(`Esse é o responseData no barchart: ${responseData}`)
  console.log(responseData)
  console.log(responseData.data)


  // Preparar os dados para o gráfico
  const chartData = {
      labels: daysOfWeek,
      datasets: [
          {
              label: 'Calorias',
              backgroundColor: colorCalorie,
              data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.calories) : 0)
          },
          {
              label: 'Proteína',
              backgroundColor: colorProtein,
              data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.protein) : 0)
          },
          {
              label: 'Carboidrato',
              backgroundColor: colorCarbo,
              data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.carbohydrate) : 0)
          },
          {
              label: 'Gordura',
              backgroundColor: colorLipid,
              data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.lipid) : 0)
          }
      ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Calorias',
            },
            position: 'left', // Posição do eixo y para as calorias
        },
        y1: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Proteína, Gordura e Carboidrato',
            },
            position: 'right', // Posição do segundo eixo y
            grid: {
                drawOnChartArea: false, // Não desenhar a grade no espaço do gráfico
            },
        },
        x: {
            stacked: false,
            title: {
                display: true,
                text: 'Dias da Semana',
                ticks: {
                  color: 'rgba(0, 0, 0, 0.8)' // Definir a cor dos rótulos
              }
            }
        }
    }
};

const ctx = container.getContext('2d'); // Usando o contexto do contêiner passado como parâmetro

// Verificar se um gráfico já existe no elemento canvas
if (window.myChart instanceof Chart) {
    window.myChart.destroy(); // Destruir o gráfico anterior
}

const myChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions
});

// Armazenar uma referência ao gráfico atual para futuras verificações
window.myChart = myChart;
}

