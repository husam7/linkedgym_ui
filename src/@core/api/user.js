import request from '@core/utils/RequestApi'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/User/Login',
    method: 'post',
    data: qs.stringify(data),
  })
}

export function getInfo() {
  return request({
    url: '/User/Info',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/User/logout',
    method: 'post',
  })
}

export function Register(data) {
  return request({
    url: '/User/Register',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function ChangePassword(data) {
  return request({
    url: '/User/ChangePassword',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function UnLockout(data) {
  return request({
    url: '/User/UnLockout',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function UpdateKeys(data) {
  return request({
    url: '/User/UpdateKeys',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function UpdateServerKeys(data) {
  return request({
    url: '/User/UpdateServerKeys',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function Edit(data) {
  return request({
    url: '/User/Edit',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function GetUsers(data) {
  return request({
    url: '/User/GetUsers',
    method: 'post',
    data: qs.stringify(data),
  })
}
export function GetUsersNames() {
  return request({
    url: '/User/GetUsersNames',
    method: 'post',
  })
}
export function GetRoles() {
  return request({
    url: '/User/GetRoles',
    method: 'get',
  })
}
export function AddRoleUser(data) {
  return request({
    url: '/User/AddRoleForUser',
    method: 'post',
    params: data,
  })
}
export function DeleteRoleUser(data) {
  return request({
    url: '/User/DeleteRoleForUser',
    method: 'post',
    params: data,
  })
}
export function DeleteConfirmed(data) {
  return request({
    url: '/User/DeleteConfirmed',
    method: 'post',
    data: qs.stringify(data),
  })
}

