export async function fetchCampaigns() {
  try {
    const response = await fetch('https://api.helldivers2.dev/api/v1/campaigns', {
      headers: {
        'accept': 'application/json',
        'X-Super-Client': 'localhost',
        'X-Super-Contact': 'tomasrsd'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching campaign data:', error);
    throw error;
  }
}