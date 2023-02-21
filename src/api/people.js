import axios from 'axios'
export async function getPeople(page = 1, pageSize = 10) {
  return axios
    .get(`https://swapi.dev/api/people/?page=${page}&page_size=${pageSize}`)
    .then((res) => res.data)
}

export async function getPeopleById(id = 1) {
  return axios.get(`https://swapi.dev/api/people/${id}`).then((res) => res.data)
}
