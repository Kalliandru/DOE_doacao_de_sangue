const express = require('express');
const server = express();


//Configurações para arquivos extras
server.use(express.static('public'));

//habilitar body do form
server.use(express.urlencoded({extended:true}));


//configurar conexão com banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: '159756153asuraJP',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

//configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
    express: server,
    noCache: true,
});


//Rota '/'
server.get('/', function (req, res) {
    
    db.query("SELECT * FROM donors", function(err, result){
        if(err){
        console.log(err);
        return res.send('Erro no DB');
        }
        
        const doadores = result.rows;
        return res.render("index.html", { doadores });
    });


});

server.post('/', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if(name == "" || email == "" || blood ==""){
        return res.send("Todos os campos são obrigatórios.");
    }

    const query =`
    INSERT INTO donors("name", "email", "blood") 
    VALUES ($1, $2, $3)
    `

    const values = [name, email, blood];

    db.query(query, values, function(err){
            if (err){
                console.log(err);
                return res.send('Erro no DB');
            } 

            return res.redirect('/');
    });
});

server.listen(3000, function () {
    console.log('SERVER ON');
});