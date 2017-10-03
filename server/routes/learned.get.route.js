function learned(DB, req, res) {
	const trainCollection = DB.collection('train');

	trainCollection.find().toArray(function(err, players) {
		res.send(players);
	});
}


module.exports = learned;