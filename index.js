const fs = require('fs');
const axios = require('axios');
let converter = require('json-2-csv');
var xl = require('excel4node');

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
      console.log('Les données ont été récupérées et enregistrées dans le fichier data.csv.');
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
    }
  }

  async function saveAsExcel(data) {
    let i = 1;
    try {
      var wb = new xl.Workbook();
      var ws = wb.addWorksheet('Sheet 1');
      var style = wb.createStyle({
        font: {
          color: '#FF0800',
          size: 12,
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
      });
      data.forEach((d) => {
        ws.cell(1, i)
          .number(d.id)
          .style(style);
        ws.cell(2, i)
          .string(d.first_name)
          .style(style);
        i++;
      })
      wb.write('data.xlsx');
      console.log('Les données ont été récupérées et enregistrées dans le fichier data.xlsx.');
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
            data.forEach(d => {
                delete d.employment
                delete d.address;
                delete d.credit_card;
                delete d.subscription;
            });
            saveAsCSV(data);
            break;
        case "excel":
            data.forEach(d => {
                delete d.employment
                delete d.address;
                delete d.credit_card;
                delete d.subscription;
            });
            saveAsExcel(data);
            break;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

main();
