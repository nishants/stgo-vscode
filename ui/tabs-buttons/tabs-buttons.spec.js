import React from "react";
import enzyme from "enzyme";
import App from "./index";

describe('lib', () => {
    test('if utils mocked automatically', () => {
      var wrapper = enzyme.shallow(<App />);

      expect(wrapper).toMatchSnapshot();
    });
});