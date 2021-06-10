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
import { UpdateService } from '../update.service';


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
    private route: ActivatedRoute,
    private updateService : UpdateService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          this.updateService.updateTasksList('REMOVE',params.id);
          this.updateService.currentTodo;
          this.details = JSON.parse(this.updateService.currentTodo);/////
        })
      )
      .subscribe();

    this.form = this.formBuilder.group({
      input: [this.details.details],
    });
  }

  ngAfterViewChecked():void{
    if (this.detailsRef)
      this.detailsRef.nativeElement.innerHTML = this.details.details;
  }

  saveChanges(): void {
    this.updateService.updateTasksList('SET',this.details.id ,{ ...this.details, details: this.form.value.input });
    this.details.details = this.form.value.input;
  }

  canEdit(value: HTMLInputElement):void{
    this.canEditDetails = value.checked as boolean;
  }
}
