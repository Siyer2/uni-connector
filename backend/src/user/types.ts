type EntryType = 'user' | 'match';

interface TuesHeyDBEntry {
  primaryKey: string;
  sortKey: string;
  type: EntryType;
}

export interface User extends TuesHeyDBEntry {
  name: string;
  faculty?: Faculty;
  [key: string]: string;
}

export enum Faculty {
  ArtsDesignAndArchitecture = 'artsDesignAndArchitecture',
  MedicineAndHealth = 'medicineAndHealth',
  Business = 'business',
  Engineering = 'engineering',
  Science = 'science',
  LawAndJustice = 'lawAndJustice',
}
