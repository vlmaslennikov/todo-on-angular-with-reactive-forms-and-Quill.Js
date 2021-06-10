import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import Quill from 'quill';

@Component({
  selector: 'app-quill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillComponent),
      multi: true,
    },
  ],
})
export class QuillComponent
  implements AfterViewInit, ControlValueAccessor, OnDestroy
{
  editor!: Quill;
  @ViewChild('quill') quillElement!: ElementRef<HTMLElement>;

  initialInputValue = new BehaviorSubject('');
  onChange = (val: any) => {};
  onTouch = (val: any) => {};

  ngAfterViewInit(): void {
    this.editor = new Quill(this.quillElement.nativeElement, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],

          ['clean'],
        ],
      },
      placeholder: 'Compose an epic...',
      theme: 'snow',
    });
    this.editor.on('text-change', () =>
      this.onChange(this.editor.root.innerHTML)
    );

    this.editor.root.innerHTML = this.initialInputValue.getValue();
  }

  writeValue(value: any): void {
    this.initialInputValue.next(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnDestroy(): void {
    this.initialInputValue.unsubscribe();
  }
}
