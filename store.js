

const store = {

  addItem : function(data) {
    store.bookmarks.push(data);
    store.adding = false;
    bookmarks.render();
  },

  getItems: function(dataJson) {
    if (dataJson) {
      store.bookmarks = dataJson;
    }
  },

  deleteItem: function(id) {
    let obj = store.bookmarks.findIndex(id => store.bookmarks['id'] === id);
    store.bookmarks.splice(obj,1);
    bookmarks.render();
  },

  expandItem: function(id) {
    let obj = store.bookmarks.find(item => item['id'] === id);
    if (obj['expanded'] === true) { obj['expanded'] = false; }
    else { obj['expanded'] = true;}
    bookmarks.printResults();
  },

  adding: false,
  rankDisplay: 1,
  addBookmarkText: 'add a bookmark',

  bookmarks: []
};