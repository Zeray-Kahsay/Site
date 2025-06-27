import { Item } from "./Item";
import { MetaData } from "./MetaData";

export interface PaginatedItemsResponse {
  items: Item[];
  metaData: MetaData;
}
