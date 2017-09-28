
function keepersRoute(DB, req, res) {
	let foundPlayers = [];
	const playersCollection = DB.collection('players');

	playersCollection.find({ $where: "this.keeper > 0.04"}).toArray(function(err, dbPlayers) {
		DB.collection('keepers', function (err, collection) {

			dbPlayers.forEach((dbPlayer, index)=> {
				if(!dbPlayer.age) return;
				collection.findOne({ _id: dbPlayer.name }).then((dbFoundPlayer)=> {
					if(!dbFoundPlayer) {
						console.log('====== SAVE [KEEPER] TO MONGO: ', dbPlayer.name, ' =======');
						collection.save({
							_id: dbPlayer.name,
							...Object.assign(dbPlayer, dbPlayers[index])
						});
					}
				});

				if(dbPlayer.age) {
					const input = Object.assign(dbPlayer, dbPlayers[index]);
					const output = makePrediction(input);

					console.log("<--x- <--x- <--x- 4 dbPlayer", dbPlayer);
					console.log("<--x- <--x- <--x- 5 dbPlayers[index]", dbPlayers[index]);

					console.log("<--x- <--x- <--x- 6 assign", input);
					console.log("<--x- <--x- <--x- 7 output", output);

					foundPlayers.push({
						input,
						output
					});
				}
				console.log("<--x- <--x- <--x- 8 push", foundPlayers);
			});
		});

		res.send(foundPlayers);
	});
}


function makePrediction({
	keeper,
	pace,
	passing,

	// not important
	stamina,
	defender,
	technique,
	playmaker,
	striker }) {
	let evaluation = 0;

	// keeper
	evaluation += inRange(keeper, 0.4) ? 0.3 : 0; // Good
	evaluation += inRange(keeper, 0.2, 0.3) ? 0.2 : 0; // Middle
	evaluation += inRange(keeper, 0.01, 0.19) ? 0.1 : 0; // Bad

	console.log("<--x- <--x- <--x- 1", evaluation);

	// pace
	evaluation += inRange(pace, 0.4) ? 0.3 : 0; // Good
	evaluation += inRange(pace, 0.2, 0.3) ? 0.2 : 0; // Middle
	evaluation += inRange(pace, 0.01, 0.19) ? 0.1 : 0; // Bad
	console.log("<--x- <--x- <--x- 2", evaluation);

	// passing
	evaluation += inRange(passing, 0.4) ? 0.3 : 0; // Good

	evaluation += inRange(passing, 0.2, 0.3) ? 0.2 : 0; // Middle

	evaluation += inRange(passing, 0.01, 0.19) ? 0.1 : 0; // Bad
	console.log("<--x- <--x- <--x- 3", evaluation,  { isGoodPlayer: evaluation });

	return { isGoodPlayer: evaluation }
}

function inRange(number=0, min, max=1) {
	return (number >= min) && (number <= max);
}


export default keepersRoute;