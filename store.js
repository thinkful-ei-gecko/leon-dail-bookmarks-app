'use strict';

const store = {

  addItem : function(data) {
    store.bookmarks.push(data);
    store.adding = false;
    render();
  },

  getItems: function(dataJson) {
    store.bookmarks = dataJson;
    let displayData = store.bookmarks.filter(each => each['rating'] >= store.rankDisplay);
    let displayData2 = '';
    displayData.forEach(each => {
      displayData2 +=
        `<li id="${each['id']}">
            <div class="condensed-info">
                <div class="left"></div>
                <div class="center">
                    <h3>${each['title']}</h3>
                    <div class="starranking">Rank: ${each['rating']}</div>
                </div>
                <div class="right">
                    <button type="button" class="delete-button" value="delete" name="delete"></button>
                    <button type="edit" class="edit-button" value="edit" name="edit"></button>
                </div>
            </div>
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
  addBookmarkText: 'add a bookmark',

  bookmarks: []
};