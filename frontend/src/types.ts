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
  name: string;
  chatToken: string;
  faculty?: Faculty;
  interests?: string;
};

export type UserDetails = {
  name: string;
  faculty: Faculty;
  interests: string;
};
