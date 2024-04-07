import { Opts, Stage } from '@reflexio/bite-staging-v1/lib/types';
import { _IState, _ITriggers } from '../../_redux/types';
export type OPTS = Opts<_ITriggers, _IState>;
export const authStages: { [key: string]: (p?: any) => Stage<OPTS> } = {
  AUTH: (params?: Array<number>) => ({
    name: 'AUTH',
    validator: (opt) => opt.getCurrentState().auth.isAuth,
    onFail: (opt) => {
      opt.trigger('router', 'goTo', '/sign_in');
    },
    assemble: (opt) => {
      console.log('AUTH ASSEMBLE');
    },
    notValidHandler: async (opt) => {
      opt.trigger('appController', 'setPage', {
        loading: true,
      });
      //block httpError
      opt.trigger('authController', 'init', null);
      const res = await opt.hook('authController', 'auth', 'done', null);
      opt.trigger('appController', 'setPage', {
        loading: false,
      });

      return res;
      //release block httpError;
    },
  }),
  SIGN_IN_PAGE: (params?: Array<number>) => ({
    name: 'SIGN_IN_PAGE',
    validator: (opt) => !opt.getCurrentState().auth.isAuth,
    onFail: (opt) => {
      opt.trigger('router', 'goTo', '/groups');
    },
    assemble: (opt) => {
      opt.trigger('authController', 'openSingIn', null);
      opt.trigger('appController', 'setPage', {
        signIn: true,
      });
      console.log(opt.getCurrentState());
    },
    disassemble: (opt) => {
      opt.trigger('appController', 'setPage', {
        signIn: false,
      });
      opt.trigger('authController', 'closeSignIn', null);
    },
  }),
};
