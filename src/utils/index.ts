import { Graph, RoadNetwork } from '../types';

// Dijkstra’s Algthm to find the shortest path roads
export function findShortestPath(start: string, end: string, roads: RoadNetwork, graph: Graph): string[] {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const unvisited: Set<string> = new Set(Object.keys(roads));

    for (const road in roads) {
        distances[road] = Infinity;
        previous[road] = null;
    }
    distances[start] = 0;



}
