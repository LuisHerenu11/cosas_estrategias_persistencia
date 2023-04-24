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
.then(() => Personas.create({
    nombre: 'Luis',
    apellido:'Hereñu',
    edad:25,
    sexo:'m'
}))
.then(pers => {
    console.log(pers.toJSON());
});

/* Actualizar persona */
Personas.update({nombre: 'Luis Marcelo'},{
    where:{
        apellido:'Hereñu'
    }
}).then(() => {
    console.log('actualización finalizada');
});


