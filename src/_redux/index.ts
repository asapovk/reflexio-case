import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  combineReducers,
} from 'redux';
import { appSlice } from '../app/app.slice';
import { loadUsers } from '../_utils/loadUsers.dev';
import { usersSlice } from '../users/users.slice';
import { groupsSlice } from '../groups/groups.slice';
import { invitesSlice } from '../invites/invites.slice';
import { eventManagerSlice } from '../app/event-manager.slice';
import { authSlice } from '../auth/auth.slice';
import { useSystem } from '@reflexio/core-v1';

usersSlice.inject({
  loadUsers: loadUsers,
});

const rootReducer = combineReducers({
  ...appSlice.reducer,
  ...usersSlice.reducer,
  ...groupsSlice.reducer,
  ...invitesSlice.reducer,
  ...authSlice.reducer,
});

function configureStore() {
  const system = useSystem();
  const middlewares: Middleware[] = [
    eventManagerSlice.middleware,
    appSlice.middleware,
    usersSlice.middleware,
    groupsSlice.middleware,
    invitesSlice.middleware,
    authSlice.middleware,
  ];

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
  );

  store.subscribe(() => {
    system.afterEffects.handleAfterEffect(store.dispatch);
  });

  return store;
}
const store = configureStore();

export const dispatch = store.dispatch;
export default store;
