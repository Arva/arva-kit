import {BaseIcon}					from './views/BaseIcon.js';
import iconImage					from './resources/circlecross_default.svg.txt!text';

export class CirclecrossIcon extends BaseIcon {
    constructor(options){
        super({...options, icon: iconImage});
    }
 }