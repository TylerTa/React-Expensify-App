import authReducer from '../../reducers/auth';

test('should set state.uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'abc123'
  };
  const state = authReducer(undefined, action);
  expect(state.uid).toBe(action.uid);
});

test('should clear our state.uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({});
});