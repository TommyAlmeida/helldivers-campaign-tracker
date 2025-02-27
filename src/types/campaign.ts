export type CampaignType = 0 | 1; // 0 = Liberation, 1 = Defense
export type CampaignStatus = "active" | "completed" | "failed";
export type PlanetOwner = "Humans" | "Terminids" | "Automatons" | "Illuminates";
export type EventType = "liberation" | "invasion" | "defend";

export interface Campaign {
  id: string | number;
  startDate: string;
  endDate?: string;
  status: CampaignStatus;
  planetEvents: PlanetEvent[];
  planetStatus: PlanetStatus[];
  planet?: Planet;
  type: CampaignType;
  count: number;
}

export interface PlanetEvent {
  id: string;
  planetName: string;
  planetIndex: number;
  eventType: EventType;
  startDate: string;
  endDate?: string;
  status: string;
}

export interface PlanetStatus {
  id: string;
  planetName: string;
  planetIndex: number;
  status: string;
  liberation: number;
  players: number;
  eventType: EventType | null;
}

export interface Planet {
  index: number;
  name: string;
  sector: string;
  biome: Biome;
  hazards: Hazard[];
  hash: number;
  position: Position;
  waypoints: number[];
  maxHealth: number;
  health: number;
  disabled: boolean;
  initialOwner: PlanetOwner;
  currentOwner: PlanetOwner;
  regenPerSecond: number;
  event: PlanetEvent | null;
  statistics: PlanetStatistics;
  attacking: PlanetStatus[];
}

export interface Biome {
  name: string;
  description: string;
}

export interface Hazard {
  name: string;
  description: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface PlanetStatistics {
  missionsWon: number;
  missionsLost: number;
  missionTime: number;
  terminidKills: number;
  automatonKills: number;
  illuminateKills: number;
  bulletsFired: number;
  bulletsHit: number;
  timePlayed: number;
  deaths: number;
  revives: number;
  friendlies: number;
  missionSuccessRate: number;
  accuracy: number;
  playerCount: number;
}
