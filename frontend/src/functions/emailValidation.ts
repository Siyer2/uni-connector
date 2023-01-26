export function isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@(unsw.edu.au|unswalumni.com|ad.unsw.edu.au|zmail.unsw.edu.au|student.unsw.edu.au)$/.test(
    email
  );
}
