 connect() {       
        const {subscribeToUserData} = this

        Meteor.connect('ws://192.168.1.4:3000/websocket');

        return new Promise((resolve, reject) => {
            const
                onLoginResumed = () => { subscribeToUserData() ; resolve()},
                onError = error => reject(error),
                onConnected = () => { this.resumeLogin().then(onLoginResumed).catch(onError) }

            Meteor.ddp.on('connected', onConnected)
            setTimeout(() => { reject('Problemas de Conexão!') }, 300 * 60)
        })

    }

    subscribeToUserData(){
        database.subscribe("loggedUser")
    }