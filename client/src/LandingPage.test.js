import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './LandingPage';

it('LandingPage component should render without crashing', () => {
    shallow(<LandingPage />);
});

