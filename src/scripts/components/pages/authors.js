import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const emptyAuthors = () => {
  const domString = '<h1>No Authors</h1>';
  renderToDOM('#store', domString);
};

const showAuthors = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';

  renderToDOM('#add-button', btnString);

  if (array.length) {
    let domString = '';
    array.forEach((item) => {
      domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
        <hr>
        <p class="card-text bold">${item.favorite ? `<span class="fas fa-thumbs-up><i class="fas fa-thumbs-up" aria-hidden="true"></i><b>A Fan Favorite!</b></span> ${item.email}` : `${item.email}`}</p>
        <hr>
        <i class="btn btn-success fas fa-eye" id="view-author-btn--${item.firebaseKey}"></i>
        <i class="fas fa-edit btn btn-info" id="update-author--${item.firebaseKey}"></i>
        <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${item.firebaseKey}"></i>
      </div>
    </div>`;
    });
    renderToDOM('#store', domString);
  } else {
    emptyAuthors();
  }
};

export default showAuthors;
