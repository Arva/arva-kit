/**
 * Created by lundfall on 12/07/16.
 */
import ImageSurface                         from 'arva-js/famous/surfaces/ImageSurface.js';
import {layout, bindings, dynamic}          from 'arva-js/layout/Decorators.js';
import {combineOptions}                     from 'arva-js/utils/CombineOptions.js';

import {Button}                             from './Button.js';
import {TextButton}                         from './TextButton.js';
import {Colors}                             from '../defaults/DefaultColors.js';
import {ArrowleftIcon}                      from '../icons/rounded/thin/ArrowleftIcon.js';
import {ComponentHeight}                    from '../defaults/DefaultDimensions.js';

@bindings.setup({
  image: undefined,
  icon: ArrowleftIcon,
  properties: {color: Colors.PrimaryUIColor},
  imageSize: [undefined, undefined],
  backgroundProperties: {}
})
export class ImageButton extends Button {

    @bindings.preprocess()
    setVariationIfNeeded(options) {
        if(options.imageOnly){
            options.backgroundProperties = {...options.backgroundProperties, backgroundColor: 'none'};
            options.variation = 'noShadow';
        }
        Object.assign(options, TextButton.generateBoxShadowVariations(options.variation))
    }

    @bindings.preprocess()
    setCorrectColor({properties: {color}}) {
        this.setColor(color);
    }

    @layout.translate(0, 0, 30)
      .dock.fill()
      .stick.center()
    @dynamic(options =>
        layout.size(...options.imageSize)
    )
    image = this.options.image
        ? ImageSurface.with({content: this.options.image})
        : this.options.icon.with({
            color: this.options.properties.color
        });

    /* Default if true size specified */
    getSize() {
        return [ComponentHeight, ComponentHeight];
    }


    setContent(iconConstructor) {
        this.image.setContent(new iconConstructor({color: this.options.properties.color}).getContent());
    }

    setColor() {
        return this.image && this.image.changeColor(...arguments);
    }

    //TODO support this
    _setEnabled(enabled) {
        /* Pass false to parent button because we don't need the background to change, it is sufficient only to change the icon color */
        super._setEnabled(enabled, false);
        if (this.options.icon && this.image && this.image.changeColor) {
            this.image.changeColor(enabled ? this.options.properties.color : Colors.Gray);
        }
    }


    /* TODO 3: add _setEnabled method that changes image color if it's an icon */

}
