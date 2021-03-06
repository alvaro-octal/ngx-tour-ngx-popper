import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { TourService } from '@ngx-tour/core';

import {
  TourAnchorNgxPopperDirective,
  TourAnchorNgxPopperPopoverDirective,
} from './tour-anchor.directive';
import { TourStepTemplateComponent } from './tour-step-template.component';
import { TourStepTemplateService } from './tour-step-template.service';
import { NgxpTourService } from './ngx-popper-tour.service';
import { TourBackdropService } from './tour-backdrop.service';

export {
  TourAnchorNgxPopperDirective,
  TourAnchorNgxPopperPopoverDirective,
  TourStepTemplateComponent,
  NgxpTourService,
};

@NgModule({
  declarations: [
    TourAnchorNgxPopperDirective,
    TourAnchorNgxPopperPopoverDirective,
    TourStepTemplateComponent,
  ],
  exports: [
    TourAnchorNgxPopperDirective,
    TourAnchorNgxPopperPopoverDirective,
    TourStepTemplateComponent,
  ],
  imports: [CommonModule, NgxPopperjsModule.forRoot()],
})
export class TourNgxPopperModule {
  public static forRoot(): ModuleWithProviders<TourNgxPopperModule> {
    return {
      ngModule: TourNgxPopperModule,
      providers: [
        TourStepTemplateService,
        TourService,
        NgxpTourService,
        TourBackdropService,
      ],
    };
  }
}
