'use strict';

function displayMinimumRankingSelector() {
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

function displayBookmarkForm() {
  if (store.adding === true) {
    $('#add-bookmark').html(`
        <div class="bookmark open">
            <form id="add-bookmark-form" name="add-bookmark-form">
                <legend>${store.addBookmarkText}</legend>
                <label for="title-input" id="title-label">Title:</label>
                <input type="text" placeholder="enter title here" value="" name="title" required />
                <label for="url-input" id="url-label">URL:</label>
                <input type="text" placeholder="enter url here" value="" name="url" required />
                <label for="description-input" id="description-label">Description:</label>
                <textarea placeholder="enter description here" value="" name="desc" class="long-input" required />
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
            </form>
        </div>`);
  }
  else {
    $('#add-bookmark').html(`<div class="bookmark unopen"><span>${store.addBookmarkText}</span></div>`);
  }
}

function displayBookmarkItems() {
  if (!store.adding) {
    bookmarks.getItems();
  }
}

function eventListeners() {

  $('#minimum-ranking').on('change', '#select-ranking', e => {
    bookmarks.changeRankDisplay();
    displayBookmarkItems();
  });

  $('#add-bookmark').on('click', '.unopen', e=> {
    if (!store.adding) {
      store.adding = true;
      $('#add-bookmark').empty();
      $('#bookmarks-list').empty();
      displayBookmarkForm();
    }
  });

  $('#add-bookmark').on('click', 'button', e=> {
    if((event.target).value === 'clear') { 
      console.log('clear button clicked');
      store.adding = false;  
      console.log(store.adding);
      displayBookmarkForm();
      displayBookmarkItems();
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
  $('#bookmarks-list').on('click','.edit-button', e=> {
    //edit the data
    // render();
  });
  $('#bookmarks-list').on('click','.delete-button', function(e) {
    let id = $(this).closest('li').attr('id');
    bookmarks.deleteItem(id);
    // render();
  });
}

function render() {
  console.log('rendering');
  displayBookmarkForm();
  displayBookmarkItems();
}

function ready () {
  eventListeners();
  displayMinimumRankingSelector();
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