export type UserRole = 'charter' | 'skipper';

export type ActivityLevel =
  | 'newcomer'      // 0-1 charters/year
  | 'occasional'    // 2/year
  | 'regular'       // 3/year
  | 'active'        // 4/year
  | 'enthusiast'    // 5/year
  | 'sea_lover';    // 6+/year

export type SessionStatus = 'scheduled' | 'active' | 'closed';

export type CertificationAssociation =
  | 'RYA'     // Royal Yachting Association
  | 'IYT'     // International Yacht Training
  | 'ICC'     // International Certificate of Competence
  | 'ASA'     // American Sailing Association
  | 'SLC'     // Swiss Sailing License
  | 'OTHER';

export type CertificationLevel =
  | 'Day Skipper'
  | 'Coastal Skipper'
  | 'Yachtmaster Offshore'
  | 'Yachtmaster Ocean'
  | 'Bareboat Skipper'
  | 'Flotilla Skipper'
  | 'OTHER';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface CharterCompany {
  id: string;
  userId: string;
  companyName: string;
  country: string;
  region?: string;
  contactPhone?: string;
  website?: string;
  logoUrl?: string;
  createdAt: string;
}

export interface Skipper {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  languages: string[];
  photoUrl?: string;
  qrCode: string;  // unique QR identifier
  createdAt: string;
}

export interface Certificate {
  id: string;
  skipperId: string;
  association: CertificationAssociation;
  level: CertificationLevel;
  certificateNumber?: string;
  issuedDate?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Vessel {
  id: string;
  charterCompanyId: string;
  name: string;
  model: string;
  mmsi?: string;
  registrationNumber?: string;
  year?: number;
  lengthMeters?: number;
  createdAt: string;
}

export interface Session {
  id: string;
  skipperId: string;
  charterCompanyId: string;
  vesselId: string;
  startDate: string;
  endDate: string;
  location: string;
  status: SessionStatus;
  // Rating from charter company
  starRating?: number;       // 1-5
  penaltyPoints?: number;    // 0-5 points deducted
  friendliness?: number;     // 1-5
  comment?: string;
  closedAt?: string;
  createdAt: string;
}

export interface SkipperRating {
  skipperId: string;
  averageStars: number;       // 1-5, default 5
  totalPoints: number;        // max 12, starts at 12
  totalSessions: number;
  activityLevel: ActivityLevel;
  lastSessionDate?: string;
}

// For display purposes
export interface SkipperProfile extends Skipper {
  certificates: Certificate[];
  rating: SkipperRating;
  recentSessions: (Session & { vessel?: Vessel; charterCompany?: CharterCompany })[];
}

export interface SessionWithDetails extends Session {
  skipper?: Skipper;
  vessel?: Vessel;
  charterCompany?: CharterCompany;
  skipperRating?: SkipperRating;
}
