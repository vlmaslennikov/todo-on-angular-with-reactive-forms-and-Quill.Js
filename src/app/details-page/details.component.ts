import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewChecked {
  details: any;
  form!: FormGroup;
  canEditDetails: boolean = false;
  @ViewChild('details') detailsRef!: ElementRef;
  constructor(
    private readonly formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          this.details = JSON.parse(localStorage.getItem(params.id) as string);
        })
      )
      .subscribe();

    this.form = this.formBuilder.group({
      input: [this.details.details],
    });
  }

  ngAfterViewChecked() {
    if (this.detailsRef)
      this.detailsRef.nativeElement.innerHTML = this.details.details;
  }

  saveChanges(): void {
    localStorage.setItem(
      this.details.id.toString(),
      JSON.stringify({ ...this.details, details: this.form.value.input })
    );
    this.details.details = this.form.value.input;
  }

  canEdit(value: HTMLInputElement) {
    this.canEditDetails = value.checked as boolean;
  }
}
