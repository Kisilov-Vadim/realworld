export type ResponseValue<V> = {
  value?: V;
  error?: string;
};

export type LimitParams = {
  limit: number;
  page: number;
};
