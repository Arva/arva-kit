/**
 * Created by lundfall on 12/07/16.
 */
import ImageSurface                         from 'famous/Surfaces/ImageSurface.js';
import {layout}                             from 'arva-js/layout/Decorators.js';
import {combineOptions}                     from 'arva-js/utils/CombineOptions.js';

import {Button}                             from './Button.js';
import {TextButton}                         from './TextButton.js';
import {Colors}                             from '../defaults/DefaultColors.js';
import {ArrowleftIcon}                      from '../icons/rounded/thin/ArrowleftIcon.js';
import {ComponentHeight}                    from '../defaults/DefaultDimensions.js';


export class ImageButton extends Button {
    @layout.translate(0, 0, 30)
    @layout.dock.fill()
    @layout.stick.center()
    image = this.options.image
        ? new ImageSurface({content: this.options.image})
        : new this.options.icon({
            color: this.options.properties.color
        });

    /* Default if true size specified */
    getSize() {
        return [ComponentHeight, ComponentHeight];
    }

    constructor(options = {}) {
        if (!options.image && !options.icon) {
            options.icon = ArrowleftIcon;
        }
        if (options.imageOnly) {
            options.backgroundProperties = {...options.backgroundProperties, backgroundColor: 'none'};
            options.variation = 'noShadow';
        }
        super(combineOptions({
            properties: {color: Colors.PrimaryUIColor},
            ...TextButton.generateBoxShadowVariations(options.variation)
        }, options));

        if (this.options.imageSize) {
            this.decorateRenderable('image', layout.size(...this.options.imageSize));
        }
    }

    setContent(iconConstructor) {
        this.image.setContent(new iconConstructor({color: this.options.properties.color}).getContent());
    }

    setColor() {
        return this.image.changeColor(...arguments);
    }

    _setEnabled(enabled) {
        super._setEnabled(enabled);
        if (this.options.icon && this.image && this.image.changeColor) {
            this.image.changeColor(enabled ? this.options.backgroundProperties.backgroundColor : Colors.Gray);
        }
    }


    /* TODO 3: add _setEnabled method that changes image color if it's an icon */

}
