const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://nexus:nexus_password@127.0.0.1:5433/codenexus?schema=public' });
client.connect().then(() => {
  return client.query('UPDATE "GamificationProfile" SET crystals = 5000;');
}).then(res => {
  console.log('Rows updated:', res.rowCount);
}).catch(console.error).finally(() => client.end());
