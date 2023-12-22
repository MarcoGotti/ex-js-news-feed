

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

//convert us-date in eu-date
const rowEl = document.querySelector('.row');

articles.forEach(article  => {
    const split = article.published.split(/[-]/);
    article.published = (split[2]+'-'+split[1]+'-'+split[0]); 

    const articleMarkUp = generateArticleMarkUp(article.title, article.author, article.published, article.content, article.image);
    rowEl.insertAdjacentHTML("beforeend", articleMarkUp);   
})
console.log(articles);


function generateArticleMarkUp(title, author, date, content, image) {
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
            <div class="tagsBox">
                <div class="tag">geo</div>
                <div class="tag">geo</div>
            </div>
        </div>
    </div>
    `
    return articleMarkUp
}