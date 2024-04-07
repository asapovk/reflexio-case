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
  init(args: { config?: INotificationConfig }): void {
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
    const closeEvent = this.opts.catchStatus('close', args);
    if (closeEvent.isCatched) {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
        this.opts.setStatus('setState', {
          isShown: false,
        });
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
      this.timeOut = setTimeout(() => {
        this.opts.setStatus('close', null);
      }, params.timeout);
    }
  }
}
