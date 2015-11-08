'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Application = React.createClass({

  getInitialState: function() {
    return {url: 'none',
            start_time:'0',
            end_time:'0',
            cena_url:null
            };
  },

  parse_url: function(event){
    this.setState({url: event.target.value})
  },

  parse_start_time: function(event){
    this.setState({start_time: event.target.value})
  },
  parse_end_time: function(event){
    this.setState({end_time: event.target.value})
  },
  custom_part: function(event){
    this.setState({custom_part: event.target.value})
  },
  submit_parameters: function(){

    var fetch_url = '/get_link/'+this.state.url + '/' + this.state.start_time + '/' + this.state.end_time +'/'+this.state.custom_part

    fetch(fetch_url)
          .then(function(response) {
            return response.text()
          }).then(function(body) {
            var json_results = JSON.parse(body)
            this.setState({cena_url: json_results.cena_url
                })
            console.log( json_results.cena_url)
          }.bind(this));
  },
  render: function() {

    return (
      <div>
        URL: 
        <input onChange={this.parse_url} type="text"/>
        <br/>
        Start time: 
        <input onChange={this.parse_start_time} type="text"/>
        <br/>
        End Time 
        <input onChange={this.parse_end_time} type="text"/>
        <br/>
        <br/>
        Add something to output link
        <input onChange={this.custom_part} type="text"/>
        <br/>
        <input onClick={this.submit_parameters} type="submit" />

        <a href={this.state.cena_url}> {this.state.cena_url} </a>
      </div>

      )
  }
});



ReactDOM.render(
    <Application  />,
    document.getElementById('container')
);

