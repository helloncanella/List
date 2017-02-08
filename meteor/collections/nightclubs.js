import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'


let Nightclubs = new Meteor.Collection('nightclubs')

//creating a default nightclub
if (Nightclubs.find().count() === 0) {

    const promoter = Meteor.users.findOne({roles:'promoter'}) || {}

    const nightclub = {
        promotersId: [promoter._id || ''],
        doormenId: [],
        logoUrl: 'https://goo.gl/RhKWbz',
        photosUrl: [],
        name: 'Secreto',
        addresses:[
            {
                street: 'R. Gonçalves Dias',
                number: '926',
                city: 'Belo Horizonte',
                state: 'MG',
                neighborhood: 'Savassi',
                cep: '30140-091'
            }
        ]
    } 


    Nightclubs.insert(nightclub)


}

export default Nightclubs