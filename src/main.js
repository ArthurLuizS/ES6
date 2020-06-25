import api from "./api";


class app {
    constructor(){
        this.repositorios = [];

        this.formEl = document.getElementById('repo-form');
        this.inpEl = document.getElementById('inp')
        this.ulEl = document.getElementById('repo-list')

        this.registeHands();
    }

    registeHands(){
        this.formEl.onsubmit = event => this.addRepo(event);
        
    }

    setloading(loading = true){
        if(loading == true){
            let loadEle = document.createElement('span')
            loadEle.appendChild(document.createTextNode('Carregando...'))
            loadEle.setAttribute('id', 'loading')
            this.formEl.appendChild(loadEle)
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepo(event){
        event.preventDefault()

        const inputel = this.inpEl.value
        

        if (inputel === undefined )
        return;
        
        this.setloading();

        try {
            const response = await api.get(`/repos/${inputel}`)
        const {name , description, html_url , owner: {avatar_url} } = response.data
        this.repositorios.push({
            name ,
            description ,
            avatar_url,
            html_url
        })
        this.inpEl.value = ''
        this.render()
        } catch (error) {
            alert("Dados inconsistentes")
            
        }

        this.setloading(false)
        
    }
    render(){

        this.ulEl.innerHTML = '' 

        this.repositorios.forEach( repo => {
            let imgEl = document.createElement('img')
            imgEl.setAttribute('src', repo.avatar_url)

            let nomEl = document.createElement('strong')
            nomEl.appendChild(document.createTextNode(repo.name))

            let pEl = document.createElement('p')
            pEl.appendChild(document.createTextNode(repo.description))

            let aEl = document.createElement('a') 
            aEl.setAttribute('target', "_blank")
            aEl.setAttribute('href', repo.html_url)
            aEl.appendChild(document.createTextNode('Acessar'))

            let liEl = document.createElement('li')
            liEl.appendChild(imgEl)
            liEl.appendChild(nomEl)
            liEl.appendChild(pEl)
            liEl.appendChild(aEl)

            this.ulEl.appendChild(liEl)

        })
    }
}
new app();