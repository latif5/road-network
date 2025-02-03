interface RoadConnections {
    [key: string]: string[];
}

export const roadConnections: RoadConnections = {
    'NE 42nd Way': ['NE 42nd St'],
    'NE 42nd St': ['NE 42nd Way', 'NE 39th St', '203rd Ave NE'],
    'NE 39th St': ['NE 42nd St', '204th Ave NE'],
    '204th Ave NE': ['NE 39th St', '206th PI NE'],
    '206th PI NE': ['204th Ave NE'],
    '203rd Ave NE': ['NE 42nd St', '204th Ave NE']
}; 