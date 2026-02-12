import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Logo } from '../../atoms/logo/logo';
import { Button } from '../../atoms/button/button';
import { Navigation } from '../../molecules/navigation/navigation';

@Component({
  selector: 'app-header',
  imports: [Logo, Navigation, Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

}
