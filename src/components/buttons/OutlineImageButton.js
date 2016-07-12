/**
 * Created by lundfall on 12/07/16.
 */

import {ImageButton}            from './ImageButton.js';

/**
 * Created by lundfall on 12/07/16.
 */
import {View}               from 'arva-js/core/View.js';

import {combineOptions}     from 'arva-js/utils/CombineOptions.js';

import {layout, options}    from 'arva-js/layout/decorators.js';
import {Colors}             from '../../defaults/DefaultColors.js';
import {OutlineTextButton}  from './OutlineTextButton.js';

export class OutlineImageButton extends ImageButton {
    constructor(options) {
        super(combineOptions(OutlineTextButton.generateOptions(options), options));
    }
}