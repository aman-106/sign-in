import { Login } from "./App";
import { useLoginState, emptyStr, authUserState } from './useLoginState';
import Submit from './Submit';
import React from "react";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { renderHook, act } from '@testing-library/react-hooks'

configure({ adapter: new Adapter() });

describe("<Login /> with no props", () => {
  const container = mount(<Login />);
  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should have an email field", () => {
    expect(container.find('input[type="email"]').length).toEqual(1);
  });

  it("should have proper props for email field", () => {
    expect(container.find('input[type="email"]').props()).toEqual({
      onChange: expect.any(Function),
      // "error": true,
      "placeholder": "Email",
      "type": "email",
      "value": "",
    });
  });

  it("should have a password field", () => {
    expect(container.find('input[type="password"]').length).toEqual(1);
  });

  it("should have proper props for password field", () => {
    expect(container.find('input[type="password"]').props()).toEqual({
      onChange: expect.any(Function),
      // "error": true,
      "placeholder": "Password",
      "type": "password",
      "value": "",
    });
  });
  it("should have a submit button", () => {
    expect(container.find("button").length).toEqual(1);
  });

  it("should have proper props for submit button", () => {
    expect(container.find("button").props()).toEqual({
      onClick: expect.any(Function),
      "children": "Sign In",
      "className": "disabled",
    });
  });

  it("should update username field", () => {
    const username = 'aman@mail.com'
    container.find('input[type="email"]').simulate("change", {
      target: { name: "username", value: username }
    });
    expect(container.find('input[type="email"]').prop('value')).toEqual(username)
  });

  it("should update password field", () => {
    const password = 'dkdkkdkk'
    container.find('input[type="password"]').simulate("change", {
      target: { name: "username", value: password }
    });
    expect(container.find('input[type="password"]').prop('value')).toEqual(password);
  });
});



describe('Test for submit button', function () {
  it('should not call handle login api in disabled state', function () {
    const mockFn = jest.fn();
    const props = {
      btnClsx: "disabled",
      handleLogin: mockFn,
    }
    const container = shallow(<Submit {...props} />);
    container.find("button").simulate('click');
    expect(mockFn.mock.calls.length).toEqual(0);
  })

  it('should  call handle login api in enabled state', function () {
    const mockFn = jest.fn();
    const props = {
      btnClsx: "",
      handleLogin: mockFn,
    }
    const container = shallow(<Submit {...props} />);
    container.find("button").simulate('click');
    expect(mockFn.mock.calls.length).toEqual(1);
  })

})

const userI = 0,
  passwordI = 1,
  handleUserI = 2,
  handlePasswordI = 3,
  validInputsI = 4,
  authStateI = 5,
  handleLoginI = 6;

const getMockEvent = function (mockvalue) {
  return {
    target: { value: mockvalue }
  }
}



describe('Test case for login hook', function () {
  test('should use login hook', () => {
    const { result } = renderHook(() => useLoginState());
    const [
      user,
      password,
      handleUser,
      handlePassword,
      validInputs,
      authState,
      handleLogin
    ] = result.current

    // emptyStr, authUserState
    expect(user).toBe(emptyStr)
    expect(password).toBe(emptyStr)
    expect(authState).toBe(authUserState.none);
    expect(validInputs.user).toBe(false);
    expect(validInputs.password).toBe(false);
    expect(typeof handleUser).toBe('function')
    expect(typeof handlePassword).toBe('function')
    expect(typeof handleLogin).toBe('function')
  })




  test('should set user and password', () => {
    const { result } = renderHook(() => useLoginState());
    const [
      user,
      password,
      handleUser,
      handlePassword,
    ] = result.current;
    const mockvalue = 'mockvalue';
    const mockEvent = getMockEvent(mockvalue)
    expect(user).toBe(emptyStr)
    expect(password).toBe(emptyStr)
    act(() => {
      handleUser(mockEvent);
      handlePassword(mockEvent);
    });
    // user 
    expect(result.current[userI]).toBe(mockvalue)
    // password
    expect(result.current[passwordI]).toBe(mockvalue)

  })


  describe('Test valid and invalid users name', () => {

    test("should accept email format", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'e@d.co';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[userI]).toBe(emptyStr)
      act(() => {
        result.current[handleUserI](mockEvent);
      });
      expect(result.current[userI]).toBe(mockvalue)
      expect(result.current[validInputsI].user).toBe(true)
    })


    test("should accept min 6 chars with format email address", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'e@d.co';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[userI]).toBe(emptyStr)
      act(() => {
        result.current[handleUserI](mockEvent);
      });
      expect(result.current[userI]).toBe(mockvalue)
      expect(result.current[validInputsI].user).toBe(true)
    })



    test("should reject less than 6 chars", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'e';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[userI]).toBe(emptyStr)
      act(() => {
        result.current[handleUserI](mockEvent);
      });
      expect(result.current[userI]).toBe(mockvalue)
      expect(result.current[validInputsI].user).toBe(false)
    })


    test("should reject invalid email format", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'e@djdkdkkd';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[userI]).toBe(emptyStr)
      act(() => {
        result.current[handleUserI](mockEvent);
      });
      expect(result.current[userI]).toBe(mockvalue)
      expect(result.current[validInputsI].user).toBe(false)
    })


    test("should reject empty string", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = '';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[userI]).toBe(emptyStr)
      act(() => {
        result.current[handleUserI](mockEvent);
      });
      expect(result.current[userI]).toBe(mockvalue)
      expect(result.current[validInputsI].user).toBe(false)
    })

  })



  describe('Test valid and invalid password', () => {
    test("should reject empty string", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = '';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[passwordI]).toBe(emptyStr)
      act(() => {
        result.current[handlePasswordI](mockEvent);
      });
      expect(result.current[passwordI]).toBe(mockvalue)
      expect(result.current[validInputsI].password).toBe(false)
    })

    test("should reject less than 6 chars string", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'dhA';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[passwordI]).toBe(emptyStr)
      act(() => {
        result.current[handlePasswordI](mockEvent);
      });
      expect(result.current[passwordI]).toBe(mockvalue)
      expect(result.current[validInputsI].password).toBe(false)
    })



    test("should reject without  One Capital Char in string", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'dhdjdkdkdkkd';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[passwordI]).toBe(emptyStr)
      act(() => {
        result.current[handlePasswordI](mockEvent);
      });
      expect(result.current[passwordI]).toBe(mockvalue)
      expect(result.current[validInputsI].password).toBe(false)
    })


    test("should accept One Capital Char  and other chars  with  length equal to 6", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'abcdeA';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[passwordI]).toBe(emptyStr)
      act(() => {
        result.current[handlePasswordI](mockEvent);
      });
      expect(result.current[passwordI]).toBe(mockvalue)
      expect(result.current[validInputsI].password).toBe(true)
    })



    test("should accept one Capital Chars  and other chars  with  length more than 6", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'abcdeAdjdjaaa';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[passwordI]).toBe(emptyStr)
      act(() => {
        result.current[handlePasswordI](mockEvent);
      });
      expect(result.current[passwordI]).toBe(mockvalue)
      expect(result.current[validInputsI].password).toBe(true)
    })


    test("should reject more Capital Chars in pasword", function () {
      const { result } = renderHook(() => useLoginState());
      const mockvalue = 'abcdeAGGGGJJJ';
      const mockEvent = getMockEvent(mockvalue)
      expect(result.current[passwordI]).toBe(emptyStr)
      act(() => {
        result.current[handlePasswordI](mockEvent);
      });
      expect(result.current[passwordI]).toBe(mockvalue)
      expect(result.current[validInputsI].password).toBe(false)
    })
  })


  test('should check authenctiation success on handleLogin call', async function () {
    const { result, waitForNextUpdate } = renderHook(() => useLoginState());
    expect(result.current[authStateI]).toBe(authUserState.none)
    act(() => {
      result.current[handleLoginI]();
    });
    expect(result.current[authStateI]).toBe(authUserState.loading);
    await waitForNextUpdate()
    expect(result.current[authStateI]).toBe(authUserState.sucess);
  })

})

