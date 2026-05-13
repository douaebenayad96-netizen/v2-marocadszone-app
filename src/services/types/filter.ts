// category , title, min_price max_price, sort_by => newest,best_rates,lowest_price,highest_price
export type PrestationFilter = {
  category?: string;
  title?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
}

// search, category, sort_by => newest,most_reviews,highest_rating
export type PrestataireFilter = {
  search?: string;
  category?: number;
  sort_by?: string;
  city?: number;
  metier?: number;
}

// search, category, subcategory, city, country, sort_by for annonces
export type AnnonceFilter = {
  search?: string;
  category_id?: number;
  subcategory_id?: number;
  city_id?: number;
  country_id?: number;
  sort_by?: string;
}