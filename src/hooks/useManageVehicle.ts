import { useCallback } from 'react';
import { RoadNetwork, VehicleType, CONGESTION_VALUES } from '../types';

export const useAddVehicle = (setRoads: React.Dispatch<React.SetStateAction<RoadNetwork>>) => {
  return useCallback((roadName: string, vehicleType: VehicleType) => {
    setRoads(prevRoads => {
      const road = prevRoads[roadName];
      const updatedVehicles = {
        ...road.vehicles,
        [vehicleType]: road.vehicles[vehicleType] + 1
      };

      const newCongestion = Object.entries(updatedVehicles).reduce(
        (total, [type, count]) => total + (CONGESTION_VALUES[type as VehicleType] * count),
        0
      );

      return {
        ...prevRoads,
        [roadName]: {
          ...road,
          vehicles: updatedVehicles,
          congestion: newCongestion
        }
      };
    });
  }, [setRoads]);
};

export const useRemoveVehicle = (setRoads: React.Dispatch<React.SetStateAction<RoadNetwork>>) => {
  return useCallback((roadName: string, vehicleType: VehicleType) => {
    setRoads(prevRoads => {
      const road = prevRoads[roadName];
      if (road.vehicles[vehicleType] === 0) return prevRoads;

      const updatedVehicles = {
        ...road.vehicles,
        [vehicleType]: road.vehicles[vehicleType] - 1
      };

      const newCongestion = Object.entries(updatedVehicles).reduce(
        (total, [type, count]) => total + (CONGESTION_VALUES[type as VehicleType] * count),
        0
      );

      return {
        ...prevRoads,
        [roadName]: {
          ...road,
          vehicles: updatedVehicles,
          congestion: newCongestion
        }
      };
    });
  }, [setRoads]);
};
