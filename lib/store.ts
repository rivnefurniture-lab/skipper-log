import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  UserRole,
  Skipper,
  Certificate,
  Vessel,
  Session,
  SkipperRating,
  CharterCompany,
  SessionStatus,
  ActivityLevel,
} from './types';
import {
  mockUsers,
  mockSkippers,
  mockCertificates,
  mockVessels,
  mockSessions,
  mockSkipperRatings,
  mockCharterCompanies,
} from './mockData';

interface AppState {
  // Auth
  currentUser: User | null;
  isLoading: boolean;

  // Data
  skippers: Skipper[];
  certificates: Certificate[];
  vessels: Vessel[];
  sessions: Session[];
  skipperRatings: SkipperRating[];
  charterCompanies: CharterCompany[];

  // Actions - Auth
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, role: UserRole, extra: Record<string, string>) => Promise<boolean>;
  logout: () => void;
  restoreSession: () => Promise<void>;

  // Actions - Data
  getSkipperProfile: (skipperId: string) => {
    skipper: Skipper | undefined;
    certificates: Certificate[];
    rating: SkipperRating | undefined;
    sessions: (Session & { vessel?: Vessel; charterCompany?: CharterCompany })[];
  };
  getCompanySessions: (companyId: string) => (Session & { skipper?: Skipper; vessel?: Vessel })[];
  getSkipperSessions: (skipperId: string) => (Session & { vessel?: Vessel; charterCompany?: CharterCompany })[];
  searchSkippers: (query: string) => (Skipper & { rating?: SkipperRating; certificate?: Certificate })[];
  findSkipperByQR: (qrCode: string) => Skipper | undefined;

  // Actions - Mutations
  createSession: (session: Omit<Session, 'id' | 'createdAt' | 'status'>) => Session;
  closeSession: (sessionId: string, rating: { starRating: number; penaltyPoints: number; friendliness: number; comment?: string }) => void;
  addSkipper: (skipper: Omit<Skipper, 'id' | 'createdAt' | 'qrCode'>) => Skipper;
  addCertificate: (cert: Omit<Certificate, 'id' | 'createdAt'>) => Certificate;
  addVessel: (vessel: Omit<Vessel, 'id' | 'createdAt'>) => Vessel;
  recalculateRating: (skipperId: string) => void;
  getCurrentCharterCompany: () => CharterCompany | undefined;
  getSkipperForCurrentUser: () => Skipper | undefined;
}

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  isLoading: true,
  skippers: [...mockSkippers],
  certificates: [...mockCertificates],
  vessels: [...mockVessels],
  sessions: [...mockSessions],
  skipperRatings: [...mockSkipperRatings],
  charterCompanies: [...mockCharterCompanies],

  login: async (email: string, _password: string) => {
    // Demo mode: match by email prefix
    const demoUser = mockUsers.find(u => u.email === email);
    if (demoUser) {
      set({ currentUser: demoUser });
      await AsyncStorage.setItem('currentUser', JSON.stringify(demoUser));
      return true;
    }
    // Check registered users in storage
    const stored = await AsyncStorage.getItem('registeredUsers');
    if (stored) {
      const users: User[] = JSON.parse(stored);
      const user = users.find(u => u.email === email);
      if (user) {
        set({ currentUser: user });
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
    }
    // For demo, accept any email
    const newUser: User = {
      id: generateId(),
      email,
      role: email.includes('charter') || email.includes('company') ? 'charter' : 'skipper',
      createdAt: new Date().toISOString(),
    };
    set({ currentUser: newUser });
    await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  },

  register: async (email: string, _password: string, role: UserRole, extra: Record<string, string>) => {
    const newUser: User = {
      id: generateId(),
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    if (role === 'charter') {
      const company: CharterCompany = {
        id: generateId(),
        userId: newUser.id,
        companyName: extra.companyName || 'My Charter Company',
        country: extra.country || '',
        createdAt: new Date().toISOString(),
      };
      set(s => ({ charterCompanies: [...s.charterCompanies, company] }));
    } else {
      const skipper: Skipper = {
        id: generateId(),
        firstName: extra.firstName || '',
        lastName: extra.lastName || '',
        languages: extra.languages ? extra.languages.split(',').map(l => l.trim()) : [],
        qrCode: `SKIP-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
      };
      set(s => ({
        skippers: [...s.skippers, skipper],
        skipperRatings: [...s.skipperRatings, {
          skipperId: skipper.id,
          averageStars: 5,
          totalPoints: 12,
          totalSessions: 0,
          activityLevel: 'newcomer' as ActivityLevel,
        }],
      }));
    }

    // Save to storage
    const stored = await AsyncStorage.getItem('registeredUsers');
    const users: User[] = stored ? JSON.parse(stored) : [];
    users.push(newUser);
    await AsyncStorage.setItem('registeredUsers', JSON.stringify(users));

    set({ currentUser: newUser });
    await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  },

  logout: () => {
    set({ currentUser: null });
    AsyncStorage.removeItem('currentUser');
  },

  restoreSession: async () => {
    try {
      const stored = await AsyncStorage.getItem('currentUser');
      if (stored) {
        set({ currentUser: JSON.parse(stored), isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  getSkipperProfile: (skipperId: string) => {
    const state = get();
    const skipper = state.skippers.find(s => s.id === skipperId);
    const certificates = state.certificates.filter(c => c.skipperId === skipperId);
    const rating = state.skipperRatings.find(r => r.skipperId === skipperId);
    const sessions = state.sessions
      .filter(s => s.skipperId === skipperId)
      .sort((a, b) => b.startDate.localeCompare(a.startDate))
      .map(s => ({
        ...s,
        vessel: state.vessels.find(v => v.id === s.vesselId),
        charterCompany: state.charterCompanies.find(c => c.id === s.charterCompanyId),
      }));
    return { skipper, certificates, rating, sessions };
  },

  getCompanySessions: (companyId: string) => {
    const state = get();
    return state.sessions
      .filter(s => s.charterCompanyId === companyId)
      .sort((a, b) => b.startDate.localeCompare(a.startDate))
      .map(s => ({
        ...s,
        skipper: state.skippers.find(sk => sk.id === s.skipperId),
        vessel: state.vessels.find(v => v.id === s.vesselId),
      }));
  },

  getSkipperSessions: (skipperId: string) => {
    const state = get();
    return state.sessions
      .filter(s => s.skipperId === skipperId)
      .sort((a, b) => b.startDate.localeCompare(a.startDate))
      .map(s => ({
        ...s,
        vessel: state.vessels.find(v => v.id === s.vesselId),
        charterCompany: state.charterCompanies.find(c => c.id === s.charterCompanyId),
      }));
  },

  searchSkippers: (query: string) => {
    const state = get();
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return state.skippers
      .filter(s =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
        s.qrCode.toLowerCase().includes(q)
      )
      .map(s => ({
        ...s,
        rating: state.skipperRatings.find(r => r.skipperId === s.id),
        certificate: state.certificates.find(c => c.skipperId === s.id),
      }));
  },

  findSkipperByQR: (qrCode: string) => {
    return get().skippers.find(s => s.qrCode === qrCode);
  },

  createSession: (session) => {
    const newSession: Session = {
      ...session,
      id: generateId(),
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };
    // Auto-activate if start date is today or past
    const today = new Date().toISOString().split('T')[0];
    if (newSession.startDate <= today) {
      newSession.status = 'active';
    }
    set(s => ({ sessions: [...s.sessions, newSession] }));
    return newSession;
  },

  closeSession: (sessionId, rating) => {
    set(s => ({
      sessions: s.sessions.map(ses =>
        ses.id === sessionId
          ? {
              ...ses,
              status: 'closed' as SessionStatus,
              starRating: rating.starRating,
              penaltyPoints: rating.penaltyPoints,
              friendliness: rating.friendliness,
              comment: rating.comment,
              closedAt: new Date().toISOString(),
            }
          : ses
      ),
    }));
    const session = get().sessions.find(s => s.id === sessionId);
    if (session) {
      get().recalculateRating(session.skipperId);
    }
  },

  addSkipper: (data) => {
    const skipper: Skipper = {
      ...data,
      id: generateId(),
      qrCode: `SKIP-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    const rating: SkipperRating = {
      skipperId: skipper.id,
      averageStars: 5,
      totalPoints: 12,
      totalSessions: 0,
      activityLevel: 'newcomer',
    };
    set(s => ({
      skippers: [...s.skippers, skipper],
      skipperRatings: [...s.skipperRatings, rating],
    }));
    return skipper;
  },

  addCertificate: (data) => {
    const cert: Certificate = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set(s => ({ certificates: [...s.certificates, cert] }));
    return cert;
  },

  addVessel: (data) => {
    const vessel: Vessel = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set(s => ({ vessels: [...s.vessels, vessel] }));
    return vessel;
  },

  recalculateRating: (skipperId: string) => {
    const state = get();
    const sessions = state.sessions.filter(s => s.skipperId === skipperId && s.status === 'closed');
    const totalSessions = sessions.length;

    const ratedSessions = sessions.filter(s => s.starRating !== undefined);
    const averageStars = ratedSessions.length > 0
      ? Math.round((ratedSessions.reduce((sum, s) => sum + (s.starRating || 0), 0) / ratedSessions.length) * 10) / 10
      : 5;

    const totalPenalty = sessions.reduce((sum, s) => sum + (s.penaltyPoints || 0), 0);
    const totalPoints = Math.max(0, 12 - totalPenalty);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const recentCount = sessions.filter(s => new Date(s.startDate) >= oneYearAgo).length;

    let activityLevel: ActivityLevel = 'newcomer';
    if (recentCount >= 6) activityLevel = 'sea_lover';
    else if (recentCount >= 5) activityLevel = 'enthusiast';
    else if (recentCount >= 4) activityLevel = 'active';
    else if (recentCount >= 3) activityLevel = 'regular';
    else if (recentCount >= 2) activityLevel = 'occasional';

    const lastSession = sessions.sort((a, b) => b.startDate.localeCompare(a.startDate))[0];

    set(s => ({
      skipperRatings: s.skipperRatings.map(r =>
        r.skipperId === skipperId
          ? { skipperId, averageStars, totalPoints, totalSessions, activityLevel, lastSessionDate: lastSession?.startDate }
          : r
      ),
    }));
  },

  getCurrentCharterCompany: () => {
    const state = get();
    if (!state.currentUser || state.currentUser.role !== 'charter') return undefined;
    return state.charterCompanies.find(c => c.userId === state.currentUser!.id);
  },

  getSkipperForCurrentUser: () => {
    const state = get();
    if (!state.currentUser || state.currentUser.role !== 'skipper') return undefined;
    // For demo, return first skipper if user email matches
    if (state.currentUser.email === 'oleksandr@example.com') {
      return state.skippers.find(s => s.id === 'sk-1');
    }
    return state.skippers.find(s => s.id === state.currentUser!.id);
  },
}));
