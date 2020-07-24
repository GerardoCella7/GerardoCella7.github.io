(() => {
  const quote = document.getElementById('quote');
  const btnRefresh = document.getElementById('refresh');
  let httpRequest = null;
  if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+...
    httpRequest = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) { // IE 6 et antérieurs
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  }
  httpRequest.onreadystatechange = () => {
    // instructions de traitement de la réponse
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        view(JSON.parse(httpRequest.responseText));
      } else {
        error('Il y a eu un problème avec la requête.');
      }
    }
  };

  const view = (data) => {
    const template = document.getElementById('tpl-quote');
    const q = document.importNode(template.content, true);
    q.querySelector('.photo').src = data.photo == "" ? './img/inconnu.jpg' : data.photo;
    q.querySelector('.author').innerText = data.author;
    q.querySelector('.total-quotes').innerText = data.total_quotes + ' quotes';
    q.querySelector('.quote').innerHTML = data.quote;
    clear();
    quote.appendChild(q);
  };

  const error = (e) => {
    console.error(e);
    const msg = document.createElement('div');
    msg.className = 'error';
    msg.innerText = 'Error connection API. Try again.';
    clear();
    quote.appendChild(msg);
  };

  const clear = () => {
    while (quote.firstChild) {
      quote.removeChild(quote.lastChild);
    }
  }

  const refresh = async () => {
    if (!httpRequest) {
      alert('Abandon :( Impossible de créer une instance de XMLHTTP');
      return false;
    }
    httpRequest.open('GET', 'https://thatsthespir.it/api', true);
    httpRequest.send();




    try {
      await fetch('https://thatsthespir.it/api')
        .then(res => res.json())
        .then(d => view(d));
    } catch (e) {
      error(e);
    }
  };

  btnRefresh.addEventListener('click', refresh);
  refresh();
})();