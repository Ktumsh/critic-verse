export enum Platform {
  PLAYSTATION5 = 'PS5',
  PLAYSTATION4 = 'PS4',
  XBOXONE = 'Xbox One',
  PC = 'PC',
  NINTENDOSWITCH = 'Nintendo Switch',
  WINDOWS = 'Windows',
  MACOS = 'macOS',
  IOS = 'iOS',
  ANDROID = 'Android',
}

export const getPlatFormIcon = (platform: string) => {
  switch (platform) {
    case Platform.PLAYSTATION5:
      return 'playstation';
    case Platform.PLAYSTATION4:
      return 'playstation';
    case Platform.XBOXONE:
      return 'xbox';
    case Platform.PC:
      return 'windows';
    case Platform.NINTENDOSWITCH:
      return 'nintendo';
    case Platform.WINDOWS:
      return 'win';
    case Platform.MACOS:
      return 'apple';
    case Platform.IOS:
      return 'apple';
    case Platform.ANDROID:
      return 'android';
    default:
      return 'win';
  }
};