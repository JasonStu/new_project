
import { request } from 'umi';
export type LocationListParamsType = {
  page: number;
  limit: number;
  location_id: string;
};


export async function getLocationsList(params: LocationListParamsType) {
  return request(`/api/locations/getLocationsList?location_id=${params.location_id}&page=${params.page}&limit=${params.limit}`);
}
export async function createLocations(params: {}) {
  return request(`/api/locations/createLocations`, { method: 'POST', data: params });
}

export async function updateLocations(params: {}) {
  return request(`/api/locations/updateLocations`, { method: 'POST', data: params });
}
export async function exportExcel() {
  return request(`/api/locations/exportExcel`, { responseType: 'arrayBuffer' });
}