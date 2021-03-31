import { request } from 'umi';

export async function getDashboardMainInfo() {
  return request(`/api/dashboard/index`);
}
export async function getDashboardList() {
  return request(`/api/dashboard/getApprovedItemsList`);
}

export async function approvedItemsNew(params: {}) {
  return request(`/api/dashboard/approvedItemsNew`, { method: 'POST', data: params,  });
}

export async function approvedItemsUpdate(params: {}) {
  return request(`/api/dashboard/approvedItemsUpdate`, { method: 'POST', data: params,  });
}
