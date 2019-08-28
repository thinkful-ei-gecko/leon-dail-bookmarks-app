'use strict';

const bookmarks = (function() {


  const submitAddBookmarkForm = function(submission) {
    console.log(`submission is ${submission}`);
    //send to API to add
    api.createItems(submission);
  };

  const changeRankDisplay = function() {
    store.rankDisplay = $('#minimum-ranking').find('#select-ranking').val();
    displayBookmarkItems();
  };

  const getItems = function() {
    api.getItems()
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Had an error');
      })
      .then(dataJson => store.getItems(dataJson))
      .catch(err => console.error(`There was an error: ${err}`));
  };

  const deleteItem = function(id) {
    api.deleteItem(id);
  };

  const expandItem = function(id) {
    store.expandItem(id);
  }
  return {
    submitAddBookmarkForm,
    changeRankDisplay,
    getItems,
    deleteItem,
    expandItem
  };
})();