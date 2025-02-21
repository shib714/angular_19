import { Component, input, output, linkedSignal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Contact } from '../../model/contact';


@Component({
  selector: 'app-contact-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {

  title = input<string>('');
  contact = input<Contact>();

  name = linkedSignal(() => this.contact()?.name ?? '');
  email = linkedSignal(() => this.contact()?.email ?? '');
  phone = linkedSignal(() => this.contact()?.phone ?? '');

  save = output<Contact>();

  onSubmit() {
    this.save.emit({
      id: this.contact()?.id ?? '',
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
  }
}
