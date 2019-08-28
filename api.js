
const api = (function() {

  

  function callFetchAPI(url, settings) {
    let error ='';
    return fetch(url, settings)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
        }
        return res.json();
      })
      .then (resJson => { 
        if (error) { 
          error.message = resJson.message;
          return Promise.reject(error);
        }
        return resJson;
      });
  }

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/leon/bookmarks';

  const getItems = function() {
    return callFetchAPI(BASE_URL);
  };

  const createItems = function(data, methods, id) {
    let settings = {
      method: methods,
      headers: new Headers({'Content-Type' : 'application/json'}),
      body : data
    };
    return callFetchAPI(methods === 'POST' ? BASE_URL : `${BASE_URL}/${id}`, settings);
  };

  const deleteItem = function(id) {
    let settings = {
      method: 'DELETE',
      headers: new Headers({'Content-Type' : 'application/json'})
    };
    return callFetchAPI(`${BASE_URL}/${id}`, settings);

  };

  return {

    getItems,
    createItems,
    deleteItem
  };

})();