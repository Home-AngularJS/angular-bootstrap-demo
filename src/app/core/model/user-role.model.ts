/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

interface RoleAuthority {
  authority: any;
}

interface UserRoleModel {
  roleCode: any;
  description: any;
  roleAuthorities: any;
}


export function dtoToUserRole(src: any) {
  const roleAuthorities: any = [];
  for (let i = 0; i < src.roleAuthorities.length; i++) {
    roleAuthorities.push(src.roleAuthorities[i].authority);
  }

  const dest: any = {
    'roleCode': src.roleCode,
    'description': src.description,
    'roleAuthorities': roleAuthorities
  };
  return dest;
}

export function userRoleToUpdate(src: any) {
  const dest = {
    'userAuthorityList': src.roleAuthorities
  };
  return dest;
}
