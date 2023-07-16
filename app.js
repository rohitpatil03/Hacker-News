const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const fetchData = async (url) => {
    const resp = await fetch(url);
    const resData = await resp.json();
    console.log(resData.hits)
    return resData.hits
}


const app = Vue.createApp({
    data(){
        return({
            formInput:"Vue",
            data:[],
    });
    },
    methods:{
        async updateSearchBar(event){
            this.formInput = event.target.value;
            this.data = await fetchData(`${API_ENDPOINT}query=${this.formInput}&page=1`);
        },
        removeBtn(id){
            this.data = this.data.filter(item => item.objectID !== id)
        }
        
    },
    async mounted() {
        this.data = await fetchData(`${API_ENDPOINT}query=${this.formInput}&page=1`);
      }
})

app.mount('#hacker-news')