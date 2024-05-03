import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-path',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './path.component.html',
  styleUrl: './path.component.css',
})
export class PathComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  items: { resource: string; path: string }[] = [];

  ngOnInit(): void {
    this.items = this.transformStringToArrayWithPaths(this.router.url);
    
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (value) => {
          this.items = this.transformStringToArrayWithPaths(this.router.url);
        },
      });
  }

  transformStringToArrayWithPaths(
    input: string
  ): { resource: string; path: string }[] {
    //remove first and last '/'
    input = input.replace(/^\/|\/$/g, '').replace('app/', '');

    const parts = input.split('/');

    const result = parts.map((part, index) => {
      return {
        resource: part,
        path: `/app/${parts.slice(0, index + 1).join('/')}/`,
      };
    });

    return result;
  }
}
