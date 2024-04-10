import { Script } from '@reflexio/core-v1/lib/interfaces/IScript';
import { _IState, _ITriggers } from '../../_redux/types';
import { ScriptOptsType, WatchArgsType } from '@reflexio/core-v1/lib/types';
import { INotificationConfig } from '../../_interfaces/app/NotificationConfig.interface';

export class NotificationScript extends Script<
  _ITriggers,
  _IState,
  'notification',
  'init',
  null
> {
  opts: ScriptOptsType<_ITriggers, _IState, 'notification', null>;
  constructor(opts) {
    super();
    this.opts = opts;
  }
  private cleared = false;
  init(args: { config?: INotificationConfig }): void {
    console.log('init not');
    if (args.config) {
      this.configs = args.config;
    }
  }
  private configs: Partial<INotificationConfig> = {
    timeout: 1500,
    color: 'PRIMARY',
  };
  private timeOut: any; //TimeoutObject
  watch(args: WatchArgsType<_ITriggers, 'notification'>): void {
    const showSmartEvent = this.opts.catchStatus('showSmart', args);
    if (showSmartEvent.isCatched) {
      this.cleared = true;
      this.opts.setStatus('setState', {
        isShown: true,
        smartNotification: showSmartEvent.payload,
      });
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
    }
    const passBlockerEvent = this.opts.catchStatus('clickYes', args);
    //В иделае ЛЮБУЮ обработку clickYes лучше делать route-related; так например для returnToForm - тут ее
    // точно сделать нельзя!
    if (passBlockerEvent.isCatched) {
      this.opts.trigger('router', 'deleteNavigationBlocker', null);
      this.opts.trigger('router', 'goToDestination', null);
      this.opts.setStatus('close', null);
    }
    const closeEvent = this.opts.catchStatus('close', args);
    if (closeEvent.isCatched) {
      this.opts.setStatus('setState', {
        isShown: false,
        smartNotification: undefined,
      });
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
    }
    const showEvent = this.opts.catchStatus('show', args);
    if (showEvent.isCatched) {
      const params = { ...this.configs, ...showEvent.payload };
      this.opts.setStatus('setState', {
        color: params.color,
        isShown: true,
        text: params.text,
      });
      if (params.timeout !== 'permament') {
        this.cleared = false;
        this.timeOut = setTimeout(() => {
          if (!this.cleared) {
            this.opts.setStatus('close', null);
          }
        }, params.timeout);
      }
    }
  }
}
