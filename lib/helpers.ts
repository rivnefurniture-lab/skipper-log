import { ActivityLevel } from './types';

export function getActivityLabel(level: ActivityLevel): string {
  const labels: Record<ActivityLevel, string> = {
    newcomer: 'Newcomer',
    occasional: 'Occasional',
    regular: 'Regular',
    active: 'Active',
    enthusiast: 'Enthusiast',
    sea_lover: 'Sea Lover',
  };
  return labels[level] || level;
}

export function getActivityEmoji(level: ActivityLevel): string {
  const emojis: Record<ActivityLevel, string> = {
    newcomer: '',
    occasional: '',
    regular: '',
    active: '',
    enthusiast: '',
    sea_lover: '',
  };
  return emojis[level] || '';
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const startStr = s.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  const endStr = e.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  return `${startStr} - ${endStr}`;
}

export function getPointsColor(points: number): string {
  if (points >= 10) return '#2D6A4F';
  if (points >= 7) return '#F4A261';
  if (points >= 4) return '#E76F51';
  return '#E63946';
}

export function getStarsColor(stars: number): string {
  if (stars >= 4.5) return '#2D6A4F';
  if (stars >= 3.5) return '#F4A261';
  if (stars >= 2.5) return '#E76F51';
  return '#E63946';
}

export function getSessionStatusColor(status: string): string {
  switch (status) {
    case 'active': return '#2D6A4F';
    case 'scheduled': return '#5FA8D3';
    case 'closed': return '#ADB5BD';
    default: return '#ADB5BD';
  }
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function calculateExperience(firstSessionDate?: string): string {
  if (!firstSessionDate) return 'New';
  const first = new Date(firstSessionDate);
  const now = new Date();
  const years = now.getFullYear() - first.getFullYear();
  if (years < 1) return '< 1 year';
  if (years === 1) return '1 year';
  return `${years} years`;
}
