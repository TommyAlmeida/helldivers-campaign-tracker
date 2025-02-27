import React from 'react';
import { Campaign } from '../types/campaign';
import { AlertTriangle, CheckCircle, Clock, Shield, Users, Target } from 'lucide-react';

interface CampaignStatusProps {
  campaign: Campaign;
}

const CampaignStatus: React.FC<CampaignStatusProps> = ({ campaign }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: string | undefined) => {
    if (!status) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    
    switch (status.toLowerCase()) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  // If we have a planet object, display planet-specific information
  if (campaign.planet) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Campaign Details</h2>
          {campaign.type === 0 ? (
            <Target className="h-5 w-5 text-red-400" />
          ) : (
            <Shield className="h-5 w-5 text-blue-400" />
          )}
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-gray-400 text-xs mb-1">Campaign ID</p>
            <p className="text-white font-medium">#{campaign.id}</p>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-gray-400 text-xs mb-1">Type</p>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                campaign.type === 0 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {campaign.type === 0 ? 'Liberation' : 'Defense'}
              </span>
            </div>
          </div>
          
          <div className="bg-gray-700 p-3 rounded-md">
            <p className="text-gray-400 text-xs mb-1">Planet Owner</p>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                campaign.planet.currentOwner === 'Humans' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {campaign.planet.currentOwner}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-md">
              <Shield className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Regen</p>
                <p className="text-white font-medium">{campaign.planet.regenPerSecond.toFixed(2)}/s</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-md">
              <Users className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Players</p>
                <p className="text-white font-medium">
                  {campaign.planet.statistics?.playerCount.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fall back to the original display if we don't have planet data
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Campaign Status</h2>
        <div className="flex items-center space-x-2">
          {getStatusIcon(campaign.status)}
          <span className="text-white capitalize">{campaign.status || 'Unknown'}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-gray-400 text-sm">Start Date</p>
          <p className="text-white font-medium">
            {campaign.startDate ? formatDate(campaign.startDate) : 'Unknown'}
          </p>
        </div>
        <div className="bg-gray-700 p-3 rounded-md">
          <p className="text-gray-400 text-sm">End Date</p>
          <p className="text-white font-medium">
            {campaign.endDate ? formatDate(campaign.endDate) : 'Ongoing'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignStatus;