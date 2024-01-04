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

/* qui ho solo creato trasformato array in anticipo ma poi devo cambiare tags --> article.tags */

articles.forEach(article => {
    //convert us-date --> eu-date
    const split = article.published.split(/-/); 
    article.published = (split[2]+'/'+split[1]+'/'+split[0]); 
    //convert key tags in array
    const tags = article.tags.split(/, /)
    article.tags = tags
})
console.log(articles);
console.log(articles[1].tags[0]);




document.getElementById('selectTag').addEventListener('change', () => {
	//empty the DOM-element .row before appending new MarkUp
    const rowEl = document.querySelector('.row');
	rowEl.innerHTML = '';  
	
	//create array of objects according to selected property .tag
    const tagType = document.getElementById('selectTag').value
    //console.log(tagType);
	const tagSelectArticles = articles.filter((article) => {
        //console.log(article.tags.length);

        for (let i = 0; i < article.tags.length; i++) {

            if (article.tags[i] === tagType || tagType === 'all') {
               return true;         
            } /* else {
                rowEl.innerHTML = 'CIAO CIAO';
            } */
        
        }
    })
    console.log(tagSelectArticles);       
    tagSelectArticles.forEach(article => {
        // cicle function generateArticleMarkUp() > tagsBoxEl
        const articleMarkUp = generateArticleMarkUp(article.title, article.author, article.published, article.content, article.image, article.id);
        rowEl.insertAdjacentHTML("beforeend", articleMarkUp);  

        // cicle function generateTags()
        const tagsBoxEl = document.getElementById([article.id]);
    
        for (let i = 0; i < article.tags.length; i++) {
  
            const tagMarkUp = generateTags(article.tags[i])
            tagsBoxEl.insertAdjacentHTML("beforeend", tagMarkUp);
        }
        
    })      
        
        //console.log(tagSelectArticles);
})    



/* ************************************************************** */

/* articles.forEach(article  => {

    //convert us-date --> eu-date
    const split = article.published.split(/-/); 
    article.published = (split[2]+'/'+split[1]+'/'+split[0]); 

    // cicle function generateArticleMarkUp() > tagsBoxEl
    const articleMarkUp = generateArticleMarkUp(article.title, article.author, article.published, article.content, article.image, article.id);
    rowEl.insertAdjacentHTML("beforeend", articleMarkUp);  

    // cicle function generateTags()
    const tagsBoxEl = document.getElementById([article.id]);
    const tags = article.tags.split(/,/)

    for (let i = 0; i < tags.length; i++) {
    
        const tagMarkUp = generateTags(tags[i])
        tagsBoxEl.insertAdjacentHTML("beforeend", tagMarkUp);
    }
}) */

// ******************************************************************
//functions
function generateArticleMarkUp(title, author, date, content, image, id) {
    const articleMarkUp =`            
    <div class="col">
        <div class="box bg-white position-relative">
            <div>
                <h3>${title}</h3>
                <h4>pubblicato da ${author}</h4>
                <span class="date">in data ${date}</span>
                <p class="mt-2">${content}</p>
                <img width="100%" src="./assets/images/${image}.jpg" alt="${image}">
                <i class="fa-regular fa-bookmark position-absolute"></i>
            </div>            
            <div id="${id}" class="tagsBox">            
            </div>
        </div>
    </div>
    `
    return articleMarkUp
}

function generateTags(type) {
    const tagMarkUp = `<div class="tag ${type}_bgColor">${type}</div>`

    return tagMarkUp
}