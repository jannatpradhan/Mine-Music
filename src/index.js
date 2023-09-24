import React from 'react';
import ReactDom from 'react-dom';

import App from './App';
import ContextData from './Context/MyState';

ReactDom.render(<ContextData><App/></ContextData>,document.getElementById('root'));