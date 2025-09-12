// Define your endpoints object
export const endpointPaths = {
  _urlgetVisitorType: "getVisitortypes",
  _urlgetProperties: "getProperties",
  _urlcreateUser: "createUser",
  _urlresSignUp: "residentSignup",
  _urlcreateRole: "createRole",
  _urlcreatePerm: "createPermission",
  _urlpropSignUp: "propSignup",
  _urlassignPerm: "assignPerm",
  _urlgetRoles: "getRoles",
  _urlcreateUserType: "createUsertype",
  _urlcreateVisitType: "createVisitortype",
  _urlgetUsertype: "getUsertype",
  _urlusersbyProp: "users_by_property",
  _urlTempPass: "users_temp_pass"


} as const;

// Automatically infer the keys and values
export type EndpointKey = keyof typeof endpointPaths;  
export type EndpointValue = typeof endpointPaths[EndpointKey];

export function getEndpoint(key: EndpointKey): EndpointValue {
  return endpointPaths[key];
}
