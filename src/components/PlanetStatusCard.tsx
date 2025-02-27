import React from 'react';
import { PlanetStatus } from '../types/campaign';
import { Shield, Users, AlertCircle } from 'lucide-react';

interface PlanetStatusCardProps {
  planet: PlanetStatus;
}

const PlanetStatusCard: React.FC<PlanetStatusCardProps> = ({ planet }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'liberated':
        return 'bg-green-500';
      case 'under attack':
        return 'bg-red-500';
      case 'at peace':
        return 'bg-blue-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'liberated':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      case 'under attack':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'at peace':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30';
    }
  };

  const getEventIcon = () => {
    if (!planet.eventType) return null;
    
    switch (planet.eventType.toLowerCase()) {
      case 'major order':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <div className={`h-1 ${getStatusColor(planet.status)}`} />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white">{planet.planetName}</h3>
          <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(planet.status)}`}>
            {planet.status}
          </span>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Liberation</p>
              <div className="flex items-center">
                <div className="w-16 bg-gray-700 rounded-full h-1.5 mr-2">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${planet.liberation}%` }}
                  ></div>
                </div>
                <p className="text-white font-medium">{planet.liberation}%</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-400" />
            <div>
              <p className="text-xs text-gray-400">Players</p>
              <p className="text-white font-medium">{planet.players.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {planet.eventType && (
          <div className="mt-3 flex items-center space-x-2 bg-gray-700/50 p-2 rounded">
            {getEventIcon()}
            <span className="text-xs text-yellow-300">{planet.eventType}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetStatusCard;