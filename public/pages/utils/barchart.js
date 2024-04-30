// Função para criar e renderizar o gráfico de barras
export function renderBarChart(responseData, container, colorCalorie, colorProtein, colorCarbo, colorLipid) {
 
  // Dias da semana
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  console.log(`Esse é o responseData no barchart: ${responseData}`)
  console.log(responseData)
  console.log(responseData.data)

const chartOptions = {
    responsive: true,
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Calorias',
            },
            // Define o range do eixo y para calorias
            min: 0,
            // max: 3000, // Defina o valor máximo conforme necessário
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Proteína, Gordura e Carboidrato',
            },
            min: 0,
            // max: 200, 
            grid: {
                drawOnChartArea: false,
            },
        },
        x: {
            stacked: false,
            title: {
                display: true,
                text: 'Dias da Semana',
            },
        },
    },
};

const chartData = {
    labels: daysOfWeek,
    datasets: [
        {
            label: 'Calorias',
            backgroundColor: colorCalorie,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.calories) : 0),
            yAxisID: 'y', // Associando ao eixo y
        },
        {
            label: 'Proteína',
            backgroundColor: colorProtein,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.protein) : 0),
            yAxisID: 'y1', // Associando ao eixo y1
        },
        {
            label: 'Carboidrato',
            backgroundColor: colorCarbo,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.carbohydrate) : 0),
            yAxisID: 'y1', // Associando ao eixo y1
        },
        {
            label: 'Gordura',
            backgroundColor: colorLipid,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.lipid) : 0),
            yAxisID: 'y1', // Associando ao eixo y1
        }
    ]
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

