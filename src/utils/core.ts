type EnvParams = {
  name: string,
  subdomain?: string,
  defaultValue?: string
}

export function getEnv({
  name,
  defaultValue
} : EnvParams): any {
  const value = process.env[name];

  if (!value && typeof defaultValue !== 'undefined') {
    return defaultValue;
  }

  return value || '';
};

export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

type PaginateParams = {
  ids?: string[];
  page?: number;
  perPage?: number;
  excludeIds?: boolean;
}

export function paginate (collection: any, params: PaginateParams) {
  const { page = 0, perPage = 0, ids, excludeIds } = params || { ids: null };

  const _page = Number(page || '1');
  const _limit = Number(perPage || '20');

  if (ids && ids.length > 0) {
    return excludeIds ? collection.limit(_limit) : collection;
  }

  return collection.limit(_limit).skip((_page - 1) * _limit);
};

export function createResponse(
  status?: number,
  message?: string,
  data?: any
) {
  let response: any = {};

  response.status = status || 500;
  response.message = message || '';
  response.data = data && data;

  return response;
}
