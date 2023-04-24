const Sequelize = require('sequelize');

const sequelize = new Sequelize('personal_prueba', 'root', '1106', {
    host: 'localhost',
    dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize.authenticate().then(() => {
    console.log('conexión a sido establecida satisfactoriamente.');
})
.catch(err => {
    console.error('Incapacidad de conectarse a la base de datos:', err);
});

class Personas extends Sequelize.Model{}
Personas.init({
    nombre: Sequelize.STRING,
    apellido:Sequelize.STRING,
    edad: Sequelize.INTEGER,
    sexo: Sequelize.CHAR
}, {sequelize, modelName: 'personas'});


/* Crear persona */
sequelize.sync()
.then(() => Personas.bulkCreate([
    { nombre: 'Gonzalo', apellido:'Victoria', edad:23,sexo:'m'},
    { nombre: 'Joaquin', apellido:'Estornali', edad:28,sexo:'m'},
    { nombre: 'Florencia', apellido:'Baez', edad:25,sexo:'f'},
],
{
    ignoreDuplicates: false,
}))
.then(() => console.log("personas agregadas"));

/* Actualizar personas */
Personas.update(
    {sexo: 'f'},
    {
        where:{
            sexo:'m'
        },
    }
);

