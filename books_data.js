const pg = require('pg')

const db = new pg.Client('postgress://localhost/dealers_choice_db');




const syncAndSeed = async() => {
    const SQL = `
    DROP TABLE IF EXISTS "Books";
    DROP TABLE IF EXISTS "Author"; 
CREATE TABLE "Author"(
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
CREATE TABLE "Books"(
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(575) NOT NULL,
    readmoreurl character varying(500) NOT NULL,
    imgurl character varying(500) NOT NULL,
    videourl character varying(500) NOT NULL,
    author_id INTEGER REFERENCES "Author"(id)
);

INSERT INTO "Author"(id,name) VALUES(1,'Maggie Shipstead');
INSERT INTO "Author"(id,name) VALUES(2,'Michael Lewis');
INSERT INTO "Author"(id,name) VALUES(3,'Meghan the Duchess of Sussex and Christian Robinson');
INSERT INTO "Author"(id,name) VALUES(4,'Suzanne Simard');

INSERT INTO "Books"(id,title,description,readmoreurl,imgurl,videourl,author_id) VALUES (1,'Great Circle', 'An unforgettable story of a daredevil female aviator determined to chart her own course in life, at any cost--Great Circle spans Prohibition-era Montana, the Pacific Northwest, Alaska, New Zealand, wartime London, and modern-day Los Angeles.','https://bookshop.org/books/great-circle-9780593459416/9780525656975?listref=bookshop-org-best-sellers-of-the-week','https://images-production.bookshop.org/spree/images/attachments/13091160/original/9780525656975.jpg?1616107336', 'width="595" height="350" src="https://www.youtube.com/embed/g0NB2smKB6M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen',1);
INSERT INTO "Books"(id,title,description,readmoreurl,imgurl,videourl,author_id) VALUES (2,'The Premonition: A Pandemic Story','Fortunately, we are still a nation of skeptics. Fortunately, there are those among us who study pandemics and are willing to look unflinchingly at worst-case scenarios. Michael Lewiss taut and brilliant nonfiction thriller pits a band of medical visionaries against the wall of ignorance that was the official response of the Trump administration to the outbreak of COVID-19.','https://bookshop.org/books/the-premonition-a-pandemic-story/9780393881554?listref=bookshop-org-best-sellers-of-the-week','https://images-production.bookshop.org/spree/images/attachments/13830158/original/9780393881554.jpg?1619542620','width="595" height="350" src="https://www.youtube.com/embed/XcHc9oGWLBc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen',2);
INSERT INTO "Books"(id,title,description,readmoreurl,imgurl,videourl,author_id) VALUES (3,'The Bench', 'Meghan The Duchess of Sussexs first childrens book, The Bench, beautifully captures the special relationship between father and son, as seen through a mothers eyes. The books storytelling and illustration give us snapshots of shared moments that evoke a deep sense of warmth, connection, and compassion.','https://bookshop.org/books/the-bench-9780593434512/9780593434512?listref=bookshop-org-best-sellers-of-the-week','https://images-production.bookshop.org/spree/images/attachments/14334745/original/9780593434512.jpg?1620660158','width="595" height="350" src="https://www.youtube.com/embed/P7SiHew2BIg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen',3);
INSERT INTO "Books"(id,title,description,readmoreurl,imgurl,videourl,author_id) VALUES (4,'Finding the Mother Tree','From the worlds leading forest ecologist who forever changed how people view trees and their connections to one another and to other living things in the forest--a moving, deeply personal journey of discovery','https://bookshop.org/books/finding-the-mother-tree-discovering-the-wisdom-of-the-forest-9780593459423/9780525656098?listref=bookshop-org-best-sellers-of-the-week','https://images-production.bookshop.org/spree/images/attachments/13540448/original/9780525656098.jpg?1615363848','width="595" height="350" src="https://www.youtube.com/embed/3PvbU6fV8pg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen',4);

`;
    await db.query(SQL);
};


const connect = async() => {
    try {
        await db.connect();
        console.log('connected to DB');
        await syncAndSeed();
        console.log('seeded to DB');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    db,
    syncAndSeed,
    connect,
};