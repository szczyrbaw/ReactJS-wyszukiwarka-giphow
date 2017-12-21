var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'Ytt8RxXhIhGGJwl1gG0F4umEszdvCoyo';
App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },
  
  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText).then((gif) => {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
    });
  },
  
  getGif: function(searchText) {
    return new Promise (
      function(resolve, reject) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
          if (xhr.status === 200) {
            let = JSON.parse(xhr.responseText).data;
            let gif = {
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
            };
            resolve(gif);
          }

        };
        xhr.send();

      })
  },
  
  getGif: function(searchingText, callback) {
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText).data;
        var gif = {
          url: data.fixed_width_downsampled_url,
          sourceUrl: data.url
        };
        callback(gif);
      }
    };
    xhr.send();
  },
  
  render: function() {
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };
    return (
      <div style={styles}>
        <h1>Wyszukiwarka gifów!</h1>
        <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
        <Search onSearch={this.handleSearch}/>
        <Gif 
            loading={this.state.loading} 
			url={this.state.gif.url} 
			sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});