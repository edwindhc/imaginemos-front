const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;

export  const loggedUser = (props, authentication, redirect) => {
    let local = JSON.parse(localStorage.getItem('user'));
    if (!isEmpty(authentication.user)) authentication.user.token.accessToken = local.token.accessToken ? props.history.push(redirect) : null;
}

export  const isLogged = (authentication) => {
    let local = JSON.parse(localStorage.getItem('user'));
    if (!isEmpty(authentication.user)) return authentication.token.accessToken = local.token.accessToken
    return false;
}