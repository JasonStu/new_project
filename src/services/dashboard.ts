import { request } from 'umi';

export type ItemListParamsType = {
  page: number;
  limit: number;
  item_id: string;
};
export async function getDashboardMainInfo() {
  return request(`/api/dashboard/index`);
}
export async function getDashboardList(params: ItemListParamsType) {
  return request(`/api/dashboard/getApprovedItemsList?page=${params.page}&limit=${params.limit}`);
}

export async function approvedItemsNew(params: {}) {
  return request(`/api/dashboard/approvedItemsNew`, { method: 'POST', data: params, });
}

export async function approvedItemsUpdate(params: {}) {
  return request(`/api/dashboard/approvedItemsUpdate`, { method: 'POST', data: params, });
}
