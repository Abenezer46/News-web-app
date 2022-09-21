const container = document.querySelector('.container'),
  categoryBtn = container.querySelector('.nav'),
  searchBtn = container.querySelector('.search i'),
  searchInput = container.querySelector('.search input'),
  bookmarkBtn = container.querySelector(' header button');

let category;
var apiUrl =
  'https://newsapi.org/v2/top-headlines?language=en&apiKey=f5f6b2d5109142a7a051a1d0fbeb4c42';
var categoryApi = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=f5f6b2d5109142a7a051a1d0fbeb4c42`;

apiFetch(apiUrl);

//https: newsapi.org/v2/top-headlines?q=trump&apiKey=f5f6b2d5109142a7a051a1d0fbeb4c42

searchBtn.addEventListener('click', (e) => {
  if (searchInput.value) {
    apiUrl = `https://newsapi.org/v2/top-headlines?q=${searchInput.value}&apiKey=f5f6b2d5109142a7a051a1d0fbeb4c42`;
    apiFetch(apiUrl);
    container.querySelector('.newses').innerHTML = '';
  }
});
categoryBtn.addEventListener('click', (e) => {
  console.log(e.target.innerText);
  container.querySelector('.newses').innerHTML = '';
  categoryBtn.querySelector('.general').classList.remove('active');
  category = e.target.innerText;
  var categoryApi = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=f5f6b2d5109142a7a051a1d0fbeb4c42`;
  apiFetch(categoryApi);
});

function apiFetch(url) {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result), News(result);
    });
}

function News(info) {
  if (info) {
    info.articles.forEach((article) => {
      let image, author;
      var bookmarks;

      if (article.urlToImage == null) {
        image = './assets/icons8-google-news-500.png';
      } else {
        image = article.urlToImage;
      }
      if (article.author == null) {
        author = article.source.name;
      } else {
        author = article.author;
      }

      let news = document.createElement('div');

      news.classList.add('news');

      news.innerHTML = ` 
                             <img
                               src=${image}
                               alt="image"
                              />
                             <p>${article.title}</p>
                             <div class="bookmark">
                               <div class="catagory">
                                 <span>${article.source.name}</span>
                               </div>
                               <i class="fa-regular fa-bookmark"></i>
                             </div>
                          `;
      container.querySelector('.newses').appendChild(news);

      let bookmark = news.querySelector('.fa-bookmark');

      bookmark.addEventListener('click', (e) => {
        bookmark.classList.add('active');
        bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

        let bookmarked = {
          poster: image,
          title: article.title,
          source: article.source.name,
          content: article.content,
          url: article.url,
          author: author,
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
                           ${article.title}
                           </span>
                           <span class="source">${article.source.name}</span>
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
                              ${article.content}
                               <a href="${
                                 article.url
                               }" target="blank">more . . .</a>
                             </span>
                           </div>
                           <div class="author">
                             <p>Author</p>
                             <span>${author}</span>
                           </div>
                         </div>
                       </main>
                     </div>
                      `;

      news.addEventListener('click', (e) => {
        document.querySelector('.newses').appendChild(infoCard);
        infoCard.style.display = 'flex';
      });
      infoCard.querySelector('button').addEventListener('click', (e) => {
        infoCard.style.display = 'none';
      });
    });
  } else {
    let noNetwork = document.createElement('div');

    noNetwork.classList.add('noNetwork');

    noNetwork.innerHTML = `<img
                             src="./assets/icons8-homer-simpson-100.png"
                             alt="image"
                           />`;

    container.querySelector('.newses').appendChild(noNetwork);
  }
}

bookmarkBtn.addEventListener('click', (e) => {
  console.log(localStorage);

  if (localStorage.getItem('bookmarks') === null) { 
    container.querySelector(
      '.newses'
    ).innerHTML = `
     <div class="no-key">
     <i class="fa-solid fa-sd-card"></i>
       <p>please Add a Bookmark First</p>
     </div>`;
  }
  else {
    container.querySelector(
      '.newses'
    ).innerHTML = `
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
