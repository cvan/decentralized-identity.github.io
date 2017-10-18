/* global ga */
(function() {
  var titles = {
    '/': 'Decentralized Identity Foundation',
    '/working-groups': 'Working Groups',
    '/membership': 'Membership'
  };

  var routeUpdate = window.routeUpdate = function routeUpdate(href, push) {
    if (!href) {
      throw new Error('Must pass `href` as the first parameter to `routeUpdate`');
    }
    href = href.replace(/.html$/, '');
    if (history.scrollRestoration !== 'auto') {
      window.scrollTo(0, 0);
    }
    var state = {
      path: href,
      title: 'DIF - ' + (titles[href] || titles['/'])
    };
    document.title = state.title;
    if (push === false) {
      history.replaceState(state, null, href);
    } else {
      history.pushState(state, state.title, href);
      ga('set', {
        page: location.pathname,
        title: state.title
      });
      ga('send', 'pageview');
    }
    document.body.setAttribute('path', location.pathname);
  };

  var redirect = null;
  try {
    redirect = window.sessionStorage.redirect;
    delete window.sessionStorage.redirect;
  } catch (err) {
  }
  if (redirect && redirect !== location.href) {
    routeUpdate(redirect, false);
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was redirected by 404.html, from the route: ' + redirect);
  }
  else {
    // REMOVE THIS - just showing the redirect route in the UI
    document.documentElement.setAttribute('message', 'This page was loaded directly from the index.html file');
  }

  window.onpopstate = function(e) {
    routeUpdate(e.state.path, false);
  };
})();
