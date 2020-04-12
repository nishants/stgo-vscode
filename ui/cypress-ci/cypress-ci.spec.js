import React from 'react';
import {mount} from 'enzyme';

import CypressBuildTab from './index';

const comletedBuild = {status: 2, _links: {web: {href: 'http://path-to-build-1'}}, sourceVersion: "123"};
const CancellingBuild = {status: 3, _links: {web: {href: 'http://path-to-build-1'}}, sourceVersion: "456"};
const buildInProgress = {status: 1, _links: {web: {href: 'http://path-to-build-2'}}, sourceVersion: "456"};

describe('ui/cypress-ci/cypress-ci', () => {
  it('should disable button if a build is in progress', () => {
    const getCypressBuilds = jest.fn();
    const triggerBuild = jest.fn();

    const wrapped = mount(<CypressBuildTab
      getCypressBuilds={getCypressBuilds}
      currentBranchName='zyx-branch'
      callBack={triggerBuild}
      data={[
        comletedBuild,
        buildInProgress
      ]}
    />);

    expect(wrapped).toMatchSnapshot();
  });

  it('should enable button if there are no builds in progress', () => {
    const getCypressBuilds = jest.fn();
    const triggerBuild = jest.fn();

    const wrapped = mount(<CypressBuildTab
      getCypressBuilds={getCypressBuilds}
      currentBranchName='zyx-branch'
      callBack={triggerBuild}
      data={[
        CancellingBuild,
        comletedBuild
      ]}
    />);

    expect(wrapped).toMatchSnapshot();
  });

});