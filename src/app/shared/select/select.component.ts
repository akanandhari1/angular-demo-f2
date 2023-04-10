import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AnyForUntypedForms, FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input('data') data$: any;
  @Input() value: AnyForUntypedForms;
  @Output() changeValue = new EventEmitter();
  @Output() changeSearch = new EventEmitter();

  ctrl: FormControl = new FormControl();
  searchCtrl: FormControl = new FormControl();

  subscriptions: Subscription[] = [];
  _options = new BehaviorSubject([]);
  options$ = this._options.asObservable().pipe(
    scan((acc, curr) => {
      if (!acc || !curr) return [];
      return [...acc, ...curr];
    }, [])
  );
  offset = 0;
  limit = 20;
  data = [];

  constructor() {}

  ngOnInit() {
    this.subscriptions.push(
      this.data$.subscribe({
        next: (data: any) => {
          console.log('Ingested data changed');
          this.data = data;
          this.offset = 0;
          this._options.next([]);
          this.getNextBatch();
        },
      })
    );
    this.subscriptions.push(
      this.searchCtrl.valueChanges.subscribe((val) => this.onSearchChange(val))
    );

    this.subscriptions.push(
      this.options$.subscribe((val) =>
        console.log(`New view array contains ${val.length} items`)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onChange(e: any): void {
    console.log(`Value Changed: ${e}`);
    this.changeValue.emit(e);
  }

  onSearchChange(e: any): void {
    console.log(`Search Changed: ${e}`);
    this.changeSearch.emit(e);
  }

  getNextBatch(): void {
    const results = this.data.slice(this.offset, this.offset + this.limit);
    this._options.next(results);
    this.offset += this.limit;
  }
}
