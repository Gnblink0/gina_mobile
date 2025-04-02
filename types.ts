export interface GoalData {
  text: string;
}

export interface User {
  id: number;
  address: {
    geo: {
      latitude: number;
      longitude: number;
    };
  };
}

