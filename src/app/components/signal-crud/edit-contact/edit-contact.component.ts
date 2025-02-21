import { Component, computed, input, linkedSignal, resource, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormComponent } from '../common/contact-form/contact-form.component';
import { Contact } from '../model/contact';
import { ContactService } from '../services/contact.service';



@Component({
  selector: 'app-edit-contact',
  imports: [
    ContactFormComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {
  private router = inject(Router);
  private contactService = inject(ContactService);
  id = input.required<string>();

  editing = signal(false);
  loading = computed(() => this.contactResource.isLoading() || this.editing());

  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.contactService.getContact(this.id()),
  });

  // before using contact form; commented out
  // name = linkedSignal(() => this.contactResource.value()?.name ?? '');
  // phone = linkedSignal(() => this.contactResource.value()?.phone ?? '');
  // email = linkedSignal(() => this.contactResource.value()?.email ?? '');

  async editContact(contact: Contact) {
    this.editing.set(true);
    await this.contactService.editContact(contact);
    this.editing.set(false);
    this.router.navigate(['/contact-list']);
  }

}
