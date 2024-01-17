console.log("MY MILESTONE");

const checkEl = document.getElementById('checkBox')
const selectEl = document.getElementById('selectTag')
const rowEl = document.querySelector('.row');

const articles = [
    {
        id: 1, 
        title:'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una nuova specie di papera di gomma mai vista prima.',
        tags: 'geo, tech',
        author: 'Diana Rossi',
        published: '2023-02-11',
        image: 'rubber-duck'
    },
    {
        id: 2, 
        title:'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Un viaggio nelle profondità dell\'oceano alla scoperta di creature misteriose e inesplorate',
        tags: 'viaggi, geo',
        author: 'Fabio Mari',
        published: '2023-03-14',
        image: 'deep-sea'
    },
    {
        id: 3, 
        title:'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: 'cucina',
        author: 'Marta Bianchi',
        published: '2023-04-20',
        image: 'kitchen-food'
    },
    {
        id: 4, 
        title:'Arte moderna: oltre i confini convenzionali',
        content: 'Un\'analisi delle tendenze e delle sfide nell\'arte contemporanea, con interviste a artisti emergenti.',
        tags: 'arte, tech',
        author: 'Gabriele Neri',
        published: '2023-05-29',
        image: 'modern-art'
    }
];

convertObjects(articles)
renderSelectOptions(selectEl)

/* ************************************************************************ */
//initialize

renderArticles(articles, rowEl) 
filterSelect (articles)
filterCheck (articles)


/* ****************************************************************** */
// FUNCTIONS

/**
 * Renders a list of Article-cards into the given Dom Element 
 * @param {Array} newsList An Array of Objects 
 * @param {object} domElement The given dom element where to append articles
 */
function renderArticles (newsList, domElement){  

    newsList.forEach(news => {
        // rendering main markup of article cards with Template Literal
        domElement.insertAdjacentHTML("beforeend", generateArticle(news));  
    
        // rendering cathegory tags with .createEl
        const tagsBoxEl = document.querySelector(`[data-index="${news.id}"] .tagsBox`);
        for (let i = 0; i < news.tags.length; i++) {
            const tagBadge = generateTagBadge(news.tags[i])
            tagsBoxEl.appendChild(tagBadge); }           
          
    
        // rendering bookmarks with .createEl
        const iEl = generateBookMark(news)
        tagsBoxEl.insertAdjacentElement("afterend", iEl)
    })
}

/**
 * Generate the main-Markup of a Article-card
 * @param {object} news An Object 
 * @returns String: Template Literam
 */
function generateArticle(news) {
    return `            
    <div class="col">
        <div class="box bg-white position-relative" data-index="${news.id}">
            <div>
                <h3>${news.title}</h3>
                <h4>pubblicato da ${news.author}</h4>
                <span class="date">in data ${news.published}</span>
                <p class="mt-2">${news.content}</p>
                <img width="100%" src="./assets/images/${news.image}.jpg" alt="${news.image === undefined ? '&#169; Missing Image' : ''}">
            </div>                        
            <div class="tagsBox">           
            </div>                       
        </div>
    </div>
    `
}

/**
 * Generate tags MarkUp 
 * @param {string} tag value of a key
 * @returns String: MarkUp
 */
function generateTagBadge(tag) {
    const tagBadge = document.createElement('div');
    tagBadge.className = `tag ${tag}_bgColor`
    tagBadge.innerText = `${tag}`

    return tagBadge
};

/**
 * Generate a bookMarkEl with attached Event
 * @param {object} news An Object
 * @returns object: icon
 */
function generateBookMark(news) { 

    const iEl = document.createElement('i');
    iEl.classList.add(news.boolean === true ? iEl.classList.add('fa-solid') : iEl.classList.add('fa-regular'), 'fa-bookmark', 'position-absolute');

    //FirstClick
    iEl.addEventListener('click', () => {       
        iEl.classList.toggle('fa-solid', defineBoolean (news));
        iEl.classList.toggle('fa-regular');
        console.log(articles);
    })
    return iEl 
};

/**
 * Creates and/or defines the key .boolean of an object
 * @param {object} news 
 */
function defineBoolean(news) {
    if(!articles[news.id - 1].boolean) return articles[news.id - 1].boolean = true;      
    return  articles[news.id - 1].boolean === true ? articles[news.id - 1].boolean = false : articles[news.id - 1].boolean = true ;   
}

/**
 * Applies filter selection
 * @param {Array} objectList 
 */
function filterSelect (objectList){
    selectEl.addEventListener('change', (e) => {

        selectedNews = objectList.filter((news) => {        
            for (let i = 0; i < news.tags.length; i++) {
                if (news.tags[i] === e.target.value || e.target.value === '') {
                return true;         
                } 
            }
        })
    filterResult(selectedNews)
    filterCheck (selectedNews) // Check Filter for selected news   
    })
}

/**
 * Applies Filter check
 * @param {Array} objectList An Array of Objects
 */
function filterCheck (objectList) {   
    checkEl.addEventListener('change', (e) => {   
     
        if (e.target.checked) {
            const savedNews = objectList.filter(article => article.boolean === true)     
            filterResult(savedNews)
            //filterSelect (savedNews)

        } else {
            filterResult(objectList)
            //filterSelect (objectList)
        }
        filterSelect (savedNews
            )
    })
}

/**
 * @param {Array} objectList An Array of Objects
 * @returns a function
 */
function filterResult(objectList){
    rowEl.innerHTML = '';
    return objectList.length < 1 ? rowEl.insertAdjacentHTML("beforeend", generateEmtyState()) : renderArticles (objectList, rowEl);
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
 * @param {object} selectDomEl the SelectDomElement where append all Options 
 */
function renderSelectOptions (selectDomEl){
    
    const tagTypes = []
    articles.forEach(news => {
        for (let i = 0; i < news.tags.length; i++) {     
            if(!tagTypes.includes(news.tags[i])){
            tagTypes.push(news.tags[i])
            }    
        }   
    })
    
    tagTypes.unshift('politica')
     
    tagTypes.forEach(tag => {
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
function convertObjects(objectsList){    
    objectsList.forEach(news => {
        //convert us-date --> eu-date 
        news.published = (news.published.split('-')[2] + '/' + news.published.split('-')[1] + '/' + news.published.split('-')[0]);  
        //convert key-tags in array
        news.tags = news.tags.split(', ')
    })
    objectsList[0].boolean = true
}

