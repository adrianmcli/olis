import {DocHead} from 'meteor/kadira:dochead';
import FaviconNotification from 'favicon-notification';

const favicon = '/favicon.ico?v=1.0.3';

export default function () {
  DocHead.setTitle('Olis');
  DocHead.addLink({
    rel: 'icon',
    href: favicon
  });
  FaviconNotification.init({
    url: favicon,
  });
    
  DocHead.addLink({
    href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    rel: 'stylesheet'
  });
  DocHead.addLink({
    href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
    rel: 'stylesheet'
  });
}
