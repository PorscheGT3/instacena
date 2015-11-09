'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');

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

    var url = this.state.url.split('v=')[1]
    var fetch_url = '/get_link/'+ url + '/' + this.state.start_time + '/' + this.state.end_time +'/'+this.state.custom_part

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
      <div className="innerContainer">
        <TextField className='test'
          hintText="Hint Text"
          floatingLabelText="URL" onChange={this.parse_url}/>
        <div className="timesFields">
            <TextField className="timeField"
              hintText="Hint Text"
              floatingLabelText="Start Time" onChange={this.parse_start_time} />
            <TextField className="timeField"
              hintText="Hint Text"
              floatingLabelText="End Time" onChange={this.parse_end_time} />
        </div>
        <TextField className="test"
          hintText="Hint Text"
          floatingLabelText="Add something to output link" onChange={this.custom_part}/>

        <div className="but">
          <RaisedButton label="Create Link" onClick={this.submit_parameters} />
        </div>
        <a href={this.state.cena_url}> {this.state.cena_url} </a>
      </div>

      )
  }
});



ReactDOM.render(
    <Application  />,
    document.getElementById('container')
);

