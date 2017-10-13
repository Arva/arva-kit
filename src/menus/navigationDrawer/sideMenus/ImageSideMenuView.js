/**
 * Created by Manuel on 28/07/16.
 */
import Surface                  from 'arva-js/famous/core/Surface.js';
import BgImageSurface           from 'arva-js/famous/surfaces/BgImageSurface.js';

import {layout}                 from 'arva-js/layout/Decorators.js';
import {combineOptions}         from 'arva-js/utils/CombineOptions.js';
import {AccountIcon}            from 'arva-kit/icons/AccountIcon.js';
import {CloudIcon}              from 'arva-kit/icons/CloudIcon.js';
import {ArrowleftIcon}          from 'arva-kit/icons/ArrowleftIcon.js';
import {AndroidshareIcon}       from 'arva-kit/icons/AndroidshareIcon.js';

import {DraggableSideMenuView}  from './DraggableSideMenuView.js';
import {IconMenuItem}           from './IconMenuItem.js';


export class ImageSideMenuView extends DraggableSideMenuView {

    @layout.dock.top((width, height) => width/2, 12, 20)
    image = new BgImageSurface({
        content: this.options.image,
        sizeMode: BgImageSurface.SizeMode.ASPECTFILL
    });

    constructor(options = {}) {
        super(combineOptions({
            backgroundColor: 'white',
            itemClass: IconMenuItem
        },options));



    }
}   