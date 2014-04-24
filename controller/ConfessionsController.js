var express = require( 'express' );
var Confessions = require( '../model/ConfessionsModel' );
var Router = express.Router();

Router
	.get( '/confessions', function ( request, response ) {
		Confessions.find( function ( error, doc ) {
			if ( error ) {
				return response.send( 500, error );
			}

			response.send( 200, doc );
		} );
	} )
	.post( '/confessions', function ( request, response ) {
		var new_post=new Confessions({message:request.body.message,alias:request.body.alias});
		new_post.save(function (err) {
			if (err) 
				response.send('Error on save!');
			else
				response.send('Post submitted successfully!');

		});
	} )
	.get( '/confessions/:messageId', function ( request, response ) {
		Confessions.findById( request.params.messageId, function (error, doc) {
			if( error ) {
				return response.send( 500, error );
			}

			response.send( 200, doc );
		} );
	} )
	.put( '/confessions/:messageId', function ( request, response ) {
		Confessions.findById( request.params.messageId, function (error, doc ) {
			if( error ) {
				return response.send( 500, error );
			}

			doc.message = request.body.message;

			doc.save( function ( error ) {
				if( error ) {
					return response.send( 500, error );
				}
				response.send( 200, doc);
			} );
		} );
	} );



	

module.exports = Router;