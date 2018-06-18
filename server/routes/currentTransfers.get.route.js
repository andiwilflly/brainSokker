var request = require('request');
request = request.defaults({ jar: true });

var htmlToJson = require("html-to-json");
const $ = require('cheerio');
var fs = require('fs');

const currentTransfersPlayers = require('./currentTransfers.json');


function currentTransfers(DB, req, res) {

	// res.send(currentTransfersPlayers);

	request.post({
		url: 'http://sokker.org/start',
		form: {
			ilogin: 'benelone',
			ipassword: 'password'
		}
	}, function (error, response, body) {

		if(response.statusCode === 302 && response.headers && response.headers.location) {
			let promisePlayersDataArray = [];

			for(let page in Array.from({ length: 4 }, (v, k) => k)) {
				promisePlayersDataArray.push(new Promise((resolve, reject)=> {

					request(`http://sokker.org/transferSearch/pg/${page+1}`, (error, response, body)=> {

						htmlToJson.parse(body, ['.panel-body .well',
							function ($item) { return $item; },
							function ($players) {
								const DATA = [];
								$players.forEach((item)=> {
									const $player = $(item);

									const id = $player.find("div").first().text().trim();

									const skills = $player.find('.table.table-condensed.table-skills td')
										.text().trim().split('\n');

									const name = $player.find('a').text().trim();
									const age = +$player.find('.h5').text().trim().split('wiek')[1] / 100;
									const stamina = +skills[0].split('[')[1].split(']')[0] / 100;
									const keeper = +skills[1].split('[')[1].split(']')[0] / 100;
									const pace = +skills[2].split('[')[1].split(']')[0] / 100;
									const defender = +skills[3].split('[')[1].split(']')[0] / 100;
									const technique = +skills[4].split('[')[1].split(']')[0] / 100;
									const playmaker = +skills[5].split('[')[1].split(']')[0] / 100;
									const passing = +skills[6].split('[')[1].split(']')[0] / 100;
									const striker = +skills[7].split('[')[1].split(']')[0] / 100;

									DATA.push({
										id, name, age, stamina, keeper, pace, defender, technique, playmaker, passing, striker
									});
								});
								return DATA;
							}])
							.done(function(player) {
								resolve(player);
							});
					});
				}));
			}

			Promise.all(promisePlayersDataArray).then((players)=> {
				fs.writeFileSync(__dirname + `/currentTransfers.json`, JSON.stringify([].concat.apply([], players)), null, 4);
				res.send(JSON.stringify([].concat.apply([], players)));
			})

		} else {
			res.send('<h1>Error</h1>');
		}
	});
}


module.exports = currentTransfers;