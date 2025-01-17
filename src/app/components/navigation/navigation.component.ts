import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}