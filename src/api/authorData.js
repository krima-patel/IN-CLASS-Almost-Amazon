import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

// FIXME:  GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
  // .then((response) => resolve(Object.values(response.data)))
  //   .catch((error) => reject(error));
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// FIXME: CREATE AUTHOR
const createAuthor = (authorObject) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObject)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, payload)
        .then(() => {
          getAuthors(authorObject.uid).then(resolve);
        });
    }).catch(reject);
});

// FIXME: GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// FIXME: DELETE AUTHOR
const deleteSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors(firebaseKey.uid).then((authorsArray) => resolve(authorsArray));
    })
    .catch((error) => reject(error));
});

// FIXME: UPDATE AUTHOR
const updateAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj)
    .then(() => getAuthors(authorObj.uid).then(resolve))
    .catch(reject);
});

// TODO: GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// FAVORITE AUTHORS
const favoriteAuthors = (uid) => new Promise((resolve, reject) => {
  // axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
  //   .then((response) => resolve(Object.values(response.data)))
  //   .catch((error) => reject(error));
  getAuthors(uid)
    .then((authorsByUser) => {
      const favoriteAuth = authorsByUser.filter((author) => author.favorite);
      resolve(favoriteAuth);
    })
    .catch(reject);
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
  favoriteAuthors
};
