var request = require('request');
request = request.defaults({ jar: true });

var htmlToJson = require("html-to-json");
const $ = require('cheerio');
var fs = require('fs');

const currentTransfersPlayers = require('./currentTransfers.json');


function currentTransfers(DB, req, res) {

	res.send(currentTransfersPlayers);

	// request.post({
	// 	url: 'http://sokker.org/start',
	// 	form: {
	// 		ilogin: 'benelone',
	// 		ipassword: 'password'
	// 	}
	// }, function (error, response, body) {
	//
	// 	if(response.statusCode === 302 && response.headers && response.headers.location) {
	// 		let promisePlayersDataArray = [];
	//
	// 		for(let page in Array.from({ length: 10 }, (v, k) => k)) {
	// 			promisePlayersDataArray.push(new Promise((resolve, reject)=> {
	//
	// 				request(`http://sokker.org/transferSearch/pg/${page+1}`, (error, response, body)=> {
	//
	// 					htmlToJson.parse(body, ['.panel-body .well',
	// 						function ($item) { return $item; },
	// 						function ($players) {
	// 							const DATA = [];
	// 							$players.forEach((item)=> {
	// 								const $player = $(item);
	//
	// 								const skills = $player.find('.table.table-condensed.table-skills td')
	// 									.text().trim().split('\n');
	//
	// 								const name = $player.find('a').text().trim();
	// 								const age = +$player.find('.h5').text().trim().split('wiek')[1];
	// 								const stamina = +skills[0].split('[')[1].split(']')[0];
	// 								const keeper = +skills[1].split('[')[1].split(']')[0];
	// 								const pace = +skills[2].split('[')[1].split(']')[0];
	// 								const defender = +skills[3].split('[')[1].split(']')[0];
	// 								const technique = +skills[4].split('[')[1].split(']')[0];
	// 								const playmaker = +skills[5].split('[')[1].split(']')[0];
	// 								const passing = +skills[6].split('[')[1].split(']')[0];
	// 								const striker = +skills[7].split('[')[1].split(']')[0];
	//
	// 								DATA.push({
	// 									name, age, stamina, keeper, pace, defender, technique, playmaker, passing, striker
	// 								});
	// 							});
	// 							return DATA;
	// 						}])
	// 						.done(function(player) {
	// 							resolve(player);
	// 						});
	// 				});
	// 			}));
	// 		}
	//
	// 		Promise.all(promisePlayersDataArray).then((players)=> {
	// 			//fs.writeFileSync(__dirname + `/currentTransfers.json`, JSON.stringify([].concat.apply([], players)), null, 4);
	// 			res.send(JSON.stringify([].concat.apply([], players)));
	// 		})
	//
	// 	} else {
	// 		res.send('<h1>Error</h1>');
	// 	}
	// });
}


export default currentTransfers;

// notifierMax=103404315;
// conf=909818678;
// __atssc=vk%3B1;
// PHPSESSID=bslq3i47psasj6st2kj3gdjgs6;
// XMLSESSID=r8vobqb3hiusvnoafe3a831hr6;
// hide_promotion=1;
// notifierMax=103404315;
// __utmt=1;
// lang=uk;
// lang_ID=32;
// _html_rtl=0;
// __utma=20776890.394479188.1478085449.1506600483.1506605750.423;
// __utmb=20776890.61.10.1506605750;
// __utmc=20776890;
// __utmz=20776890.1506605750.423.3.utmcsr=online.sokker.org|utmccn=(referral)|utmcmd=referral|utmcct=/;
// __utmv=20776890.|1=skin=default=1^2=background=stadium=1^3=menu-position=bottom=1;
// __atuvc=15%7C35%2C23%7C36%2C0%7C37%2C4%7C38%2C16%7C39;
// __atuvs=59ccfab53e2ac561009




// conf=909818678;
// __atssc=vk%3B1;
// PHPSESSID=bslq3i47psasj6st2kj3gdjgs6;
// XMLSESSID=r8vobqb3hiusvnoafe3a831hr6;
// hide_promotion=1;
// notifierMax=103404315;
// lang=uk;
// lang_ID=32;
// _html_rtl=0;
// __atuvc=15%7C35%2C23%7C36%2C0%7C37%2C4%7C38%2C15%7C39;
// __atuvs=59ccfab53e2ac561008;
// __utmt=1;
// __utma=20776890.394479188.1478085449.1506600483.1506605750.423;
// __utmb=20776890.60.10.1506605750;
// __utmc=20776890;
// __utmz=20776890.1506605750.423.3.utmcsr=online.sokker.org|utmccn=(referral)|utmcmd=referral|utmcct=/;
// __utmv=20776890.|1=skin=default=1^2=background=stadium=1^3=menu-position=bottom=1