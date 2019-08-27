'use strict';

const store = {

  addItem : function(data) {
    store.bookmarks.push(data);
    store.adding = false;
    render();
    //render();
  },

  getItems: function(dataJson) {
    store.bookmarks = dataJson;
    let displayData = store.bookmarks.filter(each => each['rating'] >= store.rankDisplay);
    let displayData2 = '';
    displayData.forEach(each => {
      displayData2 +=
        `<li id="${each['id']}">
            <h3>${each['title']}</h3>
            <div class="starranking">Rank: ${each['rating']}</div>
            <button type="button" id="delete-button">Delete?</button>
        </li>`;
    });
    $('#bookmarks-list').html(displayData2);
  },

  deleteItem: function(id) {
    let obj = store.bookmarks.findIndex(id => store.bookmarks['id'] === id);
    store.bookmarks.splice(obj,1);
    render();
  },

  adding: false,
  rankDisplay: 1,
  addBookmarkText: 'Add a bookmark',

  bookmarks: []
};