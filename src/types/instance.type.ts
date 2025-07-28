export interface Instance {
  message: string;
  sessionId: string;
  qrCode?: string;
  profile?: Profile;
  bussinessProfile?: BussinessProfile;
  avatarUrl?: string;
}

export interface Profile {
  id: string;
  name: string;
  lid: string;
}

export interface BussinessProfile {
  wid: string;
  description: string;
  website: string[];
  category: string;
  business_hours: BusinessHours;
}

export interface BusinessHours {
  timezone: string;
  business_config: BusinessConfig[];
}

export interface BusinessConfig {
  day_of_week: string;
  mode: string;
}
