import React from "react";
import { Campaign, Hazard } from "../types/campaign";
import { Shield, Target } from "lucide-react";

interface ActiveCampaignsListProps {
  campaigns: Campaign[];
  selectedCampaign: Campaign | null;
  onSelectCampaign: (campaign: Campaign) => void;
}

const CampaignIcon = ({ type }: { type: number }) =>
  type === 0 ? (
    <Target className="h-4 w-4 text-red-400" />
  ) : (
    <Shield className="h-4 w-4 text-blue-400" />
  );

const CampaignHeader = ({ campaign }: { campaign: Campaign }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center space-x-2">
      <CampaignIcon type={campaign.type ?? 0} />
      <span className="text-white font-medium">
        {campaign.planet?.name || `Campaign #${campaign.id}`}
      </span>
    </div>
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-300">
      {campaign.type === 0 ? "Liberation" : "Defense"}
    </span>
  </div>
);

const PlanetHealthBar = ({ planet }: { planet: Campaign["planet"] }) => {
  if (!planet) return null;

  return (
    <div className="w-full bg-gray-600 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full ${
          planet.currentOwner === "Humans" ? "bg-green-500" : "bg-red-500"
        }`}
        style={{
          width: `${(planet.health / planet.maxHealth) * 100}%`,
        }}
      ></div>
    </div>
  );
};

const PlanetHazards = ({ hazards }: { hazards: Hazard[] }) => {
  if (!hazards?.length) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {hazards.map((hazard, index) => (
        <span
          key={index}
          className="text-xs px-1.5 py-0.5 rounded bg-gray-600 text-gray-300"
          title={hazard.description}
        >
          {hazard.name}
        </span>
      ))}
    </div>
  );
};

const CampaignCard = ({
  campaign,
  isSelected,
  onSelect,
}: {
  campaign: Campaign;
  isSelected: boolean;
  onSelect: (campaign: Campaign) => void;
}) => (
  <div
    key={campaign.id}
    className={`bg-gray-700 rounded-md p-3 cursor-pointer transition-colors ${
      isSelected ? "border border-blue-500" : "hover:bg-gray-600"
    }`}
    onClick={() => onSelect(campaign)}
  >
    <CampaignHeader campaign={campaign} />

    {campaign.planet && (
      <>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Sector: {campaign.planet.sector}</span>
          <span>{campaign.planet.currentOwner}</span>
        </div>

        <PlanetHealthBar planet={campaign.planet} />
        <PlanetHazards hazards={campaign.planet.hazards} />
      </>
    )}
  </div>
);

const ActiveCampaignsList: React.FC<ActiveCampaignsListProps> = ({
  campaigns,
  selectedCampaign,
  onSelectCampaign,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">Active Campaigns</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-400">No active campaigns</p>
      ) : (
        <div className="space-y-3">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              isSelected={selectedCampaign?.id === campaign.id}
              onSelect={onSelectCampaign}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveCampaignsList;
