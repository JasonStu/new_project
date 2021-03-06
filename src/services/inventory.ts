import { request } from 'umi';

export type InventoryParamsType = {
  page: number;
  limit: number;
  item_id: string;
};

export async function getInventoryList(params: InventoryParamsType) {
  return request(`/api/inventory/getInventoryList?item_id=${params.item_id}&page=${params.page}&limit=${params.limit}`);
}
export async function createInventory(params: {}) {
  return request(`/api/inventory/createInventory`, { method: 'POST', data: params, });
}

export async function updateInventory(params: {}) {
  return request(`/api/inventory/updateInventory`, { method: 'POST', data: params, });
}

export async function checkItemsExist(params: InventoryParamsType) {
  return request(`/api/items/checkItemsExist?item_id=${params.item_id}`, { method: 'GET', });
}

export async function exportExcel() {
  return request(`/api/inventory/exportExcel`, { responseType: 'arrayBuffer' });
}




