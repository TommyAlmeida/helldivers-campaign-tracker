export interface Campaign {
  id: string | number;
  startDate?: string;
  endDate?: string | null;
  status?: string;
  planetEvents?: PlanetEvent[];
  planetStatus?: PlanetStatus[];
  planet?: Planet;
  type?: number;
  count?: number;
}

export interface PlanetEvent {
  id: string;
  planetName: string;
  planetIndex: number;
  eventType: string;
  startDate: string;
  endDate: string | null;
  status: string;
}

export interface PlanetStatus {
  id: string;
  planetName: string;
  planetIndex: number;
  status: string;
  liberation: number;
  players: number;
  eventType: string | null;
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
  initialOwner: string;
  currentOwner: string;
  regenPerSecond: number;
  event: any | null;
  statistics: PlanetStatistics;
  attacking: any[];
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