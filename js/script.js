let app = new Vue ({
  el: '#app',
  data: {
    /* parametri di ricerca */
    apiKey: '79909f1f1a2a6bb4d978f22e9437b891',
    setQuery: '',
    lang: 'it',
    /* / */
    imgSize: 'w342',
    movies: '',
    tvShows: '',
    /* merged array di movies e tvShows */
    moSho: ''
  },
  methods: {
    search: function() {
      /* film */
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
      /* serie tv */
      axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: this.apiKey,
            query: this.setQuery,
            language: this.lang
          }
        })
        .then((result) => {
          this.tvShows = result.data.results;
          this.moSho = [...this.movies, ...this.tvShows];
          console.log(this.tvShows);
          console.log(this.moSho);
        })
        .catch((error) => console.log(error));
    }
  }
});