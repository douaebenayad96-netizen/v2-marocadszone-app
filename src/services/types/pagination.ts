export type Paginationtype<T> = {
  data: T[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number; // total pages
  last_page_url: string;
  total: number;
  per_page?: number;
};

export type PaginationV2<T> = {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: string[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};

// Type for the new annonces API response structure
export type AnnoncesApiResponse<T> = {
  message: string;
  data: {
    items: T[];
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
    };
  };
};
