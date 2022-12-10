const urls = {
  'GET': 'https://26.javascript.pages.academy/kekstagram/data',
  'POST': 'https://26.javascript.pages.academy/kekstagram'
};

const getData = (onSuccess, onError) => {
  fetch(urls.GET)
    .then((response) => response.json())
    .then((photos) => onSuccess(photos))
    .catch(() => onError());
};

const sendData = (onSuccess, onError, body) => {
  fetch(urls.POST, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export {getData, sendData};
