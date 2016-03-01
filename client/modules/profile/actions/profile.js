export default {
  goToMyAccount({FlowRouter}) {
    console.log('goToMyAccount');
    FlowRouter.go('/home/profile');
  }
};
