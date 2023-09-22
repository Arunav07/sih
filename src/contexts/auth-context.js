import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
    const  isAuthenticated = window.localStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }
    try{
     const isLawyer = window.localStorage.getItem('isLawyer') === 'true';
    }
    catch(err){
      console.error(err);
    }
    if (isAuthenticated && isLawyer) {
      const user = {
        id: '5e86809283e28b96d2d38537',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Arunav Chandra',
        email: 'arunav.chandra@chanakya.io',
          userType: "Lawyer",
        service: "Civil Law",
      };
      if(isAuthenticated && !isLawyer){
        const user = {
          id: '5e86809283e28b96d2d38537',
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: 'Arunav Chandra',
          email: 'arunav.chandra@chanakya.io',
          userType: "Client",
      } }
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.localStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Arunav Chandra',
      email: 'arunav.chandra@chanakya.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password, userType) => {
    if (email !== 'demo@chanakya.io' || password !== 'Password123!') {
      throw new Error('Please check your email and password');
    }

    try {

      if(userType === "Lawyer"){
        window.localStorage.setItem('isLawyer', 'true');
      }
      else{
        window.localStorage.setItem('isLawyer', 'false');
      }
      window.localStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Arunav Chandra',
      email: 'arunav.chandra@chanakya.io',
      userType: "Lawyer"
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (email, name, password, userType, lawyerType) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
