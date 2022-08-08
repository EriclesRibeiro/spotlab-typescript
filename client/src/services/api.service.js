import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:4000',
});
export const createSession = async(data) => {
    return api.post('/auth/signin', data);
}
export const signUp = async(data) => {
    return api.post('/auth/signup', data);
}
export const createProject = async(data) => {
    return api.post('/project/createProject', data);
}
export function findProjects(data) {
    return api.post('/project/getProjects', data);
}
export function getUsers() {
    return api.get('/users/getUsers');
}
export function getCategories(data) {
    return api.post('/categorie/getCategories', data);
}
export function createCategorie(data) {
    return api.post('/categorie/createCategorie', data);
}
export function editCategorie(data) {
    return api.post('/categorie/editCategorie', data);
}
export function deleteCategorie(data) {
    return api.post('/categorie/deleteCategorie', data);
}