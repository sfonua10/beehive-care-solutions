export type UserType = 'client' | 'caseWorker' | 'nurse' | 'attorney';

export interface BaseProfile {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
}

export interface ClientProfile extends BaseProfile {
  type: 'client';
  intakeDate: Date;
  clientSummary: string;
  medNeeds: string;
  team: {
    caseWorker?: string;
    nurse?: string;
    attorney?: string;
  };
}

export interface StaffProfile extends BaseProfile {
  type: 'caseWorker' | 'nurse' | 'attorney';
  title?: string;
}

export type Profile = ClientProfile | StaffProfile;

export interface ClientData {
  id: number
  fullName: string
  dob: Date | undefined
  intakeDate: Date | undefined
  caseWorker: string
  nurse: string
  attorney: string
}

export interface ProfileData {
  id: number
  type: 'client' | 'caseWorker' | 'nurse' | 'attorney'
  fullName: string
  title?: string
  email?: string
  phone?: string
  // Client specific fields
  intakeDate?: Date
  clientSummary?: string
  medNeeds?: string
  team?: {
    caseWorker?: string
    nurse?: string
    attorney?: string
  }
} 