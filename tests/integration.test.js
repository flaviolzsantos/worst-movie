const request = require('supertest');
const app = require('../src/index');


jest.mock('../src/domain/movieDomain', () => ({
  getAllWinners: jest.fn()
}));

const { getAllWinners } = require('../src/domain/movieDomain');

describe('GET /producerWithMaxMinGap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('responds with JSON containing intervalAwards', async () => {

    getAllWinners.mockResolvedValue([
      { producers: 'Producer1', year: 2020 },
      { producers: 'Producer2', year: 2019 },
      { producers: 'Producer1', year: 2018 }
    ]);

    const response = await request(app).get('/movies/producer');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('intervalAwards');
  });

  it('responds with 500 if an error occurs', async () => {
    
    getAllWinners.mockRejectedValue(new Error('Database connection error'));

    const response = await request(app).get('/movies/producer');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});



