import React from 'react';
import { Auth } from './Auth';

export const AuthContext = React.createContext(Auth.AppUser.LoggedOut());