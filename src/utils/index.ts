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

    while (unvisited.size > 0) {
        let current = '';
        let minDistance = Infinity;
        for (const road of unvisited) {
            if (distances[road] < minDistance) {
                minDistance = distances[road];
                current = road;
            }
        }

        if (current === end) break;

        for (const neighbor of graph[current]) {
            if (!unvisited.has(neighbor)) continue;
            const congestionWeight = roads[neighbor].congestion;
            const newDistance = distances[current] + 1 + congestionWeight; 

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = current;
            }
        }
        unvisited.delete(current);
    }

    const path: string[] = [];
    let current: string | null = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return path;
}
