import { shallow } from "enzyme";
import { Login } from "./App";
import React from "react";

describe("<Login /> with no props", () => {
  const container = shallow(<Login />);
  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should have an email field", () => {
    expect(container.find('input[type="email"]').length).toEqual(1);
  });

  it("should have proper props for email field", () => {
    expect(container.find('input[type="email"]').props()).toEqual({
      onChange: expect.any(Function),
      placeholder: "email",
      type: "email"
    });
  });

  it("should have a password field", () => {
    expect(container.find('input[type="password"]').length).toEqual(1);
  });

  it("should have proper props for password field", () => {
    expect(container.find('input[type="password"]').props()).toEqual({
      onChange: expect.any(Function),
      placeholder: "password",
      type: "password"
    });
  });
  it("should have a submit button", () => {
    expect(container.find("button").length).toEqual(1);
  });
  it("should have proper props for submit button", () => {
    expect(container.find("button").props()).toEqual({
      onClick: expect.any(Function)
    });
  });
});

// describe("Test case for testing login", () => {
//   let wrapper;
//   test("username check", () => {
//     wrapper = shallow(<Login />);
//     wrapper.find('input[type="email"]').simulate("change", {
//       target: { name: "username", value: "aman@mail.com" }
//     });
//     expect(wrapper.state("username")).toEqual("aman@mail.com");
//   });
//   it("password check", () => {
//     wrapper = shallow(<Login />);
//     wrapper.find('input[type="password"]').simulate("change", {
//       target: { name: "password", value: "password123" }
//     });
//     expect(wrapper.state("password")).toEqual("password123");
//   });
//   it("login check with right data", () => {
//     wrapper = shallow(<Login />);
//     wrapper.find('input[type="email"]').simulate("change", {
//       target: { name: "username", value: "aman@mail.com" }
//     });
//     wrapper.find('input[type="password"]').simulate("change", {
//       target: { name: "password", value: "password123" }
//     });
//     wrapper.find("button").simulate("click");
//     expect(wrapper.state("isLogined")).toBe(true);
//   });
//   it("login check with wrong data", () => {
//     wrapper = shallow(<Login />);
//     wrapper.find('input[type="email"]').simulate("change", {
//       target: { name: "username", value: "aman@mail.com" }
//     });
//     wrapper.find('input[type="password"]').simulate("change", {
//       target: { name: "password", value: "krishankant1234" }
//     });
//     wrapper.find("button").simulate("click");
//     expect(wrapper.state("isLogined")).toBe(false);
//   });
// });
