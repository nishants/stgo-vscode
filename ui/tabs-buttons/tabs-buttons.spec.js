import React from 'react';
import {shallow} from 'enzyme';

import TabButtons from './index';

describe('ui/tabs-buttons', () => {
  it('should render tab buttons', () => {
    const wrapped = shallow(<TabButtons/>);
    expect(wrapped).toMatchSnapshot();
  });
});