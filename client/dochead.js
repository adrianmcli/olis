import {DocHead} from 'meteor/kadira:dochead';

export default function () {
  DocHead.setTitle('Olis');
  DocHead.addLink({
    rel: 'icon',
    href: '/favicon.ico'
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
