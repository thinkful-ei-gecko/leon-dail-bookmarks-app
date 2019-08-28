

// function callFetchAPI(settings, id) {
//   let url = `https://thinkful-list-api.herokuapp.com/leon/bookmarks/${id}`;
//   fetch(url, settings)
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//       throw new Error ('Res ok error');
//     })
//     .then(resJson => {
//       console.log(JSON.stringify(resJson));
//     })
//     .catch(err => {
//       console.error(`We found an error: ${err}`);
//     });
// }

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/leon/bookmarks';


  const getItems = function() {
    return fetch('https://thinkful-list-api.herokuapp.com/leon/bookmarks');
  };

  const createItems = function(data) {
    //call to API
    fetch (BASE_URL, {
      method: 'POST',
      headers: new Headers({'Content-Type' : 'application/json'}),
      body : data
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Had an error!');
      })
      .then (resJson => store.addItem(resJson))
      .catch(err => $('.error').text(`${err}`));
  };

  const deleteItem = function(id) {
    fetch (`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: new Headers({'Content-Type' : 'application/json'})
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Had an error!');
      })
      .then (resJson => store.deleteItem(resJson))
      .catch(err => $('.error').text(`${err}`));
  };

  return {
    BASE_URL,

    getItems,
    createItems,
    deleteItem
  };

})();