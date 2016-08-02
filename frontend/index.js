'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


var Application = React.createClass({

  getInitialState: function() {
    return {url: 'none',
            start_time:'0',
            end_time:'0',
            cena_url:null,
            opened_dialog:false
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
            this.setState({cena_url: json_results.cena_url,
              opened_dialog:true
                })
          }.bind(this));
  },
  render: function() {

    return (
      <div className="innerContainer">
        <MuiThemeProvider muiTheme={getMuiTheme()}>

          <TextField className='test' style={{width:'45%'}}
            hintText="Hint Text"
            floatingLabelText="URL" onChange={this.parse_url}/>
        </MuiThemeProvider>
          <div className="timesFields">
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <TextField className="timeField" style={{width:'20%'}}
                  hintText="Hint Text"
                  floatingLabelText="Start Time" onChange={this.parse_start_time} />
                </MuiThemeProvider>
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <TextField className="timeField" style={{width:'20%'}}
                  hintText="Hint Text"
                  floatingLabelText="End Time" onChange={this.parse_end_time} />
              </MuiThemeProvider>
          </div>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <TextField className="test"
              hintText="Hint Text"
              floatingLabelText="Add something to output link" onChange={this.custom_part}/>
            </MuiThemeProvider>
          <div className="but">
            <MuiThemeProvider muiTheme={getMuiTheme()}>
              <RaisedButton label="Create Link" onClick={this.submit_parameters} />
            </MuiThemeProvider>
          </div>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Dialog
              ref='dialog'
              actionFocus="submit"
              open={this.state.opened_dialog}>
              {this.state.cena_url}
            </Dialog>
          </MuiThemeProvider>

      </div>

      )
  }
});



ReactDOM.render(
    <Application  />,
    document.getElementById('container')
);

