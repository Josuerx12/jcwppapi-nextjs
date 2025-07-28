export type Pagination<EntityT> = {
  data: EntityT[];
  page: number;
  perPage: number;
  totalIntems: number;
  totalPages: number;
};
