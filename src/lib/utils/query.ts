// lib/utils/query.ts
import qs, { type ParseOptions, type StringifyOptions } from 'query-string';

export const QS_OPTS: ParseOptions & StringifyOptions = {
  arrayFormat: 'comma',
  skipNull: true,
  skipEmptyString: true,
  sort: false,
};

export type QueryState = {
  gender?: string[]; // men,women,unisex
  size?: string[]; // 6,7,8...
  color?: string[]; // red,black,white...
  price?: string[]; // 25-50,50-100,100-150,150+
  sort?: string; // featured,newest,price_desc,price_asc
  page?: number;
  [key: string]: any;
};

export const ensureArray = (v: string | string[] | undefined): string[] => {
  if (!v) return [];
  return Array.isArray(v)
    ? v.filter(Boolean)
    : String(v).split(',').filter(Boolean);
};

/** Parse a query string (or object) to a normalized QueryState */
export function parseQuery(input: string | Record<string, any>): QueryState {
  const parsed =
    typeof input === 'string'
      ? (qs.parse(input, QS_OPTS) as Record<string, any>)
      : input;

  return {
    ...parsed,
    gender: ensureArray(parsed.gender),
    size: ensureArray(parsed.size),
    color: ensureArray(parsed.color),
    price: ensureArray(parsed.price),
    sort: parsed.sort ? String(parsed.sort) : undefined,
    page: parsed.page ? Number(parsed.page) : undefined,
  };
}

/** Build a URL from a pathname and a query object */
export function buildUrl(pathname: string, query: QueryState): string {
  const q = qs.stringify(query, QS_OPTS);
  return q ? `${pathname}?${q}` : pathname;
}

/** Toggle a single value inside an array-like filter key */
export function toggleValueInQuery(
  pathname: string,
  currentSearch: string,
  key: keyof QueryState,
  value: string
): string {
  const state = parseQuery(currentSearch);
  const arr = new Set(ensureArray(state[key] as any));
  if (arr.has(value)) arr.delete(value);
  else arr.add(value);

  const next: QueryState = { ...state, [key]: Array.from(arr), page: 1 };
  // cleanup empty arrays
  if ((next[key] as string[]).length === 0) delete next[key];
  return buildUrl(pathname, next);
}

/** Set (or remove) a scalar value like "sort" */
export function setScalarInQuery(
  pathname: string,
  currentSearch: string,
  key: keyof QueryState,
  value?: string | number | null
): string {
  const state = parseQuery(currentSearch);
  const next = { ...state, page: 1 } as QueryState;
  if (value === undefined || value === null || value === '') delete next[key];
  else next[key] = String(value);
  return buildUrl(pathname, next);
}

/** Remove a full key OR a single value inside a key (if provided) */
export function removeFromQuery(
  pathname: string,
  currentSearch: string,
  key: keyof QueryState,
  value?: string
): string {
  const state = parseQuery(currentSearch);
  if (value) {
    const arr = ensureArray(state[key] as any);
    const nextArr = arr.filter((v) => v !== value);
    if (nextArr.length) state[key] = nextArr;
    else delete state[key];
  } else {
    delete state[key];
  }
  state.page = 1;
  return buildUrl(pathname, state);
}

/** Clear all filter keys (preserving explicit allowList like "sort" if provided) */
export function clearAllFilters(
  pathname: string,
  currentSearch: string,
  allowList: (keyof QueryState)[] = ['sort']
) {
  const state = parseQuery(currentSearch);
  const keep: QueryState = {};
  allowList.forEach((k) => {
    if (state[k] !== undefined) (keep as any)[k] = state[k];
  });
  keep.page = 1;
  return buildUrl(pathname, keep);
}
