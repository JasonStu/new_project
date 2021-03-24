import { request } from 'umi';
export type WellListParamsType = {
  page: number;
  limit: number;
  well_id: string;
};


export async function getWellList(params: WellListParamsType) {
  return request(`/api/wells/getWellsList?well_id=${params.well_id}&page=${params.page}&limit=${params.limit}`);
}
export async function createWells(params: {}) {
  return request(`/api/wells/createWells`, { method: 'POST', data: params });
}

export async function updateWells(params: {}) {
  return request(`/api/wells/updateWells`, { method: 'POST', data: params });
}
export async function getWellsDetail() {
  return request(`/api/wells/updateWells`);
}



