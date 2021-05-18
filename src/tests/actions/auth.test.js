import { login, logout } from '../../actions/auth';

test('should generate/return login() Action Object with UID', () => {
  const uid = 'abc123';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should generate/return logout() Action Object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});