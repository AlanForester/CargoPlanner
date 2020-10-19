import { Observable, of, Subscriber } from 'rxjs';
import { MessageService } from './message.service';
import { Component, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-root',
	styleUrls: ['./app.component.css'],
	templateUrl: './app.component.html',
})
export class AppComponent {
	title = 'app';

	search: string
	actionEmitter = new EventEmitter<string>()

	constructor(
		private messageService: MessageService,
	  ) {   }

	onQuery(q: string) {
		this.messageService.add(`AppComponent: Query =${ q }`);
		this.search = q
	}

	onAction(a: string) {
		this.messageService.add(`AppComponent: Action =${ a }`);
		this.actionEmitter.emit(a)
	}
}
