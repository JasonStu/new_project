import { request } from 'umi';

export type PansListParamsType = {
  page: number;
  limit: number;
  pan_id: string;
};

export async function getPansList(params: PansListParamsType) {
  return request(`/api/pans/getPansList?pan_id=${params.pan_id}&page=${params.page}&limit=${params.limit}`,);
}