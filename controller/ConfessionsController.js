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
		var newPost = new Confessions( {
			message : request.body.message,
			alias   : request.body.alias
		} );

		newPost.save( function ( error ) {
			if ( error ) {
				return response.send( 500, error );
			}
			response.send( 200, { 'status' : 'OK' } );
		} );
	} )
	.get( '/confessions/:messageId', function ( request, response ) {
		Confessions.findById( request.params.messageId, function ( error, doc ) {
			if ( error ) {
				return response.send( 500, error );
			}
			response.send( 200, doc );
		} );
	} )
	.put( '/confessions/:messageId', function ( request, response ) {
		Confessions.update( {
			_id : request.params.messageId},
			{ message : request.body.message },
			{ multi : true },
			function( error, doc ) {
				if ( error ) {
					response.send( 500, error );
				}
				response.send( 200, doc );
		} );
	} )
	.delete( '/confessions/:messageId', function( request, response ) {
		Confessions.remove( { _id : request.params.messageId },
			function( error, doc ) {
				if ( error ) {
					response.send( 500, error );
				}
				response.send( 200 );
		} );
	} )
	.delete( '/confessions', function( request, response ) {
		Confessions.remove( {}, function( error ) {
			if ( error ) {
				response.send( 500, error );
			}
			response.send( 200 );
		} );
	} );
	
module.exports = Router;