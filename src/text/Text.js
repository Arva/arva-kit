/**
 * Created by tom on 08/06/15.
 */

import {Surface}        from 'arva-js/surfaces/Surface.js';
import {combineOptions}   from 'arva-js/utils/CombineOptions.js';
import {TextBody}         from '../defaults/DefaultTypefaces.js';

export class Text extends Surface {
    constructor(options){
        super(combineOptions(TextBody, options));
    }
}
