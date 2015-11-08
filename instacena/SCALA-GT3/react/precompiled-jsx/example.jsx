var MainApp = React.createClass({



  render: function() {
    
    return <div> 
       
      </div>
  }

})


setInterval(function() {
  ReactDOM.render(
    <MainApp  />,
    document.getElementById('container')
  );
}, 50);
