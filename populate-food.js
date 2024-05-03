// Use o seguinte comando no terminal para realizar o preenchimento da tabela food:
// node populate-food.js

const fs = require('fs');
const { pool } = require("./src/db/postgresql");

// Função para ler o arquivo JSON
function readJSONFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
        return null;
    }
}

function validateNum(value) {
    return typeof value === 'number' && value > 0;
}

// Função para preencher a tabela
async function populateFood() {
    const jsonData = readJSONFile('table-taco.json');
    if (!jsonData) {
        console.error('Não foi possível ler os dados do JSON.');
        return;
    }

    for (const item of jsonData) {
        if (validateNum(item.energy_kcal) && validateNum(item.carbohydrate_g) && validateNum(item.protein_g) && validateNum(item.lipid_g)) {
            try {
                await pool.query('INSERT INTO food (name, calorie, carbohydrate_g, protein_g, lipid_g) VALUES ($1, $2, $3, $4, $5)', [
                    item.description.replace(/,/g, ''),
                    item.energy_kcal,
                    item.carbohydrate_g,
                    item.protein_g,
                    item.lipid_g
                ]);
            } catch (err) {
                console.error('Erro ao inserir:', err);
            }
        }
    }

    console.log("Preenchimento realizado com sucesso!");
}

// Chama a função para inserir os dados
populateFood();
