console.log("VERSION AFTER FABIO'S LESSON");

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

selectEl.addEventListener('change', applyFilter);
checkEl.addEventListener('change', applyFilter);

renderArticles(articles, rowEl) 


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
        const tagsBoxEl = document.querySelector(`[data-index="${news.id}"] .tagsBox`);     
        for (let i = 0; i < news.tags.length; i++) {
            const tagBadge = generateTagBadge(news.tags[i])
            tagsBoxEl.appendChild(tagBadge); }  
    
        // rendering bookmarks
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
 * @param {string} tagKey key of an object
 * @returns String: MarkUp
 */
function generateTagBadge(tag) {  
    const tagBadge = document.createElement('div');
    tagBadge.className = `tag ${tag}_bgColor`
    tagBadge.innerText = `${tag}`

    return tagBadge
};

/**
 * Generate a bookMark with Event
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

function applyFilter(){
    const type = selectEl.value;
    const onlySaved = checkEl.checked;
  
    let filteredItems;
    filteredItems = filterByType(articles, type);
  
    if (onlySaved) {
      filteredItems = filterOnlyChecked(filteredItems);
    }
  
    if (filteredItems.length > 0) {
        rowEl.innerHTML = '';
        renderArticles(filteredItems, rowEl);
    } else {
        rowEl.innerHTML = '';
      noItemsToShow();
    }
}

function noItemsToShow() {
    rowEl.innerHTML = `<div class="col">
                <h2 class="text-white fw-bold">No news available</h2>
            </div>`;
  }

function filterOnlyChecked(arr) {
    return arr.filter((item) => item.boolean === true);
  }

function filterByType(arr, type) {
    if (!type) return arr;
    return arr.filter((item) => item.tags.includes(type));
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
        return tagTypes    
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
function convertObjects(objectsList) {
    objectsList.forEach(news => {
        //convert us-date --> eu-date 
        news.published = (news.published.split('-')[2] + '/' + news.published.split('-')[1] + '/' + news.published.split('-')[0]); 
        //convert key-tags in array
        news.tags = news.tags.split(', ')
    })
    objectsList[0].boolean = true
}

















