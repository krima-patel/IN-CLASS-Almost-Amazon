import viewAuthor from '../components/pages/viewAuthor';
import { showAuthors } from '../components/pages/authors';
// import { deleteSingleAuthor } from '../../api/authorData';
import { deleteBook, getSingleBook } from '../../api/bookData';
import { viewBookDetails, viewAuthorDetails, deleteAuthorBooks } from '../../api/mergedData';
import { showBooks } from '../components/pages/books';
// import viewBook from '../components/pages/viewBook';
import addBookForm from '../components/forms/addBookForm';
// import { updateAuthor } from '../../api/authorData';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getSingleAuthor } from '../../api/authorData';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      console.warn('ADD BOOK');
      const [, uid] = e.target.id.split('--');
      addBookForm(uid).then((bookAuthorObject) => showBooks(bookAuthorObject));
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('EDIT BOOK', e.target.id);
      console.warn(e.target.id.split('--'));
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, uid] = e.target.id.split('--');
      viewBookDetails(uid).then((bookAuthorObject) => showBooks(bookAuthorObject));
    }

    // CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      const [, uid] = e.target.id.split('--');

      viewAuthorDetails(uid).then((authorBookObject) => viewAuthor(authorBookObject));
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        // console.warn('DELETE AUTHOR', e.target.id);
        // console.warn(e.target.id.split('--'));
        const [, firebaseKey] = e.target.id.split('--');

        // deleteSingleAuthor(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
        deleteAuthorBooks(firebaseKey).then(showAuthors);
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      console.warn('ADD AUTHOR');
      const [, uid] = e.target.id.split('--');
      addAuthorForm(uid).then((authorBookObject) => showAuthors(authorBookObject));
    }

    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      console.warn('UPDATE AUTHOR');
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }
  });
};

export default domEvents;
