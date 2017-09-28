function playersRoute(DB, req, res) {
	const playersCollection = DB.collection('players');
	playersCollection.find().toArray(function(err, players) {
		res.send(players);
	});
}


export default playersRoute;