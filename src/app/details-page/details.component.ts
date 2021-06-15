import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Todo } from "../interfaces/todo";
import { UpdateService } from "../update.service";

@Component({
  selector: "app-details",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit, AfterViewChecked {
  description!: Todo;
  form!: FormGroup;
  canEditDetails = false;
  @ViewChild("details") detailsRef!: ElementRef;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly updateService: UpdateService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          this.description = this.updateService.getTask(params.id);
        })
      )
      .subscribe();

    this.form = this.formBuilder.group({
      input: [this.description.details],
    });
  }

  ngAfterViewChecked(): void {
    if (this.detailsRef) {
      this.detailsRef.nativeElement.innerHTML = this.description.details;
    }
  }
  saveChanges(): void {
    this.updateService.setTask(this.description.id.toString(), {
      ...this.description,
      details: this.form.value.input,
    });
    this.description.details = this.form.value.input;
  }

  canEdit(value: HTMLInputElement): void {
    this.canEditDetails = value.checked as boolean;
  }
}
