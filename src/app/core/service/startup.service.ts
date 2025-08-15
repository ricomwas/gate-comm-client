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
    private permissonsService: NgxPermissionsService,
    private authService: AuthService
  ) {}

  load() {
    return this.authService
      .change()
      .pipe(
        tap((user: User | null) => {
          if (user) {
            this.setPermissions(user);
          } else {
            // Flush permissions if the user logs out
            this.rolesService.flushRoles();
            this.permissonsService.flushPermissions();
          }
        })
      )
      .subscribe();
  }

  private setPermissions(user: User) {
    // Clear old roles and permissions first
    this.permissonsService.flushPermissions();
    this.rolesService.flushRoles();

    const rolePermissions: any = {};
    const permissions: string[] = [];

    // Ensure the roles property exists and is an array before trying to iterate.
    if (user.roles && Array.isArray(user.roles)) {
      user.roles.forEach((e: any) => {
        const name = e['name'];
        if (name && e.permissions && Array.isArray(e.permissions)) {
          // Add permissions to a single flat list
          permissions.push(...e.permissions);
          // Map role name to its permissions
          rolePermissions[name] = e.permissions;
        }
      });
    }

    // Load all unique permissions at once
    this.permissonsService.loadPermissions(permissions);
    // Add all roles with their specific permissions
    this.rolesService.addRolesWithPermissions(rolePermissions);
  }
}