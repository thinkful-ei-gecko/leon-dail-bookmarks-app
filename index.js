'use strict';

function displayMinimumRankingSelector() {
  if (!store.adding) {
    $('#minimum-ranking').html(`
        <label for="select-ranking" id="select-ranking-label">Only displaying items of rank:</label>
        <select id="select-ranking">
            <option value="5">5 stars</option>
            <option value="4">4 stars and above</option>
            <option value="3">3 stars and above</option>
            <option value="2">2 stars and above</option>
            <option value="1" selected>1 star and above(all)</option>
        </select>`);
  }
  else {
    $('#form-ranking').empty();
  }
}

function displayBookmarkForm() {
  if (store.adding) {
    console.log('its true');
    $('#add-bookmark').html(`
        <form id="add-bookmark-form" name="add-bookmark-form">
            <legend>${store.addBookmarkText}</legend>
            <label for="title-input" id="title-label">Title:</label>
            <input type="text" placeholder="enter title here" value="" name="title" required />
            <label for="url-input" id="url-label">URL:</label>
            <input type="text" placeholder="enter url here" value="" name="url" required />
            <label for="description-input" id="description-label">Description:</label>
            <input type="text" placeholder="enter description here" value="" name="desc" required />
            <label for="select-ranking" id="select-ranking-label">Ranking:</label>
            <select id="select-ranking" name="rating">
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1" selected>1 star</option>
            </select>
            <button type="submit" value="submit" name="submit">Submit</button>
            <button type="button" value="clear" name="clear">Cancel</button>
        </form>`);
  }
  else {
    $('#add-bookmark').html(`<span>${store.addBookmarkText}</span>`);
  }
}

function displayBookmarkItems() {
  if (!store.adding) {
    bookmarks.getItems();
  }
}

function eventListeners() {

  $('#bookmarks-title').on('click', e=> {
    console.log('header click');
    render();
  });

  $('#minimum-ranking').on('change', '#select-ranking', e => {
    bookmarks.changeRankDisplay();
    displayBookmarkItems();
  });

  $('#add-bookmark').on('click', e=> {
    if (!store.adding) {
      store.adding = true;
      $('#add-bookmark').empty();
      $('#bookmarks-list').empty();
      displayBookmarkForm();
    }
  });

  $('#add-bookmark').on('click', 'button', e=> {
    if((event.target).value === 'clear') { 
      store.adding = false;  
      console.log(store.adding);
      render();
    }
  });

  $('#add-bookmark').on('submit', '#add-bookmark-form', e=> {
    e.preventDefault();
    let serializedData = $('#add-bookmark-form').serializeJson();
    bookmarks.submitAddBookmarkForm(serializedData);
    // render();
  });
  $('#bookmarks-list li').on('click', e=> {
    //clicking an li
    // render();
  });
  $('#bookmarks-list').on('click','#edit-button', e=> {
    //edit the data
    // render();
  });
  $('#bookmarks-list').on('click','#delete-button', function(e) {
    let id = $(this).closest('li').attr('id');
    bookmarks.deleteItem(id);
    // render();
  });
}

function render() {
  console.log('rendering');
  displayMinimumRankingSelector();
  displayBookmarkForm();
  displayBookmarkItems();
}

function ready () {
  eventListeners();
  render();
}

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val,name) => o[name] = val);
    return JSON.stringify(o);
  }
});

$(ready);