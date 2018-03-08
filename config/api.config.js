import * as dotenv from 'dotenv';

dotenv.config();

const apiConfig = {
  creds: {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  },
  options: {
    hostname: 'sc-02.coinigy.com',
    port: '443',
    secure: 'true',
  },
};

export default apiConfig;
