const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const fetchData = async (url) => {
    const resp = await fetch(url);
    const resData = await resp.json();
    return resData
}


const app = Vue.createApp({
    data(){
        return({
            formInput:"Vue",
            data:[],
            pageNumber:0,
            nbPages:1,
    });
    },
    methods:{
        async updateSearchBar(event){
            this.formInput = event.target.value;
            await this.updateData()
        },
        async updateData(){
            response = await fetchData(`${API_ENDPOINT}query=${this.formInput}&page=${this.pageNumber}`);
            this.nbPages = await response.nbPages
            this.data = await response.hits
        },
        removeBtn(id){
            this.data = this.data.filter(item => item.objectID !== id)
        },
        setPageNumber(command){
            if (command == 'prev' && this.pageNumber<1){
                this.pageNumber = this.nbPages-1
                this.updateData()
            }
            else if (command == 'prev' && this.pageNumber>=1){
                this.pageNumber = this.pageNumber - 1
                this.updateData()
            }
            else if(command == 'next' && this.pageNumber>=this.nbPages-1){
                this.pageNumber = 0
                this.updateData()
            }
            else if (command == 'next' && this.pageNumber<this.nbPages-1){
                this.pageNumber = this.pageNumber + 1
                this.updateData()
            }
            
            
        },
        
    },
    async mounted() {
        await this.updateData()
      }
})

app.mount('#hacker-news')