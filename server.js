const express = require('express');
const { Medicamento } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'pug');
app.set('views', './views'); // Corregido el path de las vistas
app.use(express.static('public'));

// RUTAS PRINCIPALES 
app.get('/', (req, res) => res.render('index'));
app.get('/inicio', (req, res) => res.render('index')); 

// RUTAS DE VENTAS 
app.get('/ventas/caja', (req, res) => res.render('ventas/caja'));

// RUTAS DE COMPRAS
app.get('/compras/proveedores', (req, res) => res.render('compras/proveedores'));

// GET: Listar medicamentos
app.get('/almacen/productos', async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll();
        res.render('almacen/productos', { medicamentos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// POST: Crear medicamento
app.post('/almacen/productos/add', async (req, res) => {
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
app.post('/almacen/productos/edit/:id', async (req, res) => {
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
app.post('/almacen/productos/delete/:id', async (req, res) => {
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
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});