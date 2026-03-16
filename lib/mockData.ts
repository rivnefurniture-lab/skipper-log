import {
  Skipper,
  Certificate,
  Vessel,
  Session,
  SkipperRating,
  CharterCompany,
  User,
} from './types';

// ---- Charter Companies ----
export const mockCharterCompanies: CharterCompany[] = [
  {
    id: 'cc-1',
    userId: 'user-charter-1',
    companyName: 'Adriatic Sailing Co.',
    country: 'Croatia',
    region: 'Split',
    contactPhone: '+385 21 123 456',
    website: 'https://adriaticsailing.hr',
    createdAt: '2024-01-15',
  },
  {
    id: 'cc-2',
    userId: 'user-charter-2',
    companyName: 'Aegean Yachts',
    country: 'Greece',
    region: 'Athens',
    contactPhone: '+30 210 123 4567',
    website: 'https://aegeanyachts.gr',
    createdAt: '2023-06-01',
  },
  {
    id: 'cc-3',
    userId: 'user-charter-3',
    companyName: 'Ionian Charters',
    country: 'Greece',
    region: 'Corfu',
    createdAt: '2024-03-20',
  },
  {
    id: 'cc-4',
    userId: 'user-charter-4',
    companyName: 'Montenegro Sailing',
    country: 'Montenegro',
    region: 'Tivat',
    createdAt: '2024-05-10',
  },
];

// ---- Skippers ----
export const mockSkippers: Skipper[] = [
  {
    id: 'sk-1',
    firstName: 'Oleksandr',
    lastName: 'Kovalenko',
    dateOfBirth: '1985-03-14',
    languages: ['Ukrainian', 'English', 'Croatian'],
    qrCode: 'SKIP-001-OKV',
    createdAt: '2024-02-01',
  },
  {
    id: 'sk-2',
    firstName: 'Marco',
    lastName: 'Rossi',
    dateOfBirth: '1978-08-22',
    languages: ['Italian', 'English', 'French'],
    qrCode: 'SKIP-002-MRS',
    createdAt: '2024-01-20',
  },
  {
    id: 'sk-3',
    firstName: 'Hans',
    lastName: 'Mueller',
    dateOfBirth: '1990-11-05',
    languages: ['German', 'English'],
    qrCode: 'SKIP-003-HML',
    createdAt: '2024-03-15',
  },
  {
    id: 'sk-4',
    firstName: 'Pierre',
    lastName: 'Dubois',
    dateOfBirth: '1982-05-30',
    languages: ['French', 'English', 'Spanish'],
    qrCode: 'SKIP-004-PDB',
    createdAt: '2024-04-10',
  },
  {
    id: 'sk-5',
    firstName: 'Andrii',
    lastName: 'Shevchenko',
    dateOfBirth: '1992-07-19',
    languages: ['Ukrainian', 'English'],
    qrCode: 'SKIP-005-ASH',
    createdAt: '2024-05-01',
  },
  {
    id: 'sk-6',
    firstName: 'James',
    lastName: 'Wilson',
    dateOfBirth: '1975-01-12',
    languages: ['English'],
    qrCode: 'SKIP-006-JWL',
    createdAt: '2024-01-05',
  },
  {
    id: 'sk-7',
    firstName: 'Nikolaos',
    lastName: 'Papadopoulos',
    dateOfBirth: '1988-09-25',
    languages: ['Greek', 'English', 'German'],
    qrCode: 'SKIP-007-NPD',
    createdAt: '2024-02-14',
  },
  {
    id: 'sk-8',
    firstName: 'Yana',
    lastName: 'Bondarenko',
    dateOfBirth: '1995-04-08',
    languages: ['Ukrainian', 'English', 'Polish'],
    qrCode: 'SKIP-008-YBN',
    createdAt: '2024-06-01',
  },
];

// ---- Certificates ----
export const mockCertificates: Certificate[] = [
  { id: 'cert-1', skipperId: 'sk-1', association: 'IYT', level: 'Bareboat Skipper', certificateNumber: 'IYT-2020-4521', issuedDate: '2020-06-15', createdAt: '2024-02-01' },
  { id: 'cert-2', skipperId: 'sk-2', association: 'RYA', level: 'Yachtmaster Offshore', certificateNumber: 'RYA-2018-8832', issuedDate: '2018-03-20', createdAt: '2024-01-20' },
  { id: 'cert-3', skipperId: 'sk-3', association: 'ICC', level: 'Day Skipper', certificateNumber: 'ICC-2023-1147', issuedDate: '2023-07-10', createdAt: '2024-03-15' },
  { id: 'cert-4', skipperId: 'sk-4', association: 'RYA', level: 'Coastal Skipper', certificateNumber: 'RYA-2019-3345', issuedDate: '2019-05-12', createdAt: '2024-04-10' },
  { id: 'cert-5', skipperId: 'sk-5', association: 'IYT', level: 'Bareboat Skipper', certificateNumber: 'IYT-2022-7789', issuedDate: '2022-08-01', createdAt: '2024-05-01' },
  { id: 'cert-6', skipperId: 'sk-6', association: 'RYA', level: 'Yachtmaster Ocean', certificateNumber: 'RYA-2010-2201', issuedDate: '2010-11-15', createdAt: '2024-01-05' },
  { id: 'cert-7', skipperId: 'sk-7', association: 'ICC', level: 'Coastal Skipper', certificateNumber: 'ICC-2021-5543', issuedDate: '2021-04-20', createdAt: '2024-02-14' },
  { id: 'cert-8', skipperId: 'sk-8', association: 'IYT', level: 'Day Skipper', certificateNumber: 'IYT-2024-9901', issuedDate: '2024-02-28', createdAt: '2024-06-01' },
];

// ---- Vessels ----
export const mockVessels: Vessel[] = [
  { id: 'v-1', charterCompanyId: 'cc-1', name: 'Sea Breeze', model: 'Bavaria 46 Cruiser', mmsi: '238712340', registrationNumber: 'ST-1234', year: 2019, lengthMeters: 14.27, createdAt: '2024-01-15' },
  { id: 'v-2', charterCompanyId: 'cc-1', name: 'Adriatic Pearl', model: 'Jeanneau Sun Odyssey 440', registrationNumber: 'ST-5678', year: 2021, lengthMeters: 13.39, createdAt: '2024-01-15' },
  { id: 'v-3', charterCompanyId: 'cc-2', name: 'Poseidon\'s Gift', model: 'Dufour 460 GL', registrationNumber: 'PIR-2233', year: 2020, lengthMeters: 14.15, createdAt: '2023-06-01' },
  { id: 'v-4', charterCompanyId: 'cc-2', name: 'Hellas Wind', model: 'Lagoon 42', registrationNumber: 'PIR-4455', year: 2022, lengthMeters: 12.8, createdAt: '2023-06-01' },
  { id: 'v-5', charterCompanyId: 'cc-3', name: 'Ionian Star', model: 'Beneteau Oceanis 46.1', registrationNumber: 'COR-1122', year: 2021, lengthMeters: 14.6, createdAt: '2024-03-20' },
  { id: 'v-6', charterCompanyId: 'cc-4', name: 'Montenegro Dream', model: 'Hanse 458', registrationNumber: 'TV-3344', year: 2023, lengthMeters: 14.02, createdAt: '2024-05-10' },
];

// ---- Sessions ----
export const mockSessions: Session[] = [
  // Oleksandr - active, experienced
  { id: 's-1', skipperId: 'sk-1', charterCompanyId: 'cc-1', vesselId: 'v-1', startDate: '2025-07-05', endDate: '2025-07-12', location: 'Split, Croatia', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 5, comment: 'Excellent skipper, very experienced. Boat returned in perfect condition.', closedAt: '2025-07-12T16:00:00Z', createdAt: '2025-06-20' },
  { id: 's-2', skipperId: 'sk-1', charterCompanyId: 'cc-2', vesselId: 'v-3', startDate: '2025-08-10', endDate: '2025-08-17', location: 'Athens, Greece', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 5, comment: 'Perfect charter. Very professional.', closedAt: '2025-08-17T15:00:00Z', createdAt: '2025-07-25' },
  { id: 's-3', skipperId: 'sk-1', charterCompanyId: 'cc-3', vesselId: 'v-5', startDate: '2025-09-20', endDate: '2025-09-27', location: 'Corfu, Greece', status: 'closed', starRating: 4.5, penaltyPoints: 0, friendliness: 5, closedAt: '2025-09-27T14:00:00Z', createdAt: '2025-09-05' },
  { id: 's-4', skipperId: 'sk-1', charterCompanyId: 'cc-1', vesselId: 'v-2', startDate: '2026-03-15', endDate: '2026-03-22', location: 'Split, Croatia', status: 'active', createdAt: '2026-03-01' },

  // Marco - experienced, one incident
  { id: 's-5', skipperId: 'sk-2', charterCompanyId: 'cc-2', vesselId: 'v-4', startDate: '2025-06-01', endDate: '2025-06-08', location: 'Saronic Gulf, Greece', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 4, closedAt: '2025-06-08T16:00:00Z', createdAt: '2025-05-15' },
  { id: 's-6', skipperId: 'sk-2', charterCompanyId: 'cc-1', vesselId: 'v-1', startDate: '2025-07-20', endDate: '2025-07-27', location: 'Dubrovnik, Croatia', status: 'closed', starRating: 3.5, penaltyPoints: 2, friendliness: 3, comment: 'Minor damage to hull during docking. Late return.', closedAt: '2025-07-27T18:00:00Z', createdAt: '2025-07-05' },
  { id: 's-7', skipperId: 'sk-2', charterCompanyId: 'cc-3', vesselId: 'v-5', startDate: '2025-09-01', endDate: '2025-09-08', location: 'Lefkada, Greece', status: 'closed', starRating: 4.5, penaltyPoints: 0, friendliness: 4, closedAt: '2025-09-08T15:00:00Z', createdAt: '2025-08-15' },

  // Hans - new, few sessions
  { id: 's-8', skipperId: 'sk-3', charterCompanyId: 'cc-1', vesselId: 'v-2', startDate: '2025-08-01', endDate: '2025-08-08', location: 'Trogir, Croatia', status: 'closed', starRating: 4, penaltyPoints: 1, friendliness: 4, comment: 'Lost dinghy paddle. Otherwise good.', closedAt: '2025-08-08T16:00:00Z', createdAt: '2025-07-15' },

  // Pierre - regular
  { id: 's-9', skipperId: 'sk-4', charterCompanyId: 'cc-2', vesselId: 'v-3', startDate: '2025-05-15', endDate: '2025-05-22', location: 'Cyclades, Greece', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 5, comment: 'Magnifique! Boat in excellent condition.', closedAt: '2025-05-22T14:00:00Z', createdAt: '2025-05-01' },
  { id: 's-10', skipperId: 'sk-4', charterCompanyId: 'cc-4', vesselId: 'v-6', startDate: '2025-08-20', endDate: '2025-08-27', location: 'Kotor Bay, Montenegro', status: 'closed', starRating: 4.5, penaltyPoints: 0, friendliness: 5, closedAt: '2025-08-27T15:00:00Z', createdAt: '2025-08-05' },

  // Andrii - newcomer
  { id: 's-11', skipperId: 'sk-5', charterCompanyId: 'cc-1', vesselId: 'v-2', startDate: '2025-09-10', endDate: '2025-09-17', location: 'Zadar, Croatia', status: 'closed', starRating: 4, penaltyPoints: 0, friendliness: 5, comment: 'New skipper, did well for first time.', closedAt: '2025-09-17T16:00:00Z', createdAt: '2025-08-25' },

  // James - very experienced, many sessions
  { id: 's-12', skipperId: 'sk-6', charterCompanyId: 'cc-2', vesselId: 'v-4', startDate: '2025-04-10', endDate: '2025-04-17', location: 'Dodecanese, Greece', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 4, closedAt: '2025-04-17T14:00:00Z', createdAt: '2025-03-25' },
  { id: 's-13', skipperId: 'sk-6', charterCompanyId: 'cc-1', vesselId: 'v-1', startDate: '2025-05-20', endDate: '2025-05-27', location: 'Kornati, Croatia', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 5, closedAt: '2025-05-27T15:00:00Z', createdAt: '2025-05-05' },
  { id: 's-14', skipperId: 'sk-6', charterCompanyId: 'cc-3', vesselId: 'v-5', startDate: '2025-06-15', endDate: '2025-06-22', location: 'Paxos, Greece', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 5, closedAt: '2025-06-22T16:00:00Z', createdAt: '2025-06-01' },
  { id: 's-15', skipperId: 'sk-6', charterCompanyId: 'cc-4', vesselId: 'v-6', startDate: '2025-07-10', endDate: '2025-07-17', location: 'Budva, Montenegro', status: 'closed', starRating: 4.5, penaltyPoints: 0, friendliness: 4, closedAt: '2025-07-17T15:00:00Z', createdAt: '2025-06-25' },
  { id: 's-16', skipperId: 'sk-6', charterCompanyId: 'cc-2', vesselId: 'v-3', startDate: '2025-08-05', endDate: '2025-08-12', location: 'Sporades, Greece', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 5, closedAt: '2025-08-12T14:00:00Z', createdAt: '2025-07-20' },
  { id: 's-17', skipperId: 'sk-6', charterCompanyId: 'cc-1', vesselId: 'v-2', startDate: '2025-09-05', endDate: '2025-09-12', location: 'Vis, Croatia', status: 'closed', starRating: 5, penaltyPoints: 0, friendliness: 5, closedAt: '2025-09-12T16:00:00Z', createdAt: '2025-08-20' },

  // Nikolaos - some issues
  { id: 's-18', skipperId: 'sk-7', charterCompanyId: 'cc-2', vesselId: 'v-4', startDate: '2025-07-01', endDate: '2025-07-08', location: 'Ionian Sea, Greece', status: 'closed', starRating: 3, penaltyPoints: 3, friendliness: 2, comment: 'Significant damage to bow during mooring. Unfriendly when confronted.', closedAt: '2025-07-08T17:00:00Z', createdAt: '2025-06-15' },
  { id: 's-19', skipperId: 'sk-7', charterCompanyId: 'cc-3', vesselId: 'v-5', startDate: '2025-08-15', endDate: '2025-08-22', location: 'Kefalonia, Greece', status: 'closed', starRating: 4, penaltyPoints: 1, friendliness: 3, comment: 'Fuel tank not full on return.', closedAt: '2025-08-22T16:00:00Z', createdAt: '2025-08-01' },

  // Yana - newcomer, scheduled session
  { id: 's-20', skipperId: 'sk-8', charterCompanyId: 'cc-4', vesselId: 'v-6', startDate: '2026-04-01', endDate: '2026-04-08', location: 'Tivat, Montenegro', status: 'scheduled', createdAt: '2026-03-01' },
];

// ---- Skipper Ratings (computed) ----
function computeRating(skipperId: string): SkipperRating {
  const sessions = mockSessions.filter(s => s.skipperId === skipperId && s.status === 'closed');
  const totalSessions = sessions.length;

  const ratedSessions = sessions.filter(s => s.starRating !== undefined);
  const averageStars = ratedSessions.length > 0
    ? ratedSessions.reduce((sum, s) => sum + (s.starRating || 0), 0) / ratedSessions.length
    : 5;

  const totalPenalty = sessions.reduce((sum, s) => sum + (s.penaltyPoints || 0), 0);
  const totalPoints = Math.max(0, 12 - totalPenalty);

  // Activity: count sessions in last 12 months
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const recentCount = sessions.filter(s => new Date(s.startDate) >= oneYearAgo).length;

  let activityLevel: SkipperRating['activityLevel'] = 'newcomer';
  if (recentCount >= 6) activityLevel = 'sea_lover';
  else if (recentCount >= 5) activityLevel = 'enthusiast';
  else if (recentCount >= 4) activityLevel = 'active';
  else if (recentCount >= 3) activityLevel = 'regular';
  else if (recentCount >= 2) activityLevel = 'occasional';

  const lastSession = sessions.sort((a, b) => b.startDate.localeCompare(a.startDate))[0];

  return {
    skipperId,
    averageStars: Math.round(averageStars * 10) / 10,
    totalPoints,
    totalSessions,
    activityLevel,
    lastSessionDate: lastSession?.startDate,
  };
}

export const mockSkipperRatings: SkipperRating[] = mockSkippers.map(s => computeRating(s.id));

// Demo user accounts
export const mockUsers: User[] = [
  { id: 'user-charter-1', email: 'demo@adriaticsailing.hr', role: 'charter', createdAt: '2024-01-15' },
  { id: 'user-skipper-1', email: 'oleksandr@example.com', role: 'skipper', createdAt: '2024-02-01' },
];
