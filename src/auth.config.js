export const authConfig = {
    session: {
      strategy: 'jwt'
    },
    pages: {
      signIn: '/login'
    },
    callbacks: {
      authorized({ auth }) {
        const isAuthenticated = !!auth?.user
        return isAuthenticated
      }
    },
    // Add trusted hosts here if necessary
    trustHost: true,
    providers: []
  }
  import {AuthError} from "next-auth"
  export class InvalidLoginError extends AuthError {
    code = 'custom';
    errorMessage;
    constructor(message, errorOptions) {
      super(message, errorOptions);
      this.errorMessage = message;
    }
  }
  