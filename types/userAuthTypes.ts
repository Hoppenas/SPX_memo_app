export interface ILoginProps {
  email: string;
  password: string;
}
export interface IRegistrationProps {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  age: string;
  location: string;
}
export interface IRestoreProps {
  email: string;
}

export interface ISetUserProps {
  email: string;
  password: string;
  passwordConfirm?: string;
  name?: string;
  age?: string;
  location?: string;
}

export interface ISetUserData {
  name?: string;
  age?: string;
  location?: string;
  createdAt: string;
  userID: string;
}

export interface IFirebaseAuth {
  user: {
    status: Boolean;
    email?: string;
    uid?: string;
    code?: string;
  };
}
