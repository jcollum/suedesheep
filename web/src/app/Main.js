import React, { Component, Text } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { isValidUrl, getLinks } from './urlTools';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 100
  },
  lowerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 20
  }
};
const cols = [{ key: 'text', label: 'Text' }, { key: 'href', label: 'Link' }];

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: null,
      url: 'https://news.google.com/',
      messageClass: 'message',
      links: null
    };
  }

  handleTouchTap = () => {
    if (isValidUrl(this.state.url)) {
      this.setState({ message: 'Valid url, parsing now...' });
    } else {
      this.setState({
        message: 'Not a valid url! Please correct.',
        messageClass: 'error'
      });
      //this.scheduleRevertMessage();
      return;
    }

    getLinks(this.state.url)
      .then(links => {
        this.setState({ links });
        this.setState({ message: '' });
      })
      .catch(err => {
        this.setState({
          message: `Failed to get links, error: ${err}. Please try a different url.`,
          messageClass: 'error'
        });
      });
  };

  //function(event: object, newValue: string)
  updateUrl(event, newVal) {
    this.setState({ url: newVal });
  }

  generateHeaders() {
    // generate our header (th) cell components
    return cols.map(colData => {
      return <th  className="text-left"  key={colData.key}> {colData.label} </th>;
    });
  }

  generateRows(links) {
    if (!links) {
      return <tr />;
    } else {
      let i = 0;
      let result = [];
      for (var i = 0; i < links.length; i++) {
        let link = links[i];
        result.push({ index: i, href: link.href, text: link.text });
      }
      return links.map(link => {
        return (
          <tr key={link.index}><td>{link.text}</td><td>{link.href}</td></tr>
        );
      });
    }
  }

  getLinksTable() {
    if (this.state.links) {
      let headerComponents = this.generateHeaders();
      let rowComponents = this.generateRows(this.state.links);

      console.dir({ headerComponents, rowComponents });
      return (
        <table class='table-fill'>
          <thead>
            <tr>
              {headerComponents}
            </tr>
          </thead>
          <tbody>
            {rowComponents}
          </tbody>
        </table>
      );
    }
  }

  render() {
    const table = this.getLinksTable();
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>

          <h1>URL Validator</h1>
          <br />
          <h3>
            Type a url below, then press the button to validate and parse it
          </h3>
          <TextField
            hintText="Url"
            onChange={(event, newVal)=>{this.updateUrl(event, newVal)}}
            value={this.state.url}
            style={{width: '80%'}}
          />
          <br />
          <RaisedButton
            label="Validate and Parse"
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
          <br />
          <div className={this.state.messageClass}>{this.state.message}</div>

          <div style={styles.lowerContainer}>
            {table}
          </div>
        </div>

      </MuiThemeProvider>
    );
  }
}

//
export default Main;
