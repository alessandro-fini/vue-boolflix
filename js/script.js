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
    moSho: '',
    /* array generi */
    movieGen: [],
    tvGen: [],
    allGen: []
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
          this.moSho = [...this.movies, ...this.tvShows];
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
          this.score();
          /* nomi attori film */
          this.getCast(this.movies, 'movie');
          /* nomi attori tv-show */
          this.getCast(this.tvShows, 'tv');
          this.getGenre('movie', this.movieGen);
          this.getGenre('tv', this.tvGen);
          console.log(this.movieGen);
          console.log(this.tvGen);
          this.fixGen();
          console.log(this.allGen);
        })
        .catch((error) => console.log(error));
    },
    /* arrotondamento voti */
    score: function() {
      this.moSho.forEach((element) => {
        element.vote_average = Math.ceil(element.vote_average / 2);
      });
    },
    /* nomi cast */
    getCast: function(where, param) {
      where.forEach((element) => {
        axios
          .get('https://api.themoviedb.org/3/' + param + '/' + element.id + '/credits', {
            params: {
              api_key: this.apiKey
            }
          })
          .then((result) => {
            let total = [];
            for (let i = 0; i < 5; i++) {
              let castResult = result.data.cast[i].name;
              total.push(castResult);
              element.cast = total; 
              this.$forceUpdate(element.cast); 
            }        
          });
      });
    },
    getGenre: function(param, array) {
      axios
        .get('https://api.themoviedb.org/3/genre/' + param + '/list', {
          params: {
            api_key: this.apiKey
          }
        })
        .then((result) => {
          result.data.genres.forEach((element) => {
            array.push(element);
          });
        });
    },
    fixGen: function() {
      this.movieGen.forEach((element) => {
        for (let i = 0; i < this.tvGen.length; i++) {
          if (this.tvGen[i].name != element.name) {
            this.allGen.push(this.tvGen[i]);
          }
        }
      });
    }
  }
});