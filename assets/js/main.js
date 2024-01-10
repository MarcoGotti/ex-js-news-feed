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


/* ************************************************************************ */
// Select Filter   

selectEl.addEventListener('change', function(e) {

    selectedArticles = articles.filter((article) => {

        for (let i = 0; i < article.tags.length; i++) {

            if (article.tags[i] === this.value || this.value === 'all') {
               return true;         
            } 
        }
    })
    console.log(selectedArticles);
    rowEl.innerHTML = '';
    /* if (selectedArticles.length < 1){
        // empty state 
        rowEl.insertAdjacentHTML("beforeend", renderEmtyState ())

    } else {
        // populate DOM element
        renderArticles (selectedArticles, rowEl);
    } */

    selectedArticles.length < 1 ? rowEl.insertAdjacentHTML("beforeend", renderEmtyState ()) : renderArticles (selectedArticles, rowEl);


/* *********************************************************+ */
// Check Filter by Selected News

    checkEl.addEventListener('change', () => {

        renderCheckedNews (selectedArticles)
    
    })
})
 
/* ************************************************************************** */
// Check Filter Initial/Refreshed page
checkEl.addEventListener('change', () => {

    renderCheckedNews (articles)
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

tagTypes.unshift('politica')

renderSelectOptions(tagTypes, selectEl)



/* ****************************************************************** */
// FUNCTIONS

/**
 * Renders a list of Article-cards into the given Dom Element 
 * @param {Array} articleList An Array of Objects 
 * @param {Object} domElement The given dom element where to append articles
 * @param {String} initialSelectValue The select filter for the initial/refreshed page
 */
function renderArticles (articleList, domElement){  
    
    articleList.forEach(news => {
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
 * @param {Object} article An Object with several keys
 * @returns An Object: MarkUp
 */
function generateArticle(article) {
    return `            
    <div class="col">
        <div id='${article.image}' class="box bg-white position-relative">
            <div>
                <h3>${article.title}</h3>
                <h4>pubblicato da ${article.author}</h4>
                <span class="date">in data ${article.published}</span>
                <p class="mt-2">${article.content}</p>
                <img width="100%" src="./assets/images/${article.image}.jpg" alt="">
            </div>                        
            <div class="tagsBox">           
            </div>                       
        </div>
    </div>
    `
}

/**
 * Generate tags MarkUp 
 * @param {String} type 
 * @returns Object: MarkUp
 */
function generateTags(type) {
    return `<div class="tag ${type}_bgColor">${type}</div>`

};

/**
 * Generate a bookMark with Event
 * @returns object: icon
 */
function generateBookMark(attributeId, boolean) {

    const iEl = document.createElement('i');
    iEl.classList.add('fa-regular', 'fa-bookmark', 'position-absolute');
    iEl.setAttribute('id', attributeId)
    
    boolean === true ? iEl.classList.replace('fa-regular', 'fa-solid') : iEl.classList.replace('fa-solid', 'fa-regular'); 
    
    iEl.addEventListener('click', function(e) {

        iEl.classList.replace('fa-regular', 'fa-solid');
        
        articles[attributeId - 1].boolean = true
        console.log(articles);   
    })
    return iEl
};

/**
 * 
 * @returns Object: empty-state message
 */
function renderEmtyState () {

    return `<div class="col">
                <h2 class="text-white fw-bold">No news avilable</h2>
            </div>`
}

/**
 * Renders all options in a select dynamically
 * @param {Array} optionsList A list of Strings
 * @param {Object} selectDomEl the SelectDomElement where append all Options 
 */
function renderSelectOptions (optionsList, selectDomEl){

    optionsList.forEach(option => {

        const optionEl = document.createElement('option')
        optionEl.value = option
        optionEl.innerText = option.charAt(0).toUpperCase() + option.slice(1, option.length).toLowerCase()

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
        const split = article.published.split(/-/); 
        article.published = (split[2]+'/'+split[1]+'/'+split[0]); 
        //convert key-tags in array
        const tags = article.tags.split(/, /)
        article.tags = tags
    })
}

/**
 * Renders a list of filtered article-cards into the given dom element
 * @param {Array} objectList An Array of Objects
 */
function renderCheckedNews (objectList) {
    
    if (checkEl.checked) {

        const savedNews = objectList.filter(article => article.boolean === true)
        rowEl.innerHTML = '';
        savedNews.length < 1 ? rowEl.insertAdjacentHTML("beforeend", renderEmtyState ()) : renderArticles (savedNews, rowEl);
        /* if (savedNews.length < 1){
            // empty state
            rowEl.innerHTML = '';
            rowEl.insertAdjacentHTML("beforeend", renderEmtyState ())
    
        } else {
            // populate DOM element    
            rowEl.innerHTML = '';
            renderArticles (savedNews, rowEl)  
        } */


    } else  /* if (checkEl is not checked) */ {
        
        rowEl.innerHTML = '';
        renderArticles (objectList, rowEl)
    }
}
