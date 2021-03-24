import { request } from 'umi';
export type ItemListParamsType = {
  page: number;
  limit: number;
  item_id: string;
};

export type ItemDetailParamsType = {
  id: string;
  item_id: string;
};

export async function getItemList(params: ItemListParamsType) {
  return request(`/api/items/getItemsList?item_id=${params.item_id}&page=${params.page}&limit=${params.limit}`);
}
export async function createItems(params: {}) {
  return request(`/api/items/createItems`, { method: 'POST', data: params, requestType: 'form' });
}

export async function updateItems(params: {}) {
  return request(`/api/items/updateItems`, { method: 'POST', data: params, requestType: 'form' });
}

export async function getItemsDetail(params: ItemDetailParamsType) {
  return request(`/api/items/getItemsDetail?item_id=${params.item_id}&id=${params.id}`);
}

export async function getCategoryList() {
  return request(`/api/items/getCategoryList`);
}

export async function getLineList() {
  return request(`/api/items/getLineList`);
}

export async function checkItemsExist(params: ItemDetailParamsType) {
  return request(`/api/items/getLineList?item_id${params.item_id}`);
}



