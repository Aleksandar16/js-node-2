const fs = require('fs');
const axios = require('axios');
let converter = require('json-2-csv');

async function fetchData() {
  try {
    const response = await axios.get('https://random-data-api.com/api/v2/users?size=10');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error;
  }
}

async function saveAsJson(data) {
  try {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    console.log('Les données ont été récupérées et enregistrées dans le fichier data.json.');
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error;
  }
}

async function saveAsCSV(data) {
    try {
      const csv = await converter.json2csv(data);
      fs.writeFile("data.csv", csv, "utf-8", (err) => {
        if (err) console.log(err);
        else console.log("Data saved");
      });
      console.log('Les données ont été récupérées et enregistrées dans le fichier data.json.');
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
    }
  }

  async function saveAsExcel(data) {
    try {
      fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
      console.log('Les données ont été récupérées et enregistrées dans le fichier data.json.');
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
    }
  }

async function main() {
  const args = process.argv.slice(2);
  const format = args[0];
  try {
    const data = await fetchData();

    switch(format){
        case "json":
            saveAsJson(data);
            break;
        case "csv":
            saveAsCSV(data);
            break;
        case "excel":
            saveAsExcel();
            break;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

main();
