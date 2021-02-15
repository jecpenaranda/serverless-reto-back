'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = (event, context, callback) => {

    const datetime = new Date().toISOString();
    const data = JSON.parse(event.body);

    if( typeof data.titulo !== 'string' ) {
        console.error('El título debe ser texto');
        const response = {
            statusCode: 400,
            body: JSON.stringify({ "message":"El título debe ser texto." })
        }
        return;
    }

    const params = {
        TableName: 'peliculas',
        Item: {
            id: uuid.v1(),
            titulo: data.titulo,
            episodio_id: data.episodio_id,
            parrafo_inicial: data.parrafo_inicial,
            director: data.director,
            productor: data.productor,
            fecha_lanzamiento: data.fecha_lanzamiento,
            especies: data.especies,
            naves: data.naves,
            vehiculos: data.vehiculos,
            caracteres: data.caracteres,
            planetas: data.planetas,
            url: data.url,
            creacion: datetime,
            edicion: datetime
        }
    };

    dynamoDb.put(params, (error, data) => {
        if(error) {
            console.error(error);
            callback(new Error(error));
            return;
        }

        const response = {
            statusCode: 201,
            body: JSON.stringify(data.Item)
        };

        callback(null, response);
    });
}
