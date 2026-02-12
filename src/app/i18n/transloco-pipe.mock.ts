import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transloco',
  standalone: true
})
export class TranslocoPipeMock implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
