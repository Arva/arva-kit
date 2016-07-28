import {BaseIcon}					from './views/BaseIcon.js';
import iconImage					from './resources/search2_default.svg.txt!text';

export class Search2Icon extends BaseIcon {
    constructor(options){
        super({...options, icon: iconImage});
    }
 }