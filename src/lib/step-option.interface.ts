import { IStepOption } from '@ngx-tour/core';
import { NgxPopperjsPlacements, NgxPopperjsTriggers } from 'ngx-popperjs';

export interface INgxpStepOption extends IStepOption {
    placement?:
        | NgxPopperjsPlacements
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-start'
        | 'bottom-start'
        | 'left-start'
        | 'right-start'
        | 'top-end'
        | 'bottom-end'
        | 'left-end'
        | 'right-end'
        | 'auto'
        | 'auto-start'
        | 'auto-end';
    popperSettings?:{
        boundariesElement?: string;
        closeOnClickOutside?: boolean;
        disableAnimation?: boolean;
        disabled?: boolean;
        disableStyle?: boolean;
        forceDetection?: boolean;
        hideOnClickOutside?: boolean;
        hideOnScroll?: boolean;
        hideTimeout?: number;
        popperModifiers?: any;
        popperOnHidden?: any;
        popperOnShown?: any;
        positionFixed?: boolean;
        showDelay?: number;
        showOnStart?: boolean;
        showTrigger?: NgxPopperjsTriggers;
        targetElement?: HTMLElement;
        timeoutAfterShow?: number;
    }
}
