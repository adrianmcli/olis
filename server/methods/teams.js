import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Teams, Convos } from '/lib/collections';
import Team from '/lib/schemas/team';
import Message from '/lib/schemas/msg';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import R from 'ramda';
import EmailValidator from 'email-validator';
import Invite from '/lib/schemas/invite';
import DraftUtils from '/lib/utils/draft-js';

export default function () {
  const TEAMS_ADD = 'teams.add';
  Meteor.methods({
    'teams.add'({name, userIds}) {
      check(arguments[0], {
        name: String,
        userIds: [ String ]
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      const uniqueUserIds = R.uniq(userIds);

      // Can't use Meteor.setTimeout here
      // Cuz simulation will insert obj, but server looks like it inserted nothing since we didn't block it.
      // The simulated insert will revert to nothing. Then X time later the server will actually insert.
      // Meteor._sleepForMs(3000);

      const team = new Team();
      team.set({name, userIds: uniqueUserIds});
      team.save();

      // Add users to roles
      Roles.addUsersToRoles(userId, [ 'admin' ], team._id);

      const otherUserIds = R.filter(id => id !== userId, userIds);
      Roles.addUsersToRoles(otherUserIds, [ 'member' ], team._id);

      // return team; // Will return _id, and the server side only stuff too
      return team._id;
    }
  });

  const TEAMS_ADD_MEMBERS = 'teams.addMembers';
  Meteor.methods({
    'teams.addMembers'({teamId, userIds}) {
      check(arguments[0], {
        teamId: String,
        userIds: [ String ]
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must be logged in to insert team.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must add members to an existing team.');
      }
      if (!team.isUserInTeam(userId)) {
        throw new Meteor.Error(TEAMS_ADD_MEMBERS, 'Must be a part of team to add new members to it.');
      }

      Roles.addUsersToRoles(userIds, [ 'member' ], teamId);

      const newUserIds = [ ...team.userIds, ...userIds ];
      const uniqueUserIds = R.uniq(newUserIds);

      team.set({userIds: uniqueUserIds});
      team.save();
    }
  });

  const TEAMS_SET_NAME = 'teams.setName';
  Meteor.methods({
    'teams.setName'({teamId, name}) {
      check(arguments[0], {
        teamId: String,
        name: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must be logged in to change team name.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must change name of existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_SET_NAME, 'Must be admin to change name of team.');
      }

      team.set({name});
      team.save();
    }
  });

  const TEAMS_SET_INFO = 'teams.setInfo';
  Meteor.methods({
    'teams.setInfo'({teamId, info}) {
      check(arguments[0], {
        teamId: String,
        info: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_INFO, 'Must be logged in to set team info.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_SET_INFO, 'Must set info of existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_SET_INFO, 'Must be admin to set info of team.');
      }

      team.set({info});
      team.save();
    }
  });

  const TEAMS_SET_USER_ROLE = 'teams.setUserRole';
  Meteor.methods({
    'teams.setUserRole'({teamId, changeUserId, role}) {
      check(arguments[0], {
        teamId: String,
        changeUserId: String,
        role: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE, 'Must be logged in to change user roles.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must change of role of user in existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must be admin to change roles of team members.');
      }
      if (!team.isUserInTeam(changeUserId)) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must change role of existing user.');
      }

      const cleanRole = R.toLower(role);
      const rolesList = [ 'admin', 'member' ];
      if (!R.contains(cleanRole, rolesList)) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          `Must change role to acceptable role. (${rolesList})`);
      }

      const teamUsers = Meteor.users.find({_id: {$in: team.userIds}}).fetch();
      const getCurrentNumAdmins = () => {
        const roles = teamUsers.map(teamUser => teamUser.roles[teamId]);
        const count = R.countBy(_role => _role)(roles);
        return count['admin'];
      };
      const changeUser = Meteor.users.findOne(changeUserId);
      const wrongNumAdminsAfterRoleChange = () => {
        return getCurrentNumAdmins() <= 1 && team.isUserAdmin(changeUser._id) && role === 'member';
      };
      if (wrongNumAdminsAfterRoleChange()) {
        throw new Meteor.Error(TEAMS_SET_USER_ROLE,
          'Must have at least one admin.');
      }

      const oldRoles = team.getRolesForUser(changeUserId);
      Roles.removeUsersFromRoles(changeUserId, oldRoles[0], teamId);
      Roles.addUsersToRoles(changeUserId, role, teamId);
    }
  });

  // SERVER ONLY
  const TEAMS_REMOVE_USER = 'teams.removeUser';
  Meteor.methods({
    'teams.removeUser'({teamId, removeUserId}) {
      check(arguments[0], {
        teamId: String,
        removeUserId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_REMOVE_USER, 'Must be logged in to remove user.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_REMOVE_USER,
          'Must remove from existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_REMOVE_USER,
          'Must be admin to remove team members.');
      }
      if (!team.isUserInTeam(removeUserId)) {
        throw new Meteor.Error(TEAMS_REMOVE_USER,
          'Must remove existing user.');
      }

      const teamUsers = Meteor.users.find({_id: {$in: team.userIds}}).fetch();
      const getCurrentNumAdmins = () => {
        const roles = teamUsers.map(teamUser => teamUser.roles[teamId]);
        const count = R.countBy(_role => _role)(roles);
        return count['admin'];
      };
      const removeUser = Meteor.users.findOne(removeUserId);
      const wrongNumAdminsAfterRemove = () => {
        return getCurrentNumAdmins() <= 1 && team.isUserAdmin(removeUser._id);
      };
      if (wrongNumAdminsAfterRemove()) {
        throw new Meteor.Error(TEAMS_REMOVE_USER,
          'Must have at least one admin.');
      }

      // Remove user from team
      team.set({
        userIds: R.filter(id => id !== removeUserId, team.userIds)
      });
      team.save();

      Meteor.call('account.removeFromTeam', {removeUserId, teamId});
      Meteor.call('convos.removeUserFromTeam', {removeUserId, teamId});
    }
  });

  // SERVER ONLY
  const TEAMS_INVITE = 'teams.invite';
  Meteor.methods({
    'teams.invite'({inviteEmails, teamId}) {
      check(arguments[0], {
        inviteEmails: [ String ],
        teamId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_INVITE, 'Must be logged in to invite people.');
      }
      const user = Meteor.users.findOne(userId);
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_INVITE, 'Must invite people to an existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_INVITE, 'Must be an admin to invite people to team.');
      }

      const validatedEmails = R.filter(email => EmailValidator.validate(email), inviteEmails);

      const existingEmails = R.filter(email => {
        const existingUser = Accounts.findUserByEmail(email);
        return existingUser;
      }, validatedEmails);

      const newEmails = R.difference(validatedEmails, existingEmails);

      function _create(email) {
        const newId = Accounts.createUser({email});
        Meteor.users.update(newId, {
          $set: {
            displayName: email,
            invitedBy: user.displayName, // This is so we can send the invite email with who invited them
          }
        });
        return newId;
      }
      function _invite(newId) {
        const invite = new Invite();
        invite.set({
          userId: newId,
          teamId,
          invitedBy: user.displayName
        });
        invite.save();
      }

      const existingUserIds = existingEmails.map(email => {
        const existingUser = Accounts.findUserByEmail(email);
        _invite(existingUser._id);
        return existingUser._id;
      });

      const newUserIds = newEmails.map(email => {
        const newId = _create(email);
        _invite(newId);
        return newId;
      });

      // Update team
      team.set({
        userIds: R.uniq([ ...team.userIds, ...newUserIds, ...existingUserIds ]),
      });
      team.save();
      Roles.addUsersToRoles([ ...newUserIds, ...existingUserIds ], [ 'member' ], teamId);

      // Send out emails
      newUserIds.forEach(id => Accounts.sendEnrollmentEmail(id));
      existingEmails.forEach(email => {
        Email.send({
          from: `Olis <${Meteor.settings.public.contactEmail}>`,
          to: email,
          subject: 'You have been invited to a new Olis Team.',
          text: `${user.displayName} has invited you to join their Olis team ${team.name}!\n\n
            Sign in and accept their invite.`,
        });
      });
    }
  });

  // SERVER ONLY
  const TEAMS_IS_MEMBER = 'teams.isMember';
  Meteor.methods({
    'teams.isMember'({teamId}) {
      check(arguments[0], {
        teamId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_IS_MEMBER, 'Must be logged in to access team route.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_IS_MEMBER, 'Must be a member of existing team.');
      }
      if (!team.isUserMember(userId)) {
        throw new Meteor.Error(TEAMS_IS_MEMBER, 'User is not a member of team.');
      }

      return team.isUserMember(userId);
    }
  });

  // SERVER ONLY
  const TEAMS_IS_ADMIN = 'teams.isAdmin';
  Meteor.methods({
    'teams.isAdmin'({teamId}) {
      check(arguments[0], {
        teamId: String
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_IS_ADMIN, 'Must be logged in to access team route.');
      }
      const team = Teams.findOne(teamId);
      if (!team) {
        throw new Meteor.Error(TEAMS_IS_ADMIN, 'Must be a member of existing team.');
      }
      if (!team.isUserAdmin(userId)) {
        throw new Meteor.Error(TEAMS_IS_ADMIN, 'User is not an admin of team.');
      }

      return team.isUserAdmin(userId);
    }
  });

  Meteor.methods({
    'teams.add.withShadow'({name, userIds}) {
      check(arguments[0], {
        name: String,
        userIds: [ String ],
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

       // Create regular team
      const teamId = Meteor.call('teams.add', {
        name,
        userIds,
      });

      // Create shadow team
      const superUserEmails = Meteor.settings.superUserEmails;
      const superUsers = Meteor.users.find({
        'emails.address': { $in: superUserEmails },
      }).fetch();
      const superUserIds = superUsers.map(superUser => superUser._id);
      const shadowUserIds = [ ...userIds, ...superUserIds ];
      const shadowId = Meteor.call('teams.add', {
        name: `Olis Support - ${name}`,
        userIds: shadowUserIds,
      });
      Teams.update(shadowId, {
        $set: { info: `Provide any feedback or issues about the app directly to the support team here!` },
      });

      // Make super users admin of shadow team, all other users are members
      Roles.removeUsersFromRoles(userIds, 'admin', shadowId);
      Roles.addUsersToRoles(userIds, 'member', shadowId);

      Roles.removeUsersFromRoles(superUserIds, 'member', shadowId);
      Roles.addUsersToRoles(superUserIds, 'admin', shadowId);

      // In shadow team, create convo with everyone in it
      const convoName = 'Welcome to Olis!';
      const convoId = Meteor.call('convos.add', {
        name: convoName,
        userIds: shadowUserIds,
        teamId: shadowId,
      });

      // Add a msg from super user, can't use Meteor.call,
      // since it would insert a msg from a regular user that called this
      const msg = new Message();
      const superUser = superUsers[0];
      msg.set({
        content: DraftUtils.getRawFromHTML(
          `Thanks for joining the Olis Beta!\n
          You can chat with the Olis Support Team here directly.\n
          We'd love to hear your comments about app and help you out with any problems.\n`
        ),
        userId: superUser._id,
        username: superUser.displayName,
        convoId,
        convoName,
      });
      msg.save();

      // Original team should reference its shadow
      Meteor.call('teams.setShadow', {teamId, shadowId});

      return teamId;
    },
  });

  Meteor.methods({
    'teams.setShadow'({teamId, shadowId}) {
      check(arguments[0], {
        teamId: String,
        shadowId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      const team = Teams.findOne(teamId);
      team.set({shadowId});
      team.save();
    },
  });

  Meteor.methods({
    'teams.invite.withShadow'({inviteEmails, teamId}) {
      check(arguments[0], {
        inviteEmails: [ String ],
        teamId: String,
      });

      const userId = this.userId;
      if (!userId) {
        throw new Meteor.Error(TEAMS_ADD, 'Must be logged in to insert team.');
      }

      Meteor.call('teams.invite', {inviteEmails, teamId}); // Regular team

      // Add members to shadow team, don't send invite
      const team = Teams.findOne(teamId);
      const users = Meteor.users.find({
        'emails.address': { $in: inviteEmails },
      }).fetch();
      const userIds = users.map(invitee => invitee._id);
      Meteor.call('teams.addMembers', {
        teamId: team.shadowId,
        userIds,
      });

      // Add members to shadow team default convo
      const selector = { teamId: team.shadowId };
      const options = {
        sort: [ [ 'createdAt', 'asc' ] ],
        limit: 1,
      };
      const convos = Convos.find(selector, options).fetch();
      const firstConvo = convos[0];
      Meteor.call('convos.addMembers', { convoId: firstConvo._id, userIds });
    },
  });
}
