import sendRequest from "./send-request";
const BASE_URL = '/api/toys';

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function createToy(toyData) {
    const response = await sendRequest(BASE_URL, 'POST', toyData)
    return response.data
}

export async function deleteToy(toyId) {
  const response = await sendRequest(`${BASE_URL}/${toyId}`, 'POST')
  return response.data
}

export async function requestToy(toyId) {
  const response = await sendRequest(`${BASE_URL}/request/${toyId}`, 'POST')
  return response.data
}

export async function getAllRequests() {
  const response = await sendRequest(BASE_URL);
  return response.data;
}

export async function acceptRequest(toyId, userId, requesterId) {
  const requestBody = { userId, requesterId }
  const response = await sendRequest(`${BASE_URL}/accept/${toyId}`, 'POST', requestBody);
  return response.data;
}

export async function requestsStatus(toyId, userId) {
  const statusBody = { userId }
  const response = await sendRequest(`${BASE_URL}/status/${toyId}`, 'POST', statusBody)
  return response.data
}

// This function is never actually used ,
// it's only provided here to remind you to follow
// RESTful routing, etc.
export async function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}
