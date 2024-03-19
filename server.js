const app = require('./src/index');
const db = require('./src/database/index');

const PORT = process.env.PORT || 3000;


(() => {
  try{
    db.sync();    
    
  }catch (error){
    console.log("Não foi possível conectar ao banco de dados: ", error);
  }
})();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});