import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { User } from '@core/models/interface';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private rolesService: NgxRolesService,
    private permissionsService: NgxPermissionsService,
    private authService: AuthService
  ) {}

  /**
   * Called during app startup to initialize user roles and permissions
   */
  load() {
    return this.authService
      .change()
      .pipe(
        tap((user: User | null) => {
          if (user) {
            this.setRoleAndPermissions(user);
          } else {
            // If user logs out, clear everything
            this.rolesService.flushRoles();
            this.permissionsService.flushPermissions();
          }
        })
      )
      .subscribe();
  }

  /**
   * Registers the user role and its permissions into ngx-permissions
   */
  private setRoleAndPermissions(user: User) {
    // Reset old roles and permissions
    this.permissionsService.flushPermissions();
    this.rolesService.flushRoles();

    // Handle single role from token (usertype_role)
    if (user.usertype_role) {
      const roleName = user.usertype_role;

      // Gather permissions if provided (for future support)
      const rolePermissions = Array.isArray(user.permissions) ? user.permissions : [];

      this.rolesService.addRole(roleName, rolePermissions);
      this.permissionsService.loadPermissions(rolePermissions);

      console.log(`[StartupService] Loaded role: ${roleName}`, rolePermissions);
    }

    // Handle multiple roles if present in user.roles[]
    if (user.roles && Array.isArray(user.roles)) {
      user.roles.forEach((role: any) => {
        if (role?.name) {
          const rolePermissions = Array.isArray(role.permissions) ? role.permissions : [];
          this.rolesService.addRole(role.name, rolePermissions);
          this.permissionsService.addPermission(rolePermissions);

          console.log(`[StartupService] Loaded role: ${role.name}`, rolePermissions);
        }
      });
    }
  }
}
