const bookmarks = (function() {
  
  const displayBookmarkForm = function(obj) {
    let data = {title: '', url: '', desc: '', rating: ''};
    if (obj) { data = obj; }
    if (store.adding) {
      let formHtml = '';
      formHtml += `
          <div class="bookmark open">
              <form id="add-bookmark-form" name="add-bookmark-form">
      `;
      if (store.edit) {
        formHtml+= `<legend>${store.editBookmarkText}</legend>`;
      }
      else {
        formHtml += `<legend>${store.addBookmarkText}</legend>`;
      }
      formHtml+= `
                  <label for="title-input" id="title-label">Title:</label>
                  <input type="text" placeholder="enter title here" value="${data['title']}" name="title" required />
                  <label for="url-input" id="url-label">URL:</label>
                  <input type="text" placeholder="enter url here" value="${data['url']}" name="url" required />
                  <label for="description-input" id="description-label">Description:</label>
                  <textarea placeholder="enter description here" name="desc" class="long-input" required>${data['desc']}</textarea>
                  <label for="select-ranking" id="select-ranking-label">Ranking:</label>
                  <select id="select-ranking" name="rating">
      `;
      let i = 5;
      while (i>=1) {
        if (i === data['rating']) {
          formHtml += i === 1 ? `<option value="${i}" selected>${i} star</option>` : `<option value="${i}" selected>${i} stars</option>`;
        }
        else {
          formHtml += i === 1 ? `<option value="${i}">${i} star</option>` : `<option value="${i}">${i} stars</option>`;
        }
        i--;
      }
      formHtml+= `
                  </select>
                  <button type="submit" value="submit" name="submit">Submit</button>
                  <button type="button" value="clear" name="clear">Cancel</button>
              </form>
          </div>`;
      $('#add-bookmark').html(formHtml);
    }
    else {
      $('#add-bookmark').html(`<div class="bookmark unopen"><span>${store.addBookmarkText}</span></div>`);
    }
  };


  const printResults = function() {
    let displayData = store.bookmarks.filter(each => each['rating'] >= store.rankDisplay);
    let displayData2 = '';
    displayData.forEach(each => {
      displayData2 +=
        `<li id="${each['id']}">
            <div class="condensed-info">
                <div class="left"></div>
                <div class="center">
                    <h3>${each['title']}</h3>
                    <div class="starranking"><img src="${each['rating']}star.png" alt="${each['rating']} stars" /></div>
                </div>
                <div class="right">
                    <button type="button" class="delete-button" value="delete" name="delete"></button>
                    <button type="edit" class="edit-button" value="edit" name="edit"></button>
                </div>
            </div>
        `;
      if (each['expanded'] === true) {
        displayData2 +=
          `<div class="expanded">
              <p class="description">${each['desc']}</p>
              <p class="url"><a href="${each['url']}">${each['url']}</a></p>
          </div>
          `;
      }
      displayData2 += '</li>';
    });
    $('#bookmarks-list').html(displayData2);
  };

  const displayError = function(err) {
    $('.error').text(`${err.message}. Click this text to make it disappear.`);
  };

  const getItems = function() {
    api.getItems()
      .then(dataJson => store.getItems(dataJson))
      .then(dataJson => {
        store.adding = false;
        store.edit = false;
        displayBookmarkForm();
        printResults();
      })
      .catch(err => displayError(err));
  };

  const displayBookmarkItems = function() {
    if (!store.adding) {
      getItems();
    }
  };

  function eventListeners() {

    $('#minimum-ranking').on('change', '#select-ranking', e => {
      store.rankDisplay = $('#minimum-ranking').find('#select-ranking').val();
      displayBookmarkItems();
    });
  
    $('#add-bookmark').on('click', '.unopen', e=> {
      store.adding = true;
      $('#bookmarks-list').empty();
      displayBookmarkForm();
    });
  
    $('#add-bookmark').on('click', 'button', e=> {
      if((event.target).value === 'clear') { 
        store.adding = false;  
        render();
      }
    });
  
    $('#add-bookmark').on('submit', '#add-bookmark-form', e=> {
      e.preventDefault();
      let serializedData = $('#add-bookmark-form').serializeJson();
      let method = '';
      let id = '';
      if (store.edit) { method = 'PATCH'; id = store.edit;}
      else { method = 'POST'; }
      api.createItems(serializedData, method, id)
        .then(dataJson => store.addItem(dataJson,method, id, JSON.parse(serializedData)))
        .then(dataJson => {
          store.adding = false;
          store.edit = false;
          displayBookmarkForm();
          printResults();
        })
        .catch(err => displayError(err));
    });

    $('#bookmarks-list').on('click', 'li', e=> {
      if (!$(e.target).is('button')) {
        store.expandItem($(e.currentTarget).attr('id'));
      }
    });

    $('#bookmarks-list').on('click','.edit-button', e=> {
      let id = $(e.currentTarget).closest('li').attr('id');
      let obj = store.bookmarks.find(item => item['id'] === id);
      store.adding = true;
      store.edit = id;
      $('#bookmarks-list').empty();
      displayBookmarkForm(obj);
    });

    $('#bookmarks-list').on('click','.delete-button', function(e) {
      let id = $(this).closest('li').attr('id');
      api.deleteItem(id) 
        .then(dataJson => store.deleteItem(dataJson))
        .then(dataJson => printResults())
        .catch(err => displayError(err));
    });

    $('.error').on('click', e=> {
      $('.error').empty();
    });
  }

  function render() {
    displayBookmarkForm();
    displayBookmarkItems();
  }

  
  return {
    getItems,

    printResults,
    displayBookmarkItems,
    eventListeners,
    render,
  };
})();

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val,name) => o[name] = val);
    return JSON.stringify(o);
  }
});