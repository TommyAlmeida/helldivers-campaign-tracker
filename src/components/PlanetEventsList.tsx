import React from 'react';
import { PlanetEvent } from '../types/campaign';
import { Calendar, Flag } from 'lucide-react';

interface PlanetEventsListProps {
  events: PlanetEvent[];
}

const PlanetEventsList: React.FC<PlanetEventsListProps> = ({ events }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case 'liberation':
        return 'bg-green-500';
      case 'invasion':
        return 'bg-red-500';
      case 'defend':
        return 'bg-blue-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {events.length === 0 ? (
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">No recent events</p>
        </div>
      ) : (
        events.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getEventTypeColor(event.eventType)}`} />
                <span className="text-white font-medium">{event.planetName}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                event.eventType.toLowerCase() === 'liberation' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : event.eventType.toLowerCase() === 'invasion'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {event.eventType}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400 mt-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Flag className="h-4 w-4 text-gray-400" />
              <span className={`text-sm ${
                event.status.toLowerCase() === 'completed' 
                  ? 'text-green-400' 
                  : event.status.toLowerCase() === 'failed'
                    ? 'text-red-400'
                    : 'text-gray-300'
              }`}>
                {event.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PlanetEventsList;