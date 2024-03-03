import { resolve } from '../config/axios';
import { axiosInstance, BASE_URL } from '../config/axios'
/* eslint-disable react-refresh/only-export-components */
export async function login(data: {}) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/admin-login/`, data)
    )
}
export async function getAllUser() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}admin/get-all-users`)
    )
}
export async function blockUser(data: any) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/block-user/`, data)
    )
}

export async function createNewJobCategoru(data: {} | any) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/add-new-job-category/`, data)
    )
}
export async function getAllJobCategoies() {
    return await resolve(
        axiosInstance.get(`${BASE_URL}admin/get-all-job-category/`)
    )
}
export async function softDeleteJobCategory(status: boolean, id: string) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}admin/change-job-category-status/`, { status, id })
    )
}
export async function editJobCategory(data: {}) {
    return await resolve(
        axiosInstance.post(`${BASE_URL}admin/edit-job-category-status/`, data)
    )
}
export async function getJobPosts(id: string | null) {
    return await resolve(
        axiosInstance.patch(`${BASE_URL}admin/get-job-post/`, { id: id })
    )
}
export async function getDashBoardData() {
    return await axiosInstance.get(`${BASE_URL}admin/get-dashBoardData/`)
    
}