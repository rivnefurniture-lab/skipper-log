export const Colors = {
  // Primary palette - nautical theme
  navy: '#0B1D33',
  deepBlue: '#1B4965',
  oceanBlue: '#5FA8D3',
  lightBlue: '#BEE9E8',
  skyBlue: '#E6F4FE',

  // Accent
  sunset: '#F4A261',
  coral: '#E76F51',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
  lightGray: '#E9ECEF',
  mediumGray: '#ADB5BD',
  darkGray: '#495057',
  charcoal: '#212529',

  // Semantic
  success: '#2D6A4F',
  successLight: '#D8F3DC',
  danger: '#E63946',
  dangerLight: '#FFE0E3',
  warning: '#F4A261',
  warningLight: '#FFF3E0',

  // Backgrounds
  bg: '#F0F4F8',
  card: '#FFFFFF',
  overlay: 'rgba(11, 29, 51, 0.5)',
} as const;

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;
