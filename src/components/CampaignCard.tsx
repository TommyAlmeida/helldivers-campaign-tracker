import { Campaign } from "../types/campaign";

interface CampaignHeaderProps {
  campaign: Campaign;
}

const CampaignTypeIndicator = ({ type }: { type: number }) => (
  <div
    className={`w-2 h-2 rounded-full ${
      type === 0 ? "bg-red-400" : "bg-blue-400"
    }`}
  ></div>
);

const CampaignName = ({ campaign }: CampaignHeaderProps) => (
  <span className="text-white font-medium truncate max-w-[100px] block">
    {campaign.planet?.name || `Campaign #${campaign.id}`}
  </span>
);

const CampaignType = ({ type }: { type: number }) => (
  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-300 whitespace-nowrap">
    {type === 0 ? "Liberation" : "Defense"}
  </span>
);

const CampaignHeader = ({ campaign }: CampaignHeaderProps) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center space-x-2">
      <CampaignTypeIndicator type={campaign.type} />
      <CampaignName campaign={campaign} />
    </div>
    <CampaignType type={campaign.type} />
  </div>
);

const PlanetInfo = ({ planet }: { planet: Campaign["planet"] }) => {
  if (!planet) return null;

  return (
    <div className="flex justify-between text-xs text-gray-400 mb-1">
      <span className="truncate">{planet.sector}</span>
      <span
        className={
          planet.currentOwner === "Humans" ? "text-green-400" : "text-red-400"
        }
      >
        {planet.currentOwner}
      </span>
    </div>
  );
};

interface CampaignCardProps {
  campaign: Campaign;
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign) => void;
}

export const CampaignCard = ({
  campaign,
  selectedCampaign,
  setSelectedCampaign,
}: CampaignCardProps) => {
  return (
    <div
      key={campaign.id}
      className={`bg-gray-700 rounded-md p-3 cursor-pointer transition-colors ${
        selectedCampaign?.id === campaign.id
          ? "border border-blue-500"
          : "hover:bg-gray-600"
      }`}
      onClick={() => setSelectedCampaign(campaign)}
    >
      <CampaignHeader campaign={campaign} />
      <PlanetInfo planet={campaign.planet} />
    </div>
  );
};
