let app = new Vue ({
  el: '#app',
  data: {
    /* parametri di ricerca */
    apiKey: '79909f1f1a2a6bb4d978f22e9437b891',
    setQuery: '',
    lang: 'it',
    /* / */
    movies: '',
    imgSize: 'w342'
  },
  methods: {
    search: function() {
      axios
        .get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: this.apiKey,
            query: this.setQuery,
            language: this.lang
          }
        })
        .then((result) => {
          this.movies = result.data.results;
        })
        .catch((error) => console.log(error));
    }
  }
});