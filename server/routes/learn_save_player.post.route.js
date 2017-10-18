function learnSavePlayerRoute(DB, req, res) {
	const player = JSON.parse(req.query.player);

	const playersCollection = DB.collection('players');
	playersCollection.deleteOne({ _id: player.input.name });

	const trainCollection = DB.collection('train');

	player.output.position = +player.output.position;
	player.output.quality = +player.output.quality;
	player.output.age = Math.round(+player.output.age);

	delete player.current;

	console.log('SAVE: ', player);
	trainCollection.save({
		_id: player.input.name,
		player
	});

	res.send({ good: true });
}


module.exports = learnSavePlayerRoute;