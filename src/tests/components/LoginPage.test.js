import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from  '../../components/LoginPage';

describe('Test LoginPage', () => {

    test('should render LoginPage', () => {
        const wrapper = shallow(<LoginPage />);

        expect(wrapper).toMatchSnapshot();

    });

    test('should call startRegister on button click', () => {
        const startRegister = jest.fn();
        const wrapper = shallow(<LoginPage startRegister={startRegister}/>);

        wrapper.setState({
            email: 'test@test.com',
            password: 'testPassword'
        });

        wrapper.find('button').at(0).simulate('click');

        expect(startRegister).toHaveBeenCalled();
    });

    test('should NOT call startRegister when empty fields', () => {
        const startRegister = jest.fn();
        const wrapper = shallow(<LoginPage startRegister={startRegister}/>);

        wrapper.setState({
            email: '',
            password: ''
        });

        wrapper.find('button').at(0).simulate('click');

        expect(wrapper.state('error')).toBe('Por favor ingresa tus credenciales');
    });

    test('should call startLogin on button click', () => {
        const startLogin = jest.fn();
        const wrapper = shallow(<LoginPage startLogin={startLogin}/>);

        wrapper.setState({
            email: 'test@test.com',
            password: 'testPassword'
        });

        wrapper.find('button').at(1).simulate('click');

        expect(startLogin).toHaveBeenCalled();
    });
});