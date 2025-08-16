/* export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}
 */
export interface User {
  [prop: string]: any;  // fallback for anything else

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;

  // roles and permissions from your system
  roles?: any[];
  permissions?: any[];

  // 👇 fields coming from your decoded JWT
  usertype_id?: number | string;
  usertype_role?: string;
  curr_user?: string;
  username?: string;
  comm_id?: number | string;
}
export interface Token {
  [prop: string]: any;

  access_token: string;
  token_type?: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
}
