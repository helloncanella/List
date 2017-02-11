import Nightclubs from '/collections/nightclubs.js'


const Parties = new Meteor.Collection('parties')


if (Parties.find().count() === 0) {
	const nightclub = Nightclubs.findOne({}, { fields: { name: 1, _id: 1, logoUrl: 1, addresses: 1 } })

	const partiesList = [
		 
		{ 
			name: "Carnaval do Distrital",
			photosUrl: ["https://scontent.fsdu6-1.fna.fbcdn.net/v/t1.0-9/16195353_1296868433721822_4281286116478477370_n.png?oh=0dd16ca232bd84641cbd227bb339f6b8&oe=59452251"],
			date: "27 de abril",
			startDate: "",
			endDate: "",
			hour: "22h",
			nightclub,
			availableDiscounts:[
				{value:0.5, quantity:100},
				{value:1, quantity:10},
			],
			addresses: [
				{
					street: 'R. Opala',
					number: 'S/N',
					city: 'Belo Horizonte',
					state: 'MG',
					neighborhood: 'Cruzeiro',
					cep: ''
				}
			],
			descriptionTopics: [
				{
					title: 'A Festa',
					text: `Nos cinco dias de folia, o Mercado do Cruzeiro receberá oito bailes temáticos, sendo três voltados para o público infantil. A coordenação geral das festas é da Cria!Cultura, que está cuidando de todos detalhes para que o folião possa brincar com a máxima segurança e conforto.
	Acessando cada evento, você confere a programação completa!

	Se vc ainda não Programou o seu carnaval, não perde por esperar. O melhor do carnaval de BH ainda está por vir. Vem aí o Carnaval do Distrital, o mais seguro, original e divertido da cidade, com:

	* Chama O Síndico 
	* Havayanas Usadas 
	* Então Brilha 
	* Me Beija que Eu sou Pagodeiro 
	* Juventude Bronzeada 
	* Breno Gontijo 
	* Bartucada 
	* Bem te viu, Bem te vê 
	* Baile do Secreto
	* Bloco da Insanidade
	* Bailinho do Distrital
	* Secretinho
	* Fera Neném 
	* Trupe Gaia 
	* Abrapalavra 
	* Recicloteca 
	* Quintal da Guegué 
	* CIA Pé-de-Moleque
	* e os melhores DJs de BH...
	
	Programação em breve: www.sympla.com/carnavaldodistrital

	#bailedosecreto #blocodainsanidade #blocobemteviubemtevê #bailedodistrital #boxentretenimento #secreto #criacultura #loveentretenimento #distrital #mercadodocruzeiro #bailinhododistrital`
				}
			]
		},
		{
			name: "Baile do Secreto",
			photosUrl: ["https://scontent.fsdu6-1.fna.fbcdn.net/v/t31.0-8/16463251_1149336588512497_7022461050773245775_o.jpg?oh=8d8c3ff546ec33338eed409cd5135103&oe=593EDEE8"],
			date: "27 de abril",
			startDate: "",
			endDate: "",
			nightclub,
			availableDiscounts:[
				{value:0.5, quantity:100},
				{value:1, quantity:10},
			],
			hour: "22h",
			descriptionTopics: [
				{
					title: 'A Festa',
					text: `Nos cinco dias de folia, o Mercado do Cruzeiro receberá oito bailes temáticos, sendo três voltados para o público infantil. A coordenação geral das festas é da Cria!Cultura, que está cuidando de todos detalhes para que o folião possa brincar com a máxima segurança e conforto.
	Acessando cada evento, você confere a programação completa!

	Se vc ainda não Programou o seu carnaval, não perde por esperar. O melhor do carnaval de BH ainda está por vir. Vem aí o Carnaval do Distrital, o mais seguro, original e divertido da cidade, com:

	* Chama O Síndico 
	* Havayanas Usadas 
	* Então Brilha 
	* Me Beija que Eu sou Pagodeiro 
	* Juventude Bronzeada 
	* Breno Gontijo
	* Bartucada 
	* Bem te viu, Bem te vê 
	* Baile do Secreto
	* Bloco da Insanidade
	* Bailinho do Distrital
	* Secretinho 
	* Fera Neném 
	* Trupe Gaia 
	* Abrapalavra 
	* Recicloteca 
	* Quintal da Guegué 
	* CIA Pé-de-Moleque
	* e os melhores DJs de BH...

	Programação em breve: www.sympla.com/carnavaldodistrital

	#bailedosecreto #blocodainsanidade #blocobemteviubemtevê #bailedodistrital #boxentretenimento #secreto #criacultura #loveentretenimento #distrital #mercadodocruzeiro #bailinhododistrital`
				}
			] 
		}

	]

	partiesList.forEach(item => Parties.insert(item))
}

export default Parties






