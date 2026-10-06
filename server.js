const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { Medicamento, Usuario } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'pug');
app.set('views', './views'); // Corregido el path de las vistas
app.use(express.static('public'));

// Configuración de Sesiones
app.use(session({
    secret: 'secreto_farmacia_123',
    resave: false,
    saveUninitialized: false
}));

// Middleware para pasar usuario a las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Middleware de Autenticación
const isAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Middleware de Roles
const checkRole = (roles) => (req, res, next) => {
    if (req.session.user && roles.includes(req.session.user.role)) {
        next();
    } else {
        res.status(403).send('<h1>Acceso Denegado</h1><p>No tienes permisos para acceder a esta ruta.</p><a href="/">Volver</a>');
    }
};

// RUTAS PRINCIPALES 
app.get('/', (req, res) => {
    if(req.session.user) return res.redirect('/inicio');
    res.redirect('/login');
});
app.get('/inicio', isAuth, (req, res) => res.render('index')); 

// RUTAS DE AUTENTICACIÓN
app.get('/login', (req, res) => res.render('auth/login'));
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Usuario.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user.id, username: user.username, role: user.role };
            res.redirect('/inicio');
        } else {
            res.render('auth/login', { error: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno');
    }
});

app.get('/register', (req, res) => res.render('auth/register'));
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existing = await Usuario.findOne({ where: { username } });
        if (existing) return res.render('auth/register', { error: 'El nombre de usuario ya está en uso' });
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await Usuario.create({ username, password: hashedPassword, role });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// RUTAS DE VENTAS 
app.get('/ventas/caja', isAuth, checkRole(['moderador', 'administrador']), (req, res) => res.render('ventas/caja'));

// RUTAS DE COMPRAS
app.get('/compras/proveedores', isAuth, checkRole(['moderador', 'administrador']), (req, res) => res.render('compras/proveedores'));

// GET: Listar medicamentos (Almacén)
app.get('/almacen/productos', isAuth, checkRole(['administrador']), async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll();
        res.render('almacen/productos', { medicamentos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST: Crear medicamento
app.post('/almacen/productos/add', isAuth, checkRole(['administrador']), async (req, res) => {
    try {
        const { descripcionMed, Presentacion, stock, precioVentaUni, Marca } = req.body;
        await Medicamento.create({ descripcionMed, Presentacion, stock, precioVentaUni, Marca });
        res.redirect('/almacen/productos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST: Editar medicamento
app.post('/almacen/productos/edit/:id', isAuth, checkRole(['administrador']), async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcionMed, Presentacion, stock, precioVentaUni, Marca } = req.body;
        
        await Medicamento.update({ descripcionMed, Presentacion, stock, precioVentaUni, Marca }, { where: { id } });
        res.redirect('/almacen/productos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST: Eliminar medicamento
app.post('/almacen/productos/delete/:id', isAuth, checkRole(['administrador']), async (req, res) => {
    try {
        const { id } = req.params;
        await Medicamento.destroy({ where: { id } });
        res.redirect('/almacen/productos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});