// To run:
// 1. cd backend/database
// 2. npx ts-node generateSeedData.ts

// Import uuids.json
const uuids = require('./uuids.json');
// Import fs
const fs = require('fs');

const names = [
  'John Smith',
  'Jane Doe',
  'Bob Jones',
  'Alice Smith',
  'Bob Smith',
  'Alice Jones',
  'John Doe',
  'Jane Smith',
  'Bob Doe',
  'Alice Doe',
];

enum Faculty {
  ArtsDesignAndArchitecture = 'artsDesignAndArchitecture',
  MedicineAndHealth = 'medicineAndHealth',
  Business = 'business',
  Engineering = 'engineering',
  Science = 'science',
  LawAndJustice = 'lawAndJustice',
}

// Create 6 users from each faculty
type User = {
  primaryKey: { S: string };
  sortKey: { S: string };
  faculty: { S: Faculty };
  name: { S: string };
  entityType: { S: 'user' | 'match' };
};

// Create a user from each faculty
const users: User[] = [];
let i = 0;
for (const faculty of Object.values(Faculty)) {
  users.push({
    primaryKey: { S: `USER#${uuids[i]}` },
    sortKey: { S: `METADATA#${uuids[i]}` },
    faculty: { S: faculty },
    name: { S: names[i] },
    entityType: { S: 'user' },
  });

  i++;
}

type Match = {
  primaryKey: { S: string };
  sortKey: { S: string };
  user2Id: { S: string };
  user2Faculty: { S: Faculty };
  entityType: { S: 'user' | 'match' };
};

const matches: Match[] = [];
for (let usersIndex = 0; usersIndex < users.length; usersIndex++) {
  for (
    let matchesIndex = usersIndex + 1;
    matchesIndex < users.length;
    matchesIndex++
  ) {
    const randomDate = new Date(
      new Date().getTime() - Math.random() * 10000000000
    ).toISOString();
    const randomUuid = uuids[Math.floor(Math.random() * uuids.length)];
    const match1: Match = {
      primaryKey: { S: users[usersIndex].primaryKey.S },
      sortKey: { S: `MATCH#${randomDate}#${randomUuid}` },
      user2Id: { S: users[matchesIndex].primaryKey.S },
      user2Faculty: { S: users[matchesIndex].faculty.S },
      entityType: { S: 'match' },
    };
    const match2: Match = {
      primaryKey: { S: users[matchesIndex].primaryKey.S },
      sortKey: { S: `MATCH#${randomDate}#${randomUuid}` },
      user2Id: { S: users[usersIndex].primaryKey.S },
      user2Faculty: { S: users[usersIndex].faculty.S },
      entityType: { S: 'match' },
    };

    matches.push(match1);
    matches.push(match2);
  }
}

const seedData = [...users, ...matches];
// Batch seedData in chunks of 25
const seedDataChunks: any[] = [];
for (let i = 0; i < seedData.length; i += 25) {
  seedDataChunks.push(seedData.slice(i, i + 25));
}

// Format each seedDataChunk into DynamoDB BatchWriteItem format
const formattedSeedDataChunks = seedDataChunks.map((chunk) => {
  return {
    TuesHey: chunk.map((item: User | Match) => {
      return {
        PutRequest: {
          Item: item,
        },
      };
    }),
  };
});

// Write each formattedSeedDataChunk to a file
formattedSeedDataChunks.forEach((chunk, index) => {
  const data = JSON.stringify(chunk, null, 2);
  fs.writeFileSync(`./TuesHeySeed${index}.json`, data);
});
