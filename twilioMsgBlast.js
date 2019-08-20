require('dotenv').config();

var http = require('http')


var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);


var options = {
	host: 'www.badaboom.io',
	port: '80',
	path: '/barbershop/index.php/api/v1/customers',
	// auth: 'YXNzaW1hZGRvdXM6YXNzaW1hZGRvdXM='
	headers: {'Authorization':'Basic ' + process.env.BASIC_AUTH},
	}

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

function sendMsg(obj){

	// console.dir(obj)
	obj.forEach((customer) => {
		msg = `Hey ${customer.firstName}. I am texting because you have scheduled with Kesete through our application. I’d like to ask you for a favor. Would you mind taking a few minutes to write a review for us please? Your comments will help us a lot. We build websites, apps and just about everything in between. Our goal is to be a formimdable minority-owned tech company. https://www.thumbtack.com/reviews/services/365286084003225603/write `
		msg_contact = 'If you have any question pls don\'t hesitate to contact us here: www.d3.marketing tel: +1 (601) 255-8172 ' 
		// console.log(msg)
		// console.log(msg_contact)
		num = phoneCheck(customer.phone)

		if (customer.firstName.toLocaleLowerCase() == 'hamdi' || customer.firstName.toLocaleLowerCase() == 'najm')
		{
			console.log('=========no contact list ' + customer.firstName)
			return
		}
		if (phoneCheck(customer.phone) == '+14155701122') {
			console.log('contact list ' + customer.firstName + ' ' + customer.phone)
		}



		// client.messages
		//   .create({
		//      body: msg,
		//      from: '+15104789251',
		//      to: num
		//    })
		//   .then(message => console.log(message.sid)).then(()=>{
		// 	client.messages
		//   		.create({
		//      		body: msg_contact,
		//      		from: '+15104789251',
		//      		to: num
		//    })
		//   })

	})



// 	obj.forEach((customer) => {
// 		msg = `
// Hey ${customer.firstName}. I am texting because you have scheduled with Kesete through our application. I’d like to ask you for a favor. Would you mind taking a few minutes to write a review for us please? Your comments will help us a lot. We build websites, apps and just about everything in between. Our goal is to be a formimdable minority-owned tech company. https://www.thumbtack.com/reviews/services/365286084003225603/write
// `
// 		console.log(msg)
// 	})
}

req.end()