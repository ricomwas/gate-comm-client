export class CustomJwtPayload {
  curr_user!: string;
  exp?: number;
  fresh!: boolean;
  iat!: number;
  jti?: string;
  nbf?: number;
  sub?: number;
  type!: string;
  username!: string;
  usertype_id?: number;
  usertype_role!: string;
  comm_id?: number;
}