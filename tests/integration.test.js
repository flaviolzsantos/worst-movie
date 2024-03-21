const request = require('supertest');
const app = require('../src/index');
const db = require('../src/database/index');


const { getAllWinners } = require('../src/domain/movieDomain');


describe('GET /movies/producer', () => {
  beforeEach(async() => {
    await db.sync();
  });

  
  it('responds with content-type correct', (done) => {

    request(app).get('/movies/producer')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });


  it('should have properties in JSON', async () => {

    const res = await request(app).get('/movies/producer')

    expect(res.body).toHaveProperty('intervalAwards');
    expect(res.body.intervalAwards).toHaveProperty('max');
    expect(res.body.intervalAwards).toHaveProperty('min');

  });

  it('check default value in property min', async () => {

    const res = await request(app).get('/movies/producer')

    const min = [
      {
        "producer":"Joel Silver",
        "interval":1,
        "previousWin":1990,
        "followingWin":1991
      }
    ];
    expect(res.body.intervalAwards.min).toEqual(min)
    
  });

  it('check default value in property max', async () => {

    const res = await request(app).get('/movies/producer')

    const max = [
      {
        "producer":"Matthew Vaughn",
        "interval":13,
        "previousWin":2002,
        "followingWin":2015
      }
    ];
    expect(res.body.intervalAwards.max).toEqual(max)
    
  });

  
});



