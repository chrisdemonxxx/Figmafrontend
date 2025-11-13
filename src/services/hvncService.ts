const API_URL = '/api'; // Adjust based on your backend URL

interface HvncSessionConfig {
  quality: 'high' | 'medium' | 'low';
  mode: 'hidden' | 'visible' | 'shared';
}

interface HvncCommand {
  command: string;
  params: Record<string, any>;
}

class HvncService {
  async startSession(agentId: string, config: HvncSessionConfig) {
    const response = await fetch(`${API_URL}/hvnc/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
      },
      body: JSON.stringify({ agentId, ...config })
    });
    
    if (!response.ok) {
      throw new Error('Failed to start HVNC session');
    }
    
    return response.json();
  }

  async stopSession(agentId: string, sessionId: string) {
    const response = await fetch(`${API_URL}/hvnc/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
      },
      body: JSON.stringify({ agentId, sessionId })
    });
    
    if (!response.ok) {
      throw new Error('Failed to stop HVNC session');
    }
    
    return response.json();
  }

  async getSessionStatus(agentId: string, sessionId: string) {
    const response = await fetch(`${API_URL}/hvnc/status?agentId=${agentId}&sessionId=${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get session status');
    }
    
    return response.json();
  }

  async sendCommand(agentId: string, sessionId: string, command: HvncCommand) {
    const response = await fetch(`${API_URL}/hvnc/command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
      },
      body: JSON.stringify({ agentId, sessionId, ...command })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send command');
    }
    
    return response.json();
  }

  async takeScreenshot(agentId: string, sessionId: string) {
    const response = await fetch(`${API_URL}/hvnc/screenshot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
      },
      body: JSON.stringify({ agentId, sessionId })
    });
    
    if (!response.ok) {
      throw new Error('Failed to take screenshot');
    }
    
    return response.json();
  }
}

export const hvncService = new HvncService();
export type { HvncSessionConfig, HvncCommand };
