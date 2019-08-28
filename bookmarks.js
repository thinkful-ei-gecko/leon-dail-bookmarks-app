const bookmarks = (function() {
  
  const displayBookmarkForm = function() {
    if (store.adding) {
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
    console.log(displayData2);
    $('#bookmarks-list').html(displayData2);
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
      .then(dataJson => printResults())
      .catch(err => $('.error').text(`Error: ${err}`));
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
      api.createItems(serializedData);
    });

    $('#bookmarks-list').on('click', 'li', e=> {
      store.expandItem($(e.currentTarget).attr('id'));
    });

    $('#bookmarks-list').on('click','.edit-button', e=> {
      console.log('edit button functionality coming soon');
    });

    $('#bookmarks-list').on('click','.delete-button', function(e) {
      let id = $(this).closest('li').attr('id');
      api.deleteItem(id);
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