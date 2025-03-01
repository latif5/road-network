import { useState } from "react";
import { RoadNetwork } from "./types";
import { initialRoads } from "./data/roads";
import VehicleAction from "./components/VehicleAction";
import { useAddVehicle, useRemoveVehicle } from "./hooks/useManageVehicle";
import useCalculateRoute from "./hooks/useCalculateRoute";

function App() {
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [route, setRoute] = useState<string[]>([]);
  const [roads, setRoads] = useState<RoadNetwork>(initialRoads);

  const roadOptions = Object.keys(initialRoads);

  const handleAddVehicle = useAddVehicle(setRoads);
  const handleRemoveVehicle = useRemoveVehicle(setRoads);
  const handleCalculateRoute = useCalculateRoute(start, end, roads, setRoute);

  return (
    <>
      <div className="flex justify-center w-svw mx-auto p-4">
        <div className="bg-white shadow-lg w-[50%] rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Route Calculator</h1>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-base text-gray-700 mb-1">
                  Start Road
                </label>
                <select 
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  name="start" 
                  className="w-full col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="">Select start road</option>
                  {roadOptions.map(road => (
                    <option key={road} value={road}>{road}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-base text-gray-700 mb-1">
                  End Road
                </label>
                <select 
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="">Select end road</option>
                  {roadOptions.map(road => (
                    <option key={road} value={road}>{road}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleCalculateRoute}
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Find Route
            </button>
            {route.length > 0 && (
              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Calculated Route:</h2>
                <p className="text-lg text-gray-700">{route.join(' > ')}</p>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 my-4">Route Congestion</h1>
          <div className="grid grid-cols-3 gap-4">
            {Object.values(roads).map(road => (
              <VehicleAction
                key={road.name}
                road={road}
                onAddVehicle={handleAddVehicle}
                onRemoveVehicle={handleRemoveVehicle}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
