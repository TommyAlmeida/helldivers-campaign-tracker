import React from 'react';
import { Campaign } from '../types/campaign';
import { Shield, Target } from 'lucide-react';

interface ActiveCampaignsListProps {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  onSelectCampaign: (campaign: Campaign) => void;
}

const ActiveCampaignsList: React.FC<ActiveCampaignsListProps> = ({ 
  campaigns, 
  selectedCampaign,
  onSelectCampaign 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Active Campaigns</h2>
      
      {campaigns.length === 0 ? (
        <p className="text-gray-400">No active campaigns</p>
      ) : (
        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <div 
              key={campaign.id}
              className={`bg-gray-700 rounded-md p-3 cursor-pointer transition-colors ${
                selectedCampaign?.id === campaign.id 
                  ? 'ring-2 ring-blue-500' 
                  : 'hover:bg-gray-600'
              }`}
              onClick={() => onSelectCampaign(campaign)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {campaign.type === 0 ? (
                    <Target className="h-4 w-4 text-red-400" />
                  ) : (
                    <Shield className="h-4 w-4 text-blue-400" />
                  )}
                  <span className="text-white font-medium">
                    {campaign.planet?.name || `Campaign #${campaign.id}`}
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-300">
                  {campaign.type === 0 ? 'Liberation' : 'Defense'}
                </span>
              </div>
              
              {campaign.planet && (
                <>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Sector: {campaign.planet.sector}</span>
                    <span>{campaign.planet.currentOwner}</span>
                  </div>
                  
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        campaign.planet.currentOwner === 'Humans' 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${(campaign.planet.health / campaign.planet.maxHealth) * 100}%` }}
                    ></div>
                  </div>
                  
                  {campaign.planet.hazards && campaign.planet.hazards.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {campaign.planet.hazards.map((hazard, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-1.5 py-0.5 rounded bg-gray-600 text-gray-300"
                          title={hazard.description}
                        >
                          {hazard.name}
                        </span>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveCampaignsList;