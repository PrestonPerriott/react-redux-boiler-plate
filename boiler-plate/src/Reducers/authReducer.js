'use strict';

import {} from '../Actions/types';

const authForm = ({
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: ({
    username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    password: '',
    passwordHasError: false,
    passwordErrorMsg: '',
    passwordAgain: '',
    passwordAgainHasError: false,
    passwordAgainErrorMsg: '',    
    showPassword: false
  })
});

const initialState = ({
    form: new authForm
});