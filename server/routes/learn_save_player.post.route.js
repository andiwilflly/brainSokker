function learnSavePlayerRoute(DB, req, res) {
	const player = JSON.parse(req.query.player);

	const playersCollection = DB.collection('players');
	playersCollection.deleteOne({ _id: player.input.name });

	const trainCollection = DB.collection('train');
	trainCollection.save({
		_id: player.input.name,
		player
	});

	res.send({ good: true });
}


export default learnSavePlayerRoute;