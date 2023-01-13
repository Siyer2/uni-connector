export enum Faculty {
  ArtsDesignAndArchitecture = 'artsDesignAndArchitecture',
  MedicineAndHealth = 'medicineAndHealth',
  Business = 'business',
  Engineering = 'engineering',
  Science = 'science',
  LawAndJustice = 'lawAndJustice',
}

export type User = {
  primaryKey: string;
  sortKey: string;
  faculty?: Faculty;
  emojis?: string;
  faveEat?: string;
  interests?: string;
};

export type UserDetails = {
  emojis: string;
  faculty: Faculty;
  faveEat: string;
  interests: string;
};
