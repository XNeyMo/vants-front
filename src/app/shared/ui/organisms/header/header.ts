import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Logo } from '../../atoms/logo/logo';
import { Navigation } from '../../molecules/navigation/navigation';
import { LanguageSwitcher } from '../../molecules/language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  imports: [Logo, Navigation, LanguageSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

}
