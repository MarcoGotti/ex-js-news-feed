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

/* ****************************************************************** */
//populate MarkUp

const rowEl = document.querySelector('.row');

renderArticles(articles, rowEl)

document.querySelector('#rubber-duck i').classList.replace('fa-regular', 'fa-solid');

/* ********************************************************************* */
// populate select options

const selectEl = document.getElementById('selectTag')

const tagTypes = []
const types = articles.filter(article => {
    for (let i = 0; i < article.tags.length; i++) {
        //tagTypes.push(article.tags[i])
        if(!tagTypes.includes(article.tags[i])){
            tagTypes.push(article.tags[i])
          }    
    } 
    return tagTypes
    
})

tagTypes.unshift('politica')

renderSelectOptions(tagTypes, selectEl)

/* ************************************************************************ */
// Select Filter

selectEl.addEventListener('change', function(e) {

    selectedArticles = articles.filter((article) => {

        for (let i = 0; i < article.tags.length; i++) {

            if (article.tags[i] === this.value || this.value === 'all') {
               return true;         
            } /* else {
                rowEl.innerHTML = 'CIAO CIAO';
            } */
        
        }
    })
    console.log(selectedArticles);

    rowEl.innerHTML = ''; 

    renderArticles (selectedArticles, rowEl)
    
    document.querySelector('#rubber-duck i').classList.replace('fa-regular', 'fa-solid');

    /* _____________________________________________ */

    


    /* __________________________________________________ */
})

/* **************************************************************************+ */
// Checkbox Filter



/* ************************************************************* */

/**
 * Renders a list of Article-cards into the given Dom Element 
 * @param {Array} articleList An Array of Objects 
 * @param {Object} domElement The given dom element where to append articles
 */
function renderArticles (articleList, domElement){
    
    articleList.forEach(article => {
        // rendering main markup of article cards
        domElement.insertAdjacentHTML("beforeend", generateArticle(article));  
    
        // rendering cathegory tags according to objects key 'tags'
        const tagsBoxEl = document.querySelector(`#${article.image} .tagsBox`);
        //console.log(tagsBoxEl);
        
        for (let i = 0; i < article.tags.length; i++) {
            tagsBoxEl.insertAdjacentHTML("beforeend", generateTags(article.tags[i]));
        }   
    
        // rendering bookmarks
        const boxEl = document.getElementById([article.image])
        const iEl = generateBookMark(article.id)
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
 * Generate more specific MarkUp 
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
function generateBookMark(attributeId) {
    const iEl = document.createElement('i');
    iEl.classList.add('fa-regular', 'fa-bookmark', 'position-absolute');
    iEl.setAttribute('id', attributeId)
    iEl.addEventListener('click', function(e) {
        iEl.classList.replace('fa-regular', 'fa-solid');
    })
    return iEl
};
console.log(generateBookMark());

/**
 * Converts two keys (.published and .tags) of every Objects of an Array
 * @param {Array} objectsList An Array of Objects
 */
function convertObjects(objectsList) {
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







const checkEl = document.getElementById('checkBox')

    

    checkEl.addEventListener('change', function(e){
    
        if (this.checked) {
            
            /* const checkedNews = document.querySelectorAll('i')

            checkedNews.forEach(bookmarkEl => {
                const iId = bookmarkEl.id
                let x = bookmarkEl.classList.contains('fa-solid')
                console.log(x);
                console.log(iId);
                if (x === true){
                
                    //console.log(iId);
                    console.log(articles[iId - 1]);
                    checkedArticles.push(articles[iId - 1])
                
                }
            
            }) */

            generateCheckedNewsList()
            //console.log(checkedArticles);

            /* rowEl.innerHTML = '';
    
            renderArticles (checkedArticles, rowEl)
 */
            console.log("Checkbox is checked..");

        } else {
            rowEl.innerHTML = '';

            renderArticles (selectedArticles, rowEl)

            console.log("Checkbox is default..");
        }

        //this.checked ? console.log('Yes') : console.log('No');
    })




function generateCheckedNewsList(){
    
    const checkedNews = document.querySelectorAll('i')

    let checkedArticles = []

    checkedNews.forEach(bookmarkEl => {
        const iId = bookmarkEl.id
        let x = bookmarkEl.classList.contains('fa-solid')
        console.log(x);
        console.log(iId);
        if (x === true){
        
            console.log(articles[iId - 1]);
            checkedArticles.push(articles[iId - 1])
                
            /* const checkedArticles = selectedArticles.filter(article => article.id === iId)
            console.log(checkedArticles); */
            /* rowEl.innerHTML = '';
    
            renderArticles (checkedArticles, rowEl) */
        }
        console.log(checkedArticles);

        

    })
    rowEl.innerHTML = '';
    
    renderArticles (checkedArticles, rowEl)
}