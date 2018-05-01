// React
import React from 'react';
import ReactDOM from 'react-dom';
// react-redux
import { Provider } from 'react-redux';
// Routing
import AppRouter, {history} from './routes/AppRouter';
// Styles
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
// Redux
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
// Components
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const state = store.getState();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

const token = localStorage.getItem('token');

if(token){
    store.dispatch(login(token));
    renderApp();
    if(history.location.pathname === '/'){
        history.push('/dashboard');
    }
}else{
    store.dispatch(logout());
    renderApp();
    history.push('/');
}


