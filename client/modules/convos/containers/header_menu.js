import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
import HeaderMenu from '../components/HeaderMenu.jsx';

const depsMapper = (context, actions) => ({
  context: () => context,
  logout: actions.account.logout,
  goToMyAccount: actions.profile.goToMyAccount
});

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();

  const username = Meteor.user() ? Meteor.user().username : '';

  const teamId = LocalState.get('teamId');
  if (teamId) {
    if (Meteor.subscribe('teams.single', {teamId}).ready()) {
      const team = Collections.Teams.findOne(teamId);
      onData(null, {username, teamName: team.name});
    }
  }
  else {
    onData(null, {username, teamName: ''});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(HeaderMenu);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     files: []
  //   };
  // }

  // handleFileChange(e) {
  //   const files = e.currentTarget.files;
  //   this.setState({files});
  // }


          //  <input type="file" onChange={this.handleFileChange.bind(this)} />
          // <button onClick={uploadImage.bind(null, files)}>UPLOAD</button>
