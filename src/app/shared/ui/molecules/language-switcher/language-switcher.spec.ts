import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';

import { LanguageSwitcher } from './language-switcher';

describe('LanguageSwitcher', () => {
  let component: LanguageSwitcher;
  let fixture: ComponentFixture<LanguageSwitcher>;
  let setActiveLangCalls: string[];

  beforeEach(async () => {
    setActiveLangCalls = [];
    await TestBed.configureTestingModule({
      imports: [LanguageSwitcher],
      providers: [
        {
          provide: TranslocoService,
          useValue: {
            getActiveLang: () => 'en',
            setActiveLang: (lang: string) => setActiveLangCalls.push(lang)
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the current language label and title', () => {
    expect(component.label()).toBe('EN');
    expect(component.title()).toBe('Switch to Spanish');
  });

  it('should toggle language and notify Transloco', () => {
    component.toggleLanguage();
    expect(component.currentLang()).toBe('es');
    expect(setActiveLangCalls).toEqual(['es']);
  });
});
