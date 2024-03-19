const fs = require('fs');


class File{
    constructor(){}

    readCSV(filePath) {
        try {
          const data = fs.readFileSync(filePath, 'utf8');
          const rows = data.split('\n').map(row => row.trim());
          const header = rows.shift().split(';').map(cell => cell.trim());
          const result = rows.map(row => {
            const values = row.split(';');
            const obj = {};
            header.forEach((header, index) => {
              obj[header] = values[index];
            });
            return obj;
          });
          return result;
        } catch (error) {
          console.error('Erro ao ler o arquivo CSV:', error);
          return [];
        }
      }
}


module.exports = new File();