import React from 'react'
import ReactDOM from 'react-dom'
import UrlValidator from './src/components/Demo'

function App(props) {
  return (
    <main>
      <UrlValidator />
    </main>
  )
}

ReactDOM.render(
	React.createElement(App),
	document.getElementById('root'))
