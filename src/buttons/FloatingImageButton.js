/**
 * Created by lundfall on 12/07/16.
 */
import {combineOptions}                 from 'arva-js/utils/CombineOptions.js';
import {Colors}                         from '../defaults/DefaultColors.js';
import {SolidTextButton}                from './SolidTextButton.js';
import {ImageButton}                    from './ImageButton.js';


export class FloatingImageButton extends ImageButton {
    constructor(options = {}) {
        super(combineOptions({
            ...SolidTextButton.generateOptions(options),
            backgroundProperties: { backgroundColor: Colors.PrimaryUIColor, borderRadius: '50%' }
        }, options));
    }
}
