import {Meteor} from 'meteor/meteor';
import {SearchSource} from 'meteor/meteorhacks:search-source';

export const buildRegExp = (searchText) => {
  let words = searchText.trim().split(/[ \-\:]+/);
  let exps = words.map(word => `(?=.*${word})`);
  let fullExp = exps.join('') + '.+';
  return new RegExp(fullExp, 'i');
};

export default function () {
  SearchSource.defineSource('allUsers', function (searchText, _options) {
    const defaultOptions = {
      sort: {username: 1},
      limit: 10,
      fields: {username: 1, emails: 1}
    };
    const options = _options ? _options : defaultOptions;

    if (searchText) {
      const regExp = buildRegExp(searchText);
      const selector = {$or: [
        {username: regExp},
        {'emails.address': regExp}
      ]};
      return Meteor.users.find(selector, options).fetch();
    }
    return [];
  });
}
