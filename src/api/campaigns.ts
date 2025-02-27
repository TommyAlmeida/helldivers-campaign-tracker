const API_BASE_URL = "https://api.helldivers2.dev/api/v1";

const DEFAULT_HEADERS = {
  accept: "application/json",
  "X-Super-Client": "localhost",
  "X-Super-Contact": "tomasrsd",
};

async function makeApiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchCampaigns() {
  try {
    return await makeApiRequest("/campaigns");
  } catch (error) {
    console.error("Error fetching campaign data:", error);
    throw error;
  }
}

export async function fetchCampaignById(id: string) {
  try {
    return await makeApiRequest(`/campaigns/${id}`);
  } catch (error) {
    console.error("Error fetching campaign by ID:", error);
    throw error;
  }
}
