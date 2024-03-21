const Movie = require('../domain/movieDomain');


exports.getProducerWithMaxMinGap = async (req, res) => {
  try {
    
    const producersWinners = await Movie.getAllWinners();

    const producersAux = transformProducersAux(producersWinners);  

    const { min, max } = getMinMaxYearsFrom(producersAux);    

    const intervalAwards = {
      min: producersMinMax(min, 1, producersAux),
      max: producersMinMax(max, 99, producersAux)
    };

    res.status(200).json({ intervalAwards });

  } catch (error) {
    console.log('Error in getProducerWithMaxMinGap', error);
    res.status(500).json({ error: error.message });
  }
};

const transformProducersAux = (producersWinners) => {

  let producersAux = [];

    producersWinners.forEach(({ producers, year }) => {
      const names = producers.split(/\s*(?:,|and)\s*/);
      names.forEach(name => {
        const existingProducer = producersAux.find(p => p.name === name);
        if (existingProducer) {
          existingProducer.wins++;
          existingProducer.numYears = year - existingProducer.years[0];
          existingProducer.years.push(year);
        } else {
          producersAux.push({
            name,
            wins: 1,
            numYears: 0,
            years: [year]
          });
        }
      });
    });

    return producersAux;

}

const producersMinMax = (qtd, interval, producersAux) =>{
  let  filteredProds = [];

  producersAux.filter(obj => obj.numYears === qtd).forEach(x => {
    
    filteredProds.push({
      producer: x.name,
      interval: x.numYears,
      previousWin: x.years[0],
      followingWin: x.years[1]
    });

  });

  return filteredProds;
}

const getMinMaxYearsFrom = (list) =>{

  const { min, max } = list.filter(x => x.numYears >= 1)
  .reduce((acc, obj) => {
    acc.min = Math.min(acc.min, obj.numYears);
    acc.max = Math.max(acc.max, obj.numYears);
    return acc;
  }, { min: Infinity, max: -Infinity });

  return { min, max };

}
