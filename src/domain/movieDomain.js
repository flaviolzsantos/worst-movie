const { DataTypes, Model } = require('sequelize');
const db = require('../database/index');
const file = require(`../utils/file`);
const env = require('../utils/env');


class Movie  extends Model {}

Movie.init({
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },  
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  studios: {
    type: DataTypes.STRING,
    allowNull: false
  },
  producers: {
    type: DataTypes.STRING,
    allowNull: false
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: true
  }
},{
  sequelize : db
}).sync().then(() => 
  file.readCSV(process.cwd() + env.PATH_CSV_MOVIE)
).then((movies) => 
  Movie.saveMovies(movies)
);

Movie.saveMovie = (movie) => {
  try{
    return Movie.create(movie)
  }catch (error) {
    throw new Error('Erro ao salvar filme: ' + error.message);
  }
}

Movie.saveMovies = (listMovies) => {
  try{

    return listMovies.map(item => 
      !item || 
      !item.title || 
      !item.studios || 
      !item.producers || 
      Movie.saveMovie(item))

  }catch (error) {
    throw new Error('Erro ao salvar lista de filmes: ' + error.message);
  }
}

Movie.getAllMovies = async () =>{
  return Movie.findAll();
}

Movie.getAllWinners = async () => {
  return Movie.findAll({
    where: {
      winner : 'yes'
    }
  });
}




module.exports = Movie;
