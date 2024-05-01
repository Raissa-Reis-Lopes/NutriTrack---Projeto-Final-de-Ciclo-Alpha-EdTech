// Função para criar e renderizar o gráfico de barras
export function renderBarChart(responseData, container, colorCalorie, colorProtein, colorCarbo, colorLipid) {
 
  // Dias da semana
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];


const chartOptions = {
    responsive: true,
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Calorias (kcal)',
                font: {
                    size: 16, // Define o tamanho da fonte
                    weight: 'bold' // Define a espessura da fonte
                }
            },
            ticks: {
                font: {
                    size: 16, // Define o tamanho da fonte
                    weight: 'bold' // Define a espessura da fonte
                }
            },
            min: 0,
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Proteína, Gordura e Carboidrato (g)',
                font: {
                    size: 16, // Define o tamanho da fonte
                    weight: 'bold' // Define a espessura da fonte
                }
            },
            min: 0, 
            grid: {
                drawOnChartArea: false,
            },
            ticks: {
                font: {
                    size: 16, // Define o tamanho da fonte
                    weight: 'bold' // Define a espessura da fonte
                }
            }

        },
        x: {
            stacked: false,
            title: {
                display: true,
                text: 'Dias da Semana',
                font: {
                    size: 16, // Define o tamanho da fonte
                    weight: 'bold' // Define a espessura da fonte
                }
            },
            ticks: {
                font: {
                    size: 16, // Define o tamanho da fonte
                    weight: 'bold' // Define a espessura da fonte
                }
            }
        },
    },
};

const chartData = {
    labels: daysOfWeek,
    datasets: [
        {
            label: 'Calorias (Kcal)',
            font: {
                size: 16, // Define o tamanho da fonte
                weight: 'bold' // Define a espessura da fonte
            },
            backgroundColor: colorCalorie,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.calories) : 0),
            yAxisID: 'y', // Associando ao eixo y
            borderRadius: 5,
        },
        {
            label: 'Proteína (g)',
            font: {
                size: 16, // Define o tamanho da fonte
                weight: 'bold' // Define a espessura da fonte
            },
            backgroundColor: colorProtein,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.protein) : 0),
            yAxisID: 'y1', // Associando ao eixo y1
            borderRadius: 5,
        },
        {
            label: 'Carboidrato (g)',
            font: {
                size: 16, // Define o tamanho da fonte
                weight: 'bold' // Define a espessura da fonte
            },
            backgroundColor: colorCarbo,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.carbohydrate) : 0),
            yAxisID: 'y1', // Associando ao eixo y1
            borderRadius: 5,
        },
        {
            label: 'Gordura (g)',
            font: {
                size: 16, // Define o tamanho da fonte
                weight: 'bold' // Define a espessura da fonte
            },
            backgroundColor: colorLipid,
            data: daysOfWeek.map(day => responseData.data[day] ? Math.ceil(responseData.data[day].totalNutrition.lipid) : 0),
            yAxisID: 'y1', // Associando ao eixo y1
            borderRadius: 5,
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

