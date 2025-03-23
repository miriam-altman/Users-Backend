import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json());

// Use the userRoutes router
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

try {
  const sslOptions = {
    key: fs.readFileSync('private.key'),
    cert: fs.readFileSync('certificate.crt')
  };

  https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error('Error reading SSL files:', error);
}