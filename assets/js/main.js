const articles = [
    {
        id:'1', 
        title:'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una nuova specie di papera di gomma mai vista prima.',
        tags: 'geo, tech',
        author: 'Diana Rossi',
        published: '2023-02-11',
        image: 'rubber-duck'
    },
    {
        id:'2', 
        title:'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Un viaggio nelle profondità dell\'oceano alla scoperta di creature misteriose e inesplorate',
        tags: 'viaggi, geo',
        author: 'Fabio Mari',
        published: '2023-03-14',
        image: 'deep-sea'
    },
    {
        id:'3', 
        title:'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: 'cucina',
        author: 'Marta Bianchi',
        published: '2023-04-20',
        image: 'kitchen-food'
    },
    {
        id:'4', 
        title:'Arte moderna: oltre i confini convenzionali',
        content: 'Un\'analisi delle tendenze e delle sfide nell\'arte contemporanea, con interviste a artisti emergenti.',
        tags: 'arte, tech',
        author: 'Gabriele Neri',
        published: '2023-05-29',
        image: 'modern-art'
    }
];

convertObjects(articles)

const checkEl = document.getElementById('checkBox')

const selectEl = document.getElementById('selectTag')

const rowEl = document.querySelector('.row');


/* ************************************************************************ */
//populate DOM element

renderArticles(articles, rowEl) 

filterCheckedNews (articles)  // Check Filter for Initial/Refreshed page


/* ************************************************************************ */
// Select Filter   

selectEl.addEventListener('change', function(e) {

    selectedNews = articles.filter((news) => {

        for (let i = 0; i < news.tags.length; i++) {

            if (news.tags[i] === this.value || this.value === 'all') {
               return true;         
            } 
        }
    })
    
    rowEl.innerHTML = '';

    selectedNews.length < 1 ? rowEl.insertAdjacentHTML("beforeend", generateEmtyState ()) : renderArticles (selectedNews, rowEl);

    filterCheckedNews (selectedNews) // Check Filter for selected news
    
})


/* **************************************************************************** */
// populate select options dynamically

const tagTypes = []

const types = articles.filter(article => {
    for (let i = 0; i < article.tags.length; i++) {
      
        if(!tagTypes.includes(article.tags[i])){
            tagTypes.push(article.tags[i])
          }    
    } 
    return tagTypes    
})

renderSelectOptions(tagTypes, selectEl)  





/* ****************************************************************** */
// FUNCTIONS

/**
 * Renders a list of Article-cards into the given Dom Element 
 * @param {Array} newsList An Array of Objects 
 * @param {object} domElement The given dom element where to append articles
 */
function renderArticles (newsList, domElement){  
    
    newsList.forEach(news => {
        // rendering main markup of article cards
        domElement.insertAdjacentHTML("beforeend", generateArticle(news));  
    
        // rendering cathegory tags according to objects key 'tags'
        const tagsBoxEl = document.querySelector(`#${news.image} .tagsBox`);
        
        for (let i = 0; i < news.tags.length; i++) {
            tagsBoxEl.insertAdjacentHTML("beforeend", generateTags(news.tags[i]));
        }   
    
        // rendering bookmarks
        const boxEl = document.getElementById([news.image])
        const iEl = generateBookMark(news.id, news.boolean)
        boxEl.appendChild(iEl)
    })
}

/**
 * Generate the main-Markup of a Article-card
 * @param {object} news An Object with several keys
 * @returns An Object: MarkUp
 */
function generateArticle(news) {
    return `            
    <div class="col">
        <div id='${news.image}' class="box bg-white position-relative">
            <div>
                <h3>${news.title}</h3>
                <h4>pubblicato da ${news.author}</h4>
                <span class="date">in data ${news.published}</span>
                <p class="mt-2">${news.content}</p>
                <img width="100%" src="./assets/images/${news.image}.jpg" alt="${news.image}">
            </div>                        
            <div class="tagsBox">           
            </div>                       
        </div>
    </div>
    `
}

/**
 * Generate tags MarkUp 
 * @param {string} tagKey key of an object
 * @returns Object: MarkUp
 */
function generateTags(tagKey) {
    return `<div class="tag ${tagKey}_bgColor">${tagKey}</div>`

};

/**
 * Generate a bookMark with Event
 * @param {string} idKey key of an object
 * @param {string} booleanKey key of an object
 * @returns object: icon
 */
function generateBookMark(idKey, booleanKey) {

    const iEl = document.createElement('i');
    iEl.classList.add('fa-regular', 'fa-bookmark', 'position-absolute');
    iEl.setAttribute('id', idKey)
    
    booleanKey === true ? iEl.classList.replace('fa-regular', 'fa-solid') : iEl.classList.replace('fa-solid', 'fa-regular'); 
    
    iEl.addEventListener('click', function(e) {

        iEl.classList.replace('fa-regular', 'fa-solid');
        
        articles[idKey - 1].boolean = true
        console.log(articles);   
    })
    return iEl
};

/**
 * Renders a list of filtered article-cards into the given dom element
 * @param {Array} objectList An Array of Objects
 */
function filterCheckedNews (objectList) {
    
    checkEl.addEventListener('change', () => {
    
        rowEl.innerHTML = '';
    
        if (checkEl.checked) {

            const savedNews = objectList.filter(article => article.boolean === true)
      
            savedNews.length < 1 ? rowEl.insertAdjacentHTML("beforeend", generateEmtyState ()) : renderArticles (savedNews, rowEl);

        } else  /* if (checkEl is not checked) */ {
        
            objectList.length < 1 ? rowEl.insertAdjacentHTML("beforeend", generateEmtyState ()) : renderArticles (objectList, rowEl);
        }
    })
}

/**
 * Generate markup in case of empty state
 * @returns Object: empty-state message
 */
function generateEmtyState () {

    return `<div class="col">
                <h2 class="text-white fw-bold">No news available</h2>
            </div>`
}

/**
 * Renders all options in a select dynamically
 * @param {Array} optionsList A list of Strings
 * @param {object} selectDomEl the SelectDomElement where append all Options 
 */
function renderSelectOptions (optionsList, selectDomEl){
    
    optionsList.unshift('politica')
    
    optionsList.forEach(tag => {

        const optionEl = document.createElement('option')
        optionEl.value = tag
        optionEl.innerText = tag.charAt(0).toUpperCase() + tag.slice(1, tag.length).toLowerCase()

    selectDomEl.appendChild(optionEl)
    })   
}

/**
 * Converts two keys (.published and .tags) of every Objects of an Array
 * @param {Array} objectsList An Array of Objects
 */
function convertObjects(objectsList) {

    objectsList[0].boolean = true
    
    objectsList.forEach(article => {
        //convert us-date --> eu-date 
        article.published = (article.published.split('-')[2] + '/' + article.published.split('-')[1] + '/' + article.published.split('-')[0]); 
        console.log(article.published);
        //convert key-tags in array
        article.tags = article.tags.split(', ')
    })
}

