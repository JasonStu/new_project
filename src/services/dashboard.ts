import { request } from 'umi';

export async function getDashboardMainInfo() {
  return request(`/api/dashboard/index`);
}
export async function getDashboardList() {
  return request(`/api/dashboard/getApprovedItemsList`);
}
