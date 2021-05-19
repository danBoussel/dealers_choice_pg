const express = require('express')
const app = express()
const { connect, db, syncAndSeed } = require('./books_data')
    //const books_data = require('./books_data')

const morgan = require('morgan')
app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'))





app.get('/', async(req, res, next) => {

            try {
                const response = await db.query('SELECT * FROM "Author" INNER JOIN "Books"  ON author_id = "Author".id')
                const authors = response.rows;
                //console.log(authors)


                res.send(`

        <html>
        <title>Books Of The Week</title>
        <link rel="stylesheet" href="/style.css" />
        <body>
        
        <header>B<div class='eye'><div class='eye-in'><div></div></div></div> <div class='eye'><div class='eye-in'><div></div></div></div> ks Of The Week</header>
        <div class='wrapper'>
        ${authors.map(book =>`
        <div class='book-box'>
        <img src= ${book.img}/>
        <h2>${book.title}</h2>
        <p class='author'>${book.name}</p>
        <a class='button' href='/description/${book.id}' >Description</a>
        </div>
        `).join('')}
        </div>
    
        </body>
        </html>
`);
    } catch (err) {
        console.log(err);
    }

});



app.get('/description/:id', async(req, res, next) => {

//const book = books_data.find(req.params.id)
try{

    let response = await db.query('SELECT * FROM "Author" WHERE id=$1;', [req.params.id]);
    
    const author = response.rows[0];
     response = await db.query('SELECT * FROM "Books" WHERE author_id=$1;', [req.params.id]);
    const details = response.rows[0];
    

res.send(`
<html>
<title>Books Of The Week</title>
<link rel="stylesheet" href="/style.css" />
<body>

<header>B<div class='eye'><div class='eye-in'><div></div></div></div> <div class='eye'><div class='eye-in'><div></div></div></div> ks Of The Week</header>
<div class='description-wrapper'>
<div class='book-box'>
<img src= '${details.img}'/>
<h2>${details.title}</h2>
<p class='author'>${author.name}</p>
<a class='button' href='/' >Back to Books</a>
</div>
<div class='description'>
<iFrame ${details.video}></iFrame>
<p>${details.description}</p>
<a class='button' href='${details.readmore}' >Read More </a>
</div>
</div>
</body>
</html>
`);
}
catch(err){
    console.log(err)
}
});


const port = process.env.PORT || 3000;

const init = async() => {
    try {
        
        connect();
        // const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port: ${port}`));
    } catch (error) {
        console.log(error);
    }
};

init();