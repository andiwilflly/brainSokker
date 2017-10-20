function saveInterfacePlayerData(DB, req, res) {
	const player = JSON.parse(req.query.playerData);

	const interfaceCollection = DB.collection('interface');

	player.output.GK = +(+player.output.GK).toFixed(1);
	player.output.DEF = +(+player.output.DEF).toFixed(1);
	player.output.MID = +(+player.output.MID).toFixed(1);
	player.output.ATT = +(+player.output.ATT).toFixed(1);


	console.log('SAVE to interface: ', player);
	interfaceCollection.save({
		_id: player.input.name,
		player
	});

	res.send({ good: true });
}


module.exports = saveInterfacePlayerData;