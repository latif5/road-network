import { render, act } from '@testing-library/react';
import { useEffect } from 'react';
import useCalculateRoute from '../useCalculateRoute';
import { RoadNetwork } from '../../types';

jest.mock('../../utils', () => ({
  findShortestPath: jest.fn(() => ['NE 42nd Way', 'NE 42nd St'])
}));

describe('useCalculateRoute hook', () => {
  let initialRoads: RoadNetwork;

  beforeEach(() => {
    initialRoads = {
      'NE 42nd Way': {
        name: 'NE 42nd Way',
        congestion: 0,
        vehicles: { bike: 0, car: 0, bus: 0 }
      },
      'NE 42nd St': {
        name: 'NE 42nd St',
        congestion: 0,
        vehicles: { bike: 0, car: 0, bus: 0 }
      }
    };
  });

  test('calculates route correctly', () => {
    const setRoute = jest.fn();
    const TestComponent = () => {
      const calculateRoute = useCalculateRoute('NE 42nd Way', 'NE 42nd St', initialRoads, setRoute);

      useEffect(() => {
        calculateRoute();
      }, [calculateRoute]);

      return null;
    };

    render(<TestComponent />);
    jest.advanceTimersByTime(0);

    expect(setRoute).toHaveBeenCalledWith(['NE 42nd Way', 'NE 42nd St']);
  });

  test('alerts when start or end is missing', () => {
    global.alert = jest.fn();
    const setRoute = jest.fn();
    const TestComponent = () => {
      const calculateRoute = useCalculateRoute('', 'NE 42nd St', initialRoads, setRoute);

      useEffect(() => {
        calculateRoute();
      }, [calculateRoute]);

      return null;
    };

    render(<TestComponent />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(global.alert).toHaveBeenCalledWith("Please enter both start and end roads.");
  });
});