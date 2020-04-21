const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

function setAPI(){

	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest()

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.nhs.uk/conditions/coronavirus-covid-19?url=https://www.nhs.uk/conditions/coronavirus-covid-19/&modules=true', true)

	request.onload = function() {
	  // Begin accessing JSON data here
		var data = JSON.parse(this.response)
		console.log(data)

		if (request.status >= 200 && request.status < 400) {
		  data.modules.forEach(json => { 
		  	// Create a div with a card class
	  		const card = document.createElement('div')
	  		card.setAttribute('class', 'card')

	  		// Create an h1 and set the text content to the film's title
	  		const h1 = document.createElement('h1')
	  		json.name = json.name.replace(/_/g, " ")
		  	h1.textContent = json.name

		  	const p = document.createElement('p')

		  	if (json.description == "") {

		  		//Create a p and set the text content to the film's description
	  			json.text = json.text.substring(0, 600) // Limit to 600 chars
	  			json.text = json.text.replace(/<\/?[^>]+(>|$)/g, " ")
	  			p.textContent = `${json.text}...` // End with an ellipses
		  	}
		  	else{
		  		// Create a p and set the text content to the film's description
	  			json.description = json.description.substring(0, 400) // Limit to 600 chars
	  			json.description = json.description.replace(/<\/?[^>]+(>|$)/g, "")
	  			p.textContent = `${json.description}...` // End with an ellipses

		  	}		

	  		// Append the cards to the container element
			container.appendChild(card)

			// Each card will contain an h1 and a p
			card.appendChild(h1)
			card.appendChild(p)

		  })
		} else {
		  console.log('error')
		}
	}
		// Send request
		request.send()
}

		//Update every 5 seconds
		setAPI();
		// setInterval(setAPI , 5000);


