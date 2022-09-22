const container = document.querySelector('.container'),
  categoryBtn = container.querySelector('.nav'),
  searchBtn = container.querySelector('.search i'),
  searchInput = container.querySelector('.search input'),
  bookmarkBtn = container.querySelector(' header button');

let category;
var apiUrl =
  'https://api.currentsapi.services/v1/latest-news?category=general&page=2&apiKey=DY3wJMmP7A7xabReKZaerAHA2FqNTLKn6_DjVU1JiCn2dN_l';
apiFetch(apiUrl);

searchBtn.addEventListener('click', (e) => {
  if (searchInput.value) {
    apiUrl = `https://api.currentsapi.services/v1/search?keywords=${searchInput.value}&apiKey=DY3wJMmP7A7xabReKZaerAHA2FqNTLKn6_DjVU1JiCn2dN_l`;
    apiFetch(apiUrl);
    container.querySelector('.newses').innerHTML = '';
  }
});
categoryBtn.addEventListener('click', (e) => {
  console.log(e.target.innerText);
  container.querySelector('.newses').innerHTML = '';
  categoryBtn.querySelector('.general').classList.remove('active');
  category = e.target.innerText;
  var categoryApi = `https://api.currentsapi.services/v1/latest-news?category=${category.toLowerCase()}&apiKey=DY3wJMmP7A7xabReKZaerAHA2FqNTLKn6_DjVU1JiCn2dN_l`;
  apiFetch(categoryApi);
});

function apiFetch(url) {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      News(result);
    });
}

function News(info) {
  for (let i = 0; i < info.news.length; i++) {
    let image;
    var bookmarks;

    if (info.news[i].image === 'None') {
      image = './assets/icons8-google-news-500.png';
    } else {
      image = info.news[i].image;
    }

    let card = document.createElement('div');

    card.classList.add('news');

    card.innerHTML = ` 
                             <img
                               src=${image}
                               onError="this.src='./assets/icons8-google-news-500.png';"
                               alt="image"
                              />
                             <p>${info.news[i].title}</p>
                             <div class="bookmark">
                               <div class="catagory">
                                 <span>${info.news[i].category[0]}</span>
                               </div>
                               <i class="fa-regular fa-bookmark"></i>
                             </div>
                          `;
    container.querySelector('.newses').appendChild(card);

    let bookmark = card.querySelector('.fa-bookmark');

    bookmark.addEventListener('click', (e) => {
      bookmark.classList.add('active');
      bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

      let bookmarked = {
        poster: image,
        title: info.news[i].title,
        source: info.news[i].category[0],
        content: info.news[i].description,
        url: info.news[i].url,
        author: info.news[i].author,
      };

      bookmarks.push(bookmarked);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    });

    let infoCard = document.createElement('div');
    infoCard.classList.add('infocard');
    infoCard.innerHTML = `
                       <div class="card">
                       <header>
                         <div class="left-side">
                           <span class="c-title">
                           ${info.news[i].title}
                           </span>
                           <span class="source">${
                             info.news[i].category[0]
                           }</span>
                         </div>

                         <button class="close-btn" onClick=${
                           infoCard.style.display == 'none'
                         }>X</button>
                       </header>
                       <main>
                         <img
                           src=${image}
                           alt="poster"
                         />
                         <div>
                           <div class="description">
                             <p>Description</p>
                             <span class="disc">
                              ${info.news[i].description}
                               <a href="${
                                 info.news[i].url
                               }" target="blank">more . . .</a>
                             </span>
                           </div>
                           <div class="author">
                             <p>Author</p>
                             <span>${info.news[i].author}</span>
                           </div>
                         </div>
                       </main>
                     </div>
                      `;

    card.addEventListener('click', (e) => {
      document.querySelector('.newses').appendChild(infoCard);
      infoCard.style.display = 'flex';
    });

    infoCard.querySelector('button').addEventListener('click', (e) => {
      infoCard.style.display = 'none';
    });
  }
}

bookmarkBtn.addEventListener('click', (e) => {
  console.log(localStorage);

  if (localStorage.getItem('bookmarks') === null) {
    container.querySelector('.newses').innerHTML = `
     <div class="no-key">
     <i class="fa-solid fa-sd-card"></i>
       <p>please Add a Bookmark First</p>
     </div>`;
  } else {
    container.querySelector('.newses').innerHTML = `
    <button class="clear">Clear all Bookmarks</button>`;
    Object.keys(localStorage).forEach(function (key) {
      let articles = JSON.parse(localStorage.getItem(key));
      console.log(articles);
      let id = 0;

      articles.forEach((article) => {
        let news = document.createElement('div');
        news.classList.add('news');
        news.setAttribute('id', `${id++}`);
        news.innerHTML = ` 
                                 <img
                                   src=${article.poster}
                                   alt="image"
                                  />
                                 <p>${article.title}</p>
                                 <div class="bookmark">
                                   <div class="catagory">
                                     <span>${article.source}</span>
                                   </div>
                                   <i class="fa-solid fa-trash-can"></i>
                                 </div>
                              `;
        container.querySelector('.newses').appendChild(news);

        let infoCard = document.createElement('div');
        infoCard.classList.add('infocard');
        infoCard.innerHTML = `
                           <div class="card">
                           <header>
                             <div class="left-side">
                               <span class="c-title">
                               ${article.title}
                               </span>
                               <span class="source">${article.source}</span>
                             </div>
                       
                             <button class="close-btn" onClick=${
                               infoCard.style.display == 'none'
                             }>X</button>
                           </header>
                           <main>
                             <img
                               src=${article.poster}
                               alt="poster"
                             />
                             <div>
                               <div class="description">
                                 <p>Description</p>
                                 <span class="disc">
                                  ${article.content}
                                   <a href="${
                                     article.url
                                   }" target="blank">more . . .</a>
                                 </span>
                               </div>
                               <div class="author">
                                 <p>Author</p>
                                 <span>${article.author}</span>
                               </div>
                             </div>
                           </main>
                         </div>
                          `;
        let bookmark = news.querySelector('.fa-trash-can');
        bookmark.addEventListener('click', (e) => {
          console.log(e.target.parentNode.parentNode.id);
          let index = e.target.parentNode.parentNode.id;
          articles.splice(index, 1); //remove it
          console.log(articles);
          localStorage.setItem('bookmarks', JSON.stringify(articles));
          e.target.parentNode.parentNode.remove();
        });

        let clearAll = container.querySelector('.newses .clear');

        clearAll.addEventListener('click', (e) => {
          localStorage.removeItem('bookmarks');
          news.remove();
        });
        news.addEventListener('click', (e) => {
          document.querySelector('.newses').appendChild(infoCard);
          infoCard.style.display = 'flex';
        });
        infoCard.querySelector('button').addEventListener('click', (e) => {
          infoCard.style.display = 'none';
        });
      });
    });
  }
});
