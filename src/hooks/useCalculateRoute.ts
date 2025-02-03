import { useCallback } from 'react';
import { RoadNetwork } from '../types';
import { findShortestPath } from '../utils';
import { roadConnections } from '../data/roadConnections';

const useCalculateRoute = (
  start: string,
  end: string,
  roads: RoadNetwork,
  setRoute: React.Dispatch<React.SetStateAction<string[]>>
) => {
  return useCallback(() => {
    if (!start || !end) {
      alert("Please enter both start and end roads.");
      return;
    }

    const calculatedRoute = findShortestPath(start, end, roads, roadConnections);
    if (calculatedRoute.length === 0) {
      alert("No valid route found.");
    } else {
      setRoute(calculatedRoute);
    }
  }, [start, end, roads, setRoute]);
};

export default useCalculateRoute; 