import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ModeState} from "./context/mode/ModeState";
import SlidesState from "./context/slides/SlidesState";
import rect from './common/images/rect.png'

ReactDOM.render(
    <ModeState>
        <SlidesState>
            <App/>
        </SlidesState>
    </ModeState>,
  document.getElementById('root')
);
