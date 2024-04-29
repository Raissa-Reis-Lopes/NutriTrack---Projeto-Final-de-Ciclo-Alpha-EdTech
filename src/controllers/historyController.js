function getWeekData() {
    const weekData = [
      { data: '2024-04-22', calorias: 1500, gordura: 50, proteina: 80, carboidrato: 200 },
      { data: '2024-04-23', calorias: 1600, gordura: 55, proteina: 85, carboidrato: 210 },
      { data: '2024-04-24', calorias: 1700, gordura: 60, proteina: 90, carboidrato: 220 },
      { data: '2024-04-25', calorias: 1800, gordura: 65, proteina: 95, carboidrato: 230 },
      { data: '2024-04-26', calorias: 1900, gordura: 70, proteina: 100, carboidrato: 240 },
      { data: '2024-04-27', calorias: 2000, gordura: 75, proteina: 105, carboidrato: 250 },
      { data: '2024-04-28', calorias: 2100, gordura: 80, proteina: 110, carboidrato: 260 }
    ];
  
    return weekData;
  }

function weekData (req, res) {
    try {
        const dataWeek = getWeekData();
        console.log(dataWeek);
        res.json(dataWeek);
    } catch (error) {
        console.error('Erro ao obter os dados da semana:', error);
        res.status(500).json({ error: 'Erro ao obter os dados da semana' });
    }
};
  
  module.exports = { weekData };
  