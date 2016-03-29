export default function ({LocalState}) {
  // console.log('notOnTabListener');

  $(window).focus(function () {
    // console.log('window focus');
    LocalState.set('window.isFocused', true);
  });

  $(window).blur(function () {
    // console.log('window blur');
    LocalState.set('window.isFocused', false);
  });
}
