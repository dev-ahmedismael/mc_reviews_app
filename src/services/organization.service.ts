import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private router: Router) {}

  getDomain(): string | null {
    let parent: ActivatedRoute | null = this.router.routerState.root;

    while (parent) {
      const organization = parent.snapshot.paramMap.get('organization');
      if (organization) {
        return organization;
      }
      parent = parent.firstChild;
    }

    return null;
  }
}
