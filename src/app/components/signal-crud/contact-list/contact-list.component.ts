import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../services/contact.service';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-contact-list',
  imports: [
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterModule, 
    MatProgressSpinnerModule,
    MatToolbarModule, 
    RouterLink
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  contactService = inject(ContactService);

  //using signal
  //contacts = signal<Contact[]>(this.contactService.contacts);

  //using resource
  contactsResource = resource({
    loader: () => this.contactService.getContacts(),
  });

  deleting = signal(false);
  loading = computed(() => this.contactsResource.isLoading() || this.deleting());

  async deleteContact(id: string) {
    this.deleting.set(true);
    await this.contactService.deleteContact(id);
    this.deleting.set(false);
    this.contactsResource.reload();
  }

  snackbar = inject(MatSnackBar);

  showError = effect(() => {
    const error = this.contactsResource.error() as Error;
    if (error) {
      this.snackbar.open(error.message, 'Close', {
       // duration: 5000,
      });
    }    
  });

}
