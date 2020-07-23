(() => {
  const quote = document.getElementById('quote');
  const btnRefresh = document.getElementById('refresh');


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