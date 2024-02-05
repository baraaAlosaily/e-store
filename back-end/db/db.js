import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgres://baraa:123456@localhost:5432/estore';

const client = new Client({
  connectionString: connectionString,
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
  }
};

const disconnectFromDatabase = () => {
  client.end();
  console.log('Disconnected from PostgreSQL');
};

export { connectToDatabase, disconnectFromDatabase ,client };
