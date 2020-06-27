import { Timestamp } from 'rxjs';

export interface Websites {
  id: number;
  name: string;
  home_url: string;
  last_full_test: string;
  category_id: number;
  ranking: number;
}
