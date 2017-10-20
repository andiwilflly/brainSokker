function interfacePlayers(DB, req, res) {
	const interfaceCollection = DB.collection('interface');

	interfaceCollection.find().toArray(function(err, players) {
		res.send(players);
	});
}


module.exports = interfacePlayers;