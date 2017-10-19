function saveInterfacePlayerData(DB, req, res) {
	const player = JSON.parse(req.query.playerData);

	// const playersCollection = DB.collection('players');
	// playersCollection.deleteOne({ _id: player.input.name });

	const interfaceCollection = DB.collection('interface');

	player.output.GK = +player.output.GK;
	player.output.DEF = +player.output.DEF;
	player.output.MID = +player.output.MID;
	player.output.ATT = +player.output.ATT;
	// player.output.age = Math.round(+player.output.age);

	console.log('SAVE to interface: ', player);
	interfaceCollection.save({
		_id: player.input.name,
		player
	});

	res.send({ good: true });
}


module.exports = saveInterfacePlayerData;