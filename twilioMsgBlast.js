require('dotenv').config();

var http = require('http')


var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);


var options = {
	host: 'www.XXXX.XXX',
	port: 'XX',
	path: '/XXXX/',
	headers: {'Authorization':'Basic ' + process.env.BASIC_AUTH},
	}

// GET /customers to get all contact info
// Response in my case 
// [
//   { id: --,
//     firstName: --,
//     lastName: --,
//     email: --,
//     phone: --,
//     address: --,
//     city: --,
//     zip: --,
//     notes: --}
//     ,
//   { id: --,
//     firstName: --,
//     lastName: --,
//     email: --,
//     phone: --,
//     address: --,
//     city: --,
//     zip: --,
//     notes: --},
// 	..
// 	..
// ]

var req = http.request(options,function(resp){
	var str = ''
	var customers = {}
	resp.on('data',function (chucnk) {
		str += chucnk
	})

	resp.on('end', ()=> {
		customers = JSON.parse(str)
		sendMsg(customers)
	})

})

// return numbers with format +1XXXXXXXXXX
// otherwise return 
function phoneCheck(num)
{
	regex = /[\(\)\- ]/gi;
	num = num.replace(regex, '')
	mod_num = ''
	if (num.length == 11)
	{
		mod_num = '+' + num
	} else if (num.length == 10) {
		mod_num = '+1' + num
	}

	return mod_num
}

function sendMsg(customers){

	customers.forEach((customer) => {
		msg = `Hey ${customer.firstName} <rest of your msg>`

		num = phoneCheck(customer.phone)
		client.messages
		  .create({
		     body: msg,
		     from: '+15104789251',
		     to: num
		   })
		  .then(message => console.log(message.sid))
	})
}

req.end()