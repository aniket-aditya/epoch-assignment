const request = require('supertest');
const express = require('express');
const multer = require('multer');
const compareController = require('../controllers/compareController');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.post('/compare', upload.array('files', 2), compareController.compareFiles);

describe('POST /compare', () => {
  it('should return an error if files are missing', async () => {
    const res = await request(app).post('/compare');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Two files are required');
  });

  it('should return an error for invalid file types', async () => {
    const res = await request(app)
      .post('/compare')
      .attach('files', Buffer.from('test'), 'file1.exe')
      .attach('files', Buffer.from('test'), 'file2.exe');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      'Invalid file type. Only .json and .txt are allowed'
    );
  });

  it('should return success for valid JSON files with correct comparison results', async () => {
    const file1 = Buffer.from(
      JSON.stringify({ key1: 'value1', key2: 'value2' })
    );
    const file2 = Buffer.from(
      JSON.stringify({ key1: 'value1', key2: 'value3', key3: 'value4' })
    );

    const res = await request(app)
      .post('/compare')
      .attach('files', file1, 'file1.json')
      .attach('files', file2, 'file2.json');

    expect(res.status).toBe(200);
    expect(res.body.result.differentKeys).toContain('key3');
    expect(res.body.result.sameKeysDifferentValues).toContain('key2');
  });
});
