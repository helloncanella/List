const partiesList = [
	{
		name: "Santo Pagode",
		photosUrl: ["http://www.vale1convite.com.br/site/img/eventos/flyer/1111145835.jpg"],
		address: "Rua Fernando Siqueira, 30 - Taquara",
		date: "27 de abril",
		hour: "22h"
	},
	{
		name: "Loft in Esperia",
		photosUrl: ["http://webcriativo.com.br/grafica/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/l/flyer-balada-_1.jpg"],
		address: "Santana",
		date: "16 de Maio",
		hour: "16h"
	},
	{
		name: "The One",
		photosUrl: ["http://www.baladacerta.com.br/images/eventos/57778.jpg"],
		address: "Rua Fernando Siqueira, 30 - Taquara",
		date: "30 de abril",
		hour: "23h"
	},
	{
		name: "Azurra",
		photosUrl: ["http://webcriativo.com.br/grafica/media/catalog/product/cache/1/imag"],
		address: "Rua Fernando Siqueira, 30 - Taquara",
		date: "30 de abril",
		hour: "23h"
	},
	{
		name: "Spirits",
		photosUrl: ["https://agenciadsign.files.wordpress.com/2011/04/flyer_sprits-20abr_pp.jpg"],
		address: "Rua Fernando Siqueira, 30 - Taquara",
		date: "30 de abril",
		hour: "23h"
	},
	{
		name: "Festa Open Bar",
		photosUrl: ["http://photos1.blogger.com/blogger/5741/1783/1600/flyer_balada_01nov.jpg"],
		address: "Rua Fernando Siqueira, 30 - Taquara",
		date: "30 de abril",
		hour: "23h"
	}

]

const Parties = new Meteor.Collection('parties')

if (Parties.find().count() === 0) {
	partiesList.forEach(item => Parties.insert(item))
}

export default Parties






