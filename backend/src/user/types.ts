export type User = {
  id: string;
  faculty: Faculty;
  imInto: string;
  [key: string]: string;
};

enum Faculty {
  ArtsDesignAndArchitecture = 'artsDesignAndArchitecture',
  MedicineAndHealth = 'medicineAndHealth',
  Business = 'business',
  Engineering = 'engineering',
  Science = 'science',
  LawAndJustice = 'lawAndJustice',
}
