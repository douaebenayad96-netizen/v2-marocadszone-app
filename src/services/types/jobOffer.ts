export type TJobOfferImage = {
  id: number;
  url: string;
  mime_type: string;
};

export type TJobOffer = {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: "private" | "public";
  company_name?: string;
  location?: string;
  city: {
    id: number;
    name: string;
    label?: string;
    country_id?: number;
    country?: {
      id: number;
      label: string;
    };
  };
  redirect_to: string;
  images: TJobOfferImage[];
  created_at: string;
  updated_at: string;
};

export type TJobOfferResponse = {
  message: string;
  data: {
    items: TJobOffer[];
    pagination: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      from: number | null;
      to: number | null;
    };
  };
};

export type TJobOfferSingleResponse = {
  message: string;
  data: TJobOffer;
};

export type TJobOfferFilters = {
  per_page?: number;
  type?: "private" | "public";
  city_id?: number;
  city_name?: string;
  ville?: string;
  country_id?: number;
  country_name?: string;
  search?: string;
  sort_by?: "newest" | "oldest" | "title_asc" | "title_desc";
  page?: number;
};
