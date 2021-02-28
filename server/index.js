const express = require( 'express' );
const app = express();
const cors = require( 'cors' );

const pool = require( './db' );

app.use( cors() );
app.use( express.json() );

// app.get( '/', ( req, res ) => { res.json( "yes" ); } );


app.post( '/todos', async ( req, res ) => {
    try {
        const { description } = req.body;
        console.log( description );
        const newTodo = await pool.query( "INSERT INTO todo (description) VALUES($1) RETURNING *", [description] );

        res.json( newTodo );
    } catch ( error ) {
        console.error( error.message );
    }
} );

app.get( '/todos', async ( req, res ) => {
    try {
        const { description } = req.body;
        console.log( description );
        const newTodos = await pool.query( "SELECT * FROM todo" );
        res.json( newTodos.rows );
    } catch ( error ) {
        console.error( error.message );
    }
} );


app.get( '/todos/:id', async ( req, res ) => {
    try {
        const { id } = req.params;

        const todo = await pool.query( "SELECT * FROM todo WHERE todo_id = $1", [id] );
        res.json( todo.rows[0] );
    } catch ( error ) {
        console.error( error.message );
    }
} );

app.put( '/todos/:id', async ( req, res ) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query( "UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id] );
        res.json( updateTodo.rows[0] );
    } catch ( error ) {
        console.error( error.message );
    }
} );


app.delete( '/todos/:id', async ( req, res ) => {
    try {
        const { id } = req.params;

        const deleteTodo = await pool.query( "DELETE FROM todo WHERE todo_id = $1", [id] );
        res.json( deleteTodo.rows[0] );
    } catch ( error ) {
        console.error( error.message );
    }
} );


app.listen( 5000, () => {
    console.log( 'Server is listening on port 5000' );
} );