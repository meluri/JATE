import { openDB } from 'idb';

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the 'jate' database
  const jateDb = await openDB('jate', 1);

  // Create a transaction with readwrite access
  const tx = jateDb.transaction('jate', 'readwrite');

  // Access the 'jate' object store
  const store = tx.objectStore('jate');

  // Add or update the content in the database
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Get all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open the 'jate' database
  const jateDb = await openDB('jate', 1);

  // Create a transaction with readonly access
  const tx = jateDb.transaction('jate', 'readonly');

  // Access the 'jate' object store
  const store = tx.objectStore('jate');

  // Get all data from the store
  const request = store.getAll();

  // Wait for the request to complete
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
  
  // Return the result (null if no data exists)
  return result.length ? result[0].value : null;
};

// Initialize the database
initdb();