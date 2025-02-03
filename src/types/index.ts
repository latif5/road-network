export type VehicleType = 'bike' | 'car' | 'bus';

export interface Road {
    name: string;
    congestion: number;
    vehicles: {
        [key in VehicleType]: number;
    };
}

export interface RoadNetwork {
    [key: string]: Road;
}

export const CONGESTION_VALUES: Record<VehicleType, number> = {
    bike: 1,
    car: 2,
    bus: 4,
}; 

export interface Graph {
    [key: string]: string[];
}
