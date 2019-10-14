const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    env = process.env;

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/relevamiento_pozos", { useNewUrlParser: true, useUnifiedTopology: true });
require('./models/provincia');
require('./models/area_concesion');
require('./models/area_reserva');
require('./models/yacimiento');
require('./models/region');
require('./models/etapa');
require('./models/operacion');
require('./models/activo');

// DECLARAR ROUTES
var usuarioRoutes = require('./routes/usuario');
var permisoRoutes = require('./routes/permiso');
var relevadorRoutes=require('./routes/relevador'); 
var areaRoutes=require('./routes/area');
var pozoRoutes=require('./routes/pozo');
var etapaRoutes=require('./routes/etapa');
var Usuario = require('./models/usuario');

express = require('express');
bodyParser = require('body-parser');
var cfg = require('./config.js');
var jwt = require('jwt-simple');

var auth = require("./auth.js")();
app = express();



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization');

    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/public', express.static('public'));

app.use(bodyParser.json()); //para peticiones application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(auth.initialize());

// USAR ROUTES
app.use('/usuario', usuarioRoutes);
app.use('/permiso', permisoRoutes);
app.use('/relevador', relevadorRoutes);
app.use('/area', areaRoutes);
app.use('/pozo', pozoRoutes);
app.use('/etapa', etapaRoutes);


//#########################################################
//            INDEX RENDER PARA ANGULAR2
//######################################################
app.set('views', path.join(__dirname, 'src'));
// engine
app.set('view enginer', 'ejs');
app.engine('html', require('ejs').renderFile);
// angular  dist -- VERY IMPORTANT
app.use(express.static(__dirname + '/dist'));


app.get('/', function (req, res, next) {
    res.render('index.html');
});


app.post("/login", function (req, res) {
    if (req.body.username && req.body.password) {
        var username = req.body.username;
        var password = req.body.password;

        var user;
        Usuario.findOne({
            'username': username
        }, function (err, u) {
            user = u;
            if (user && user.password == req.body.password) {
                var payload = {
                    username: user.username,
                    permisos: ['empresa:read']
                };
                var token = jwt.encode(payload, cfg.jwtSecret);
                res.json({
                    _id: user._id,
                    token: token
                });
            } else {
                res.sendStatus(401);
            }
        });

    } else {
        res.sendStatus(401);
    }
});



app.get('/nuevo', function (req, res) {
    var u = new Usuario({
        username: "Lucas",
        password: "asd",
        firstName: "Lucas",
        lastName: "Sala"
    });
    u.save().then(function (u) {
        res.status(201).json({
            message: 'Usuario creado',
            obj: u
        });
    });
});

var reportingApp = express();
app.use('/reporting', reportingApp);

var jsreport = require('jsreport-core')();
jsreport.use(require('jsreport-templates')());
jsreport.use(require('jsreport-express')({
    app: reportingApp
}));

jsreport.init();


var server = http.createServer(app);
server.listen(process.env.PORT || 4000, function () {
    console.log("Servidor Corriendo");
});