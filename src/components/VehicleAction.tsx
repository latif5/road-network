import React from 'react';
import { Road, VehicleType } from '../types';

interface VehicleActionProps {
    road: Road;
    onAddVehicle: (roadName: string, vehicleType: VehicleType) => void;
    onRemoveVehicle: (roadName: string, vehicleType: VehicleType) => void;
}

const VehicleAction: React.FC<VehicleActionProps> = ({ road, onAddVehicle, onRemoveVehicle }) => {
    const vehicleTypes: VehicleType[] = ['bike', 'car', 'bus'];

    return (
        <div className="border rounded p-4 mb-4 bg-white border-blue-400">
            <h3 className="font-semibold mb-2">{road.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
                Congestion Level: {road.congestion}
            </p>
            <div className="space-y-2">
                {vehicleTypes.map((type) => (
                    <div key={type} className="flex items-center justify-between">
                        <span className="capitalize">{type}</span>
                        <div className="space-x-2">
                            <span className="text-sm">{road.vehicles[type]}</span>
                            <button
                                onClick={() => onAddVehicle(road.name, type)}
                                className="px-2 py-0.5 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                +
                            </button>
                            <button
                                onClick={() => onRemoveVehicle(road.name, type)}
                                className="px-2.5 py-0.5 bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={road.vehicles[type] === 0}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleAction; 