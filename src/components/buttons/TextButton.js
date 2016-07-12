/**
 * Created by lundfall on 12/07/16.
 */

import Surface              from 'famous/core/Surface.js';
import {View}               from 'arva-js/core/View.js';

import {combineOptions}     from 'arva-js/utils/CombineOptions.js';

import {layout, options}    from 'arva-js/layout/decorators.js';
import {Button}             from './Button.js';
import {UIButtonPrimary}    from '../../defaults/DefaultTypefaces.js';

export class TextButton extends Button {
    @layout.translate(0, 0, 30)
    @layout.dock('top')
    @layout.size(~300, undefined)
    @layout.origin(0.5, 0)
    @layout.align(0.5, 0)
    text = new Surface(this.options);

    constructor(options){
        super(combineOptions({
            disabledOptions: {
                content: options.content
            },
            properties: UIButtonPrimary.properties
        }, options));
        this.layout.on('layoutstart', ({size}) => {
            let newLineHeight = size[1] + 'px';
            let {text} = this;
            if (text.getProperties().lineHeight !== newLineHeight) {
                text.setProperties({
                    lineHeight: newLineHeight
                });
            }
        });

    }

    _setEnabled(enabled) {
        super._setEnabled(enabled);
        var options = this.options;
        this.text.setOptions(enabled ? options : options.disabledOptions);
    }
}