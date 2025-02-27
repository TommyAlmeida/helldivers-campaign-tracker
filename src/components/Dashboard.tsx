import React, { useEffect, useState } from 'react';
import { fetchCampaigns } from '../api/campaigns';
import { Campaign } from '../types/campaign';
import CampaignStatus from './CampaignStatus';
import PlanetStatusCard from './PlanetStatusCard';
import PlanetEventsList from './PlanetEventsList';
import ActiveCampaignsList from './ActiveCampaignsList';
import { AlertCircle, Filter, Loader2, Search } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    const loadCampaignData = async () => {
      try {
        setLoading(true);
        const data = await fetchCampaigns();
        // Check if we have campaign data
        if (data && data.length > 0) {
          setCampaigns(data);
          setFilteredCampaigns(data);
          setSelectedCampaign(data[0]);
        } else {
          setError('No campaign data available');
        }
      } catch (err) {
        setError('Failed to load campaign data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCampaignData();
  }, []);

  useEffect(() => {
    // Filter campaigns based on search term and filter type
    let filtered = campaigns;
    
    if (searchTerm) {
      filtered = filtered.filter(campaign => 
        campaign.planet?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.planet?.sector.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      const typeValue = filterType === 'liberation' ? 0 : 1;
      filtered = filtered.filter(campaign => campaign.type === typeValue);
    }
    
    setFilteredCampaigns(filtered);
    
    // If the selected campaign is no longer in the filtered list, select the first one
    if (filtered.length > 0 && selectedCampaign && !filtered.some(c => c.id === selectedCampaign.id)) {
      setSelectedCampaign(filtered[0]);
    }
  }, [campaigns, searchTerm, filterType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Loading Helldivers 2 campaign data...</p>
        </div>
      </div>
    );
  }

  if (error || !campaigns.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
          <div className="flex items-center space-x-3 text-red-500 mb-4">
            <AlertCircle className="h-6 w-6" />
            <h2 className="text-xl font-bold">Error</h2>
          </div>
          <p className="text-white">{error || 'Failed to load campaign data'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Ensure planetStatus and planetEvents exist and are arrays before rendering
  const planetStatus = selectedCampaign?.planetStatus || [];
  const planetEvents = selectedCampaign?.planetEvents || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Helldivers 2 Campaign Dashboard</h1>
        <p className="text-gray-400">Real-time status of the galactic war</p>
        
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search planets or sectors..."
              className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Campaigns</option>
              <option value="liberation">Liberation</option>
              <option value="defense">Defense</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold text-white mb-4">Active Campaigns ({filteredCampaigns.length})</h2>
            
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCampaigns.length === 0 ? (
                <p className="text-gray-400">No campaigns match your filters</p>
              ) : (
                <div className="space-y-3">
                  {filteredCampaigns.map((campaign) => (
                    <div 
                      key={campaign.id}
                      className={`bg-gray-700 rounded-md p-3 cursor-pointer transition-colors ${
                        selectedCampaign?.id === campaign.id 
                          ? 'ring-2 ring-blue-500' 
                          : 'hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${campaign.type === 0 ? 'bg-red-400' : 'bg-blue-400'}`}></div>
                          <span className="text-white font-medium truncate">
                            {campaign.planet?.name || `Campaign #${campaign.id}`}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-600 text-gray-300 whitespace-nowrap">
                          {campaign.type === 0 ? 'Liberation' : 'Defense'}
                        </span>
                      </div>
                      
                      {campaign.planet && (
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span className="truncate">{campaign.planet.sector}</span>
                          <span className={campaign.planet.currentOwner === 'Humans' ? 'text-green-400' : 'text-red-400'}>
                            {campaign.planet.currentOwner}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {selectedCampaign && (
            <CampaignStatus campaign={selectedCampaign} />
          )}
        </div>
        
        <div className="lg:col-span-3">
          {selectedCampaign?.planet ? (
            <div className="bg-gray-800 rounded-lg p-4 shadow-md mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-2xl font-bold mb-2 md:mb-0">
                  {selectedCampaign.planet.name}
                  <span className="ml-2 text-sm font-normal text-gray-400">{selectedCampaign.planet.sector} Sector</span>
                </h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    selectedCampaign.type === 0 
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {selectedCampaign.type === 0 ? 'Liberation' : 'Defense'}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    selectedCampaign.planet.currentOwner === 'Humans' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {selectedCampaign.planet.currentOwner}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-gray-400 text-sm">Planet Health</p>
                  <p className="text-sm text-gray-400">
                    {Math.round((selectedCampaign.planet.health / selectedCampaign.planet.maxHealth) * 100)}%
                  </p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      selectedCampaign.planet.currentOwner === 'Humans' 
                        ? 'bg-gradient-to-r from-green-500 to-green-400' 
                        : 'bg-gradient-to-r from-red-600 to-red-500'
                    }`}
                    style={{ width: `${(selectedCampaign.planet.health / selectedCampaign.planet.maxHealth) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedCampaign.planet.health.toLocaleString()} / {selectedCampaign.planet.maxHealth.toLocaleString()}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Regen Rate</p>
                  <p className="text-white text-xl font-semibold">{selectedCampaign.planet.regenPerSecond.toFixed(2)}/s</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Active Players</p>
                  <p className="text-white text-xl font-semibold">{selectedCampaign.planet.statistics?.playerCount.toLocaleString() || 0}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Success Rate</p>
                  <p className="text-white text-xl font-semibold">{selectedCampaign.planet.statistics?.missionSuccessRate || 0}%</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Enemy Kills</p>
                  <p className="text-white text-xl font-semibold">{selectedCampaign.planet.statistics?.automatonKills.toLocaleString() || 0}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Biome</h3>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-white font-medium">{selectedCampaign.planet.biome.name}</p>
                    <p className="text-gray-400 mt-2 text-sm">{selectedCampaign.planet.biome.description}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Hazards</h3>
                  {selectedCampaign.planet.hazards && selectedCampaign.planet.hazards.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCampaign.planet.hazards.map((hazard, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded-lg">
                          <p className="text-white font-medium">{hazard.name}</p>
                          <p className="text-xs text-gray-400 mt-1">{hazard.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-400">No hazards detected</p>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedCampaign.planet.statistics && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Detailed Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Missions Won</p>
                      <p className="text-white font-medium">{selectedCampaign.planet.statistics.missionsWon.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Missions Lost</p>
                      <p className="text-white font-medium">{selectedCampaign.planet.statistics.missionsLost.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Deaths</p>
                      <p className="text-white font-medium">{selectedCampaign.planet.statistics.deaths.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <p className="text-gray-400 text-xs">Friendly Fire</p>
                      <p className="text-white font-medium">{selectedCampaign.planet.statistics.friendlies.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-lg mb-6 text-center">
              <p className="text-gray-400">Select a campaign to view details</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Recent Events</h2>
              {planetEvents && planetEvents.length > 0 ? (
                <PlanetEventsList events={planetEvents} />
              ) : (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400">No recent events available</p>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Planet Status</h2>
              {planetStatus && planetStatus.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {planetStatus.map((planet) => (
                    <PlanetStatusCard key={planet.id} planet={planet} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400">No planet status data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;