import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactFormComponent } from '../common/contact-form/contact-form.component';
import { ContactService } from '../services/contact.service';
import { Contact } from '../model/contact';



@Component({
  selector: 'app-add-contact',
  imports: [
    MatProgressSpinnerModule,
    ContactFormComponent
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
  private router = inject(Router);
  private contactService = inject(ContactService);
  title: string = 'Add Contact';

  //before using contact form
  // name = signal<string>('');
  // phone = signal<string>('');
  // email = signal<string>('');

  saving = signal(false);
  //before using contact form
  // async saveContact() {
  //   this.saving.set(true);
  //   await this.contactService.addContact({
  //     id: '',
  //     name: this.name(),
  //     phone: this.phone(),
  //     email: this.email()
  //   });
  //   this.saving.set(false);
  //   this.router.navigate(['/']);
  // }
  async saveContact(newContact: Contact) {
    this.saving.set(true);
    await this.contactService.addContact(newContact);
    this.saving.set(false);
    this.router.navigate(['/contact-list']);
  }

}
