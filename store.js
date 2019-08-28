

const store = {

  addItem : function(data, method, id, newPatchData) {
    if (method === 'POST') {
      store.bookmarks.push(data);
    }
    else {
      let obj = store.bookmarks.find(item => item['id'] === id);
      Object.assign(obj,newPatchData);
    }
    store.adding = false;
    store.edit = false;
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
  edit: false,
  rankDisplay: 1,
  addBookmarkText: 'add a bookmark',
  editBookmarkText: 'edit a bookmark',

  bookmarks: []
};