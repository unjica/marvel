export interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  prices: {
    type: string;
    price: number;
  }[];
  dates: {
    type: string;
    date: string;
  }[];
  format: string;
  pageCount: number;
  characters: {
    items: {
      name: string;
    }[];
  };
  creators: {
    items: {
      name: string;
      role: string;
    }[];
  };
  diamondCode: string;
} 