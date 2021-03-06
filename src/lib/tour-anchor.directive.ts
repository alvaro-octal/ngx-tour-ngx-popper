import { Directive, ElementRef, Host, HostBinding, Input } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';
import {
  NgxPopperjsDirective,
  NgxPopperjsPlacements,
  NgxPopperjsTriggers,
} from 'ngx-popperjs';
import { TourAnchorDirective } from '@ngx-tour/core';
import withinviewport from 'withinviewport';

import { NgxpTourService } from './ngx-popper-tour.service';
import { TourStepTemplateService } from './tour-step-template.service';
import { INgxpStepOption as IStepOption } from './step-option.interface';
import { TourBackdropService } from './tour-backdrop.service';

@Directive({ selector: '[tourAnchor]' })
export class TourAnchorNgxPopperPopoverDirective
  extends NgxPopperjsDirective
  implements OnInit {
  // Overwrite parent ngOnInit to do nothing since the content property isn't set yet.
  ngOnInit() {}

  // Call this to initialize the popover once the content has been set
  initialize() {
    super.ngOnInit();
  }
}

@Directive({
  selector: '[tourAnchor]',
})
export class TourAnchorNgxPopperDirective
  implements OnInit, OnDestroy, TourAnchorDirective {
  @Input() public tourAnchor: string;

  @HostBinding('class.touranchor--is-active')
  public isActive: boolean;

  constructor(
    private tourService: NgxpTourService,
    private tourStepTemplate: TourStepTemplateService,
    private element: ElementRef,
    @Host() private popoverDirective: TourAnchorNgxPopperPopoverDirective,
    private tourBackdrop: TourBackdropService
  ) {}

  public ngOnInit(): void {
    this.tourService.register(this.tourAnchor, this);
  }

  public ngOnDestroy(): void {
    this.tourService.unregister(this.tourAnchor);
  }

  public showTourStep(step: IStepOption): void {
    this.isActive = true;
    this.tourStepTemplate.templateComponent.step = step;
    step.prevBtnTitle = step.prevBtnTitle || 'Prev';
    step.nextBtnTitle = step.nextBtnTitle || 'Next';
    step.endBtnTitle = step.endBtnTitle || 'End';

    this.popoverDirective.content = this.tourStepTemplate.template;
    this.popoverDirective.targetElement = this.element.nativeElement;
    this.popoverDirective.placement = (step.placement ||
      NgxPopperjsPlacements.AUTO) as NgxPopperjsPlacements;

    if (step.popperSettings) {
      this.popoverDirective.boundariesElement =
        step.popperSettings.boundariesElement || undefined;
      this.popoverDirective.closeOnClickOutside =
        step.popperSettings.closeOnClickOutside || false;
      this.popoverDirective.disableAnimation =
        step.popperSettings.disableAnimation || false;
      this.popoverDirective.disabled = step.popperSettings.disabled || false;
      this.popoverDirective.disableStyle =
        step.popperSettings.disableStyle || false;
      this.popoverDirective['forceDetection'] =
        step.popperSettings.forceDetection || false;
      this.popoverDirective.hideOnClickOutside =
        step.popperSettings.hideOnClickOutside || false;
      this.popoverDirective.hideOnScroll =
        step.popperSettings.hideOnScroll || false;
      this.popoverDirective.hideTimeout = step.popperSettings.hideTimeout || 0;
      this.popoverDirective.positionFixed =
        step.popperSettings.positionFixed || false;
      this.popoverDirective.showDelay = step.popperSettings.showDelay || 0;
      this.popoverDirective.showOnStart =
        step.popperSettings.showOnStart || false;
      this.popoverDirective.showTrigger =
        step.popperSettings.showTrigger || NgxPopperjsTriggers.none;
      this.popoverDirective.timeoutAfterShow =
        step.popperSettings.timeoutAfterShow || 0;
    }

    this.popoverDirective.initialize();
    if (
      step.hasOwnProperty('popperSettings') &&
      step.popperSettings.hasOwnProperty('showDelay')
    ) {
      this.popoverDirective.scheduledShow();
    } else {
      this.popoverDirective.show();
    }

    if (!step.preventScrolling) {
      if (!withinviewport(this.element.nativeElement, { sides: 'bottom' })) {
        (this.element.nativeElement as HTMLElement).scrollIntoView(false);
      } else if (
        !withinviewport(this.element.nativeElement, { sides: 'left top right' })
      ) {
        (this.element.nativeElement as HTMLElement).scrollIntoView(true);
      }
    }

    if (step.enableBackdrop) {
      this.tourBackdrop.show(this.element, step.backdropZIndex);
    } else {
      this.tourBackdrop.close();
    }
  }

  public hideTourStep(): void {
    this.isActive = false;
    this.popoverDirective.hide();
    this.tourBackdrop.close();
  }
}
