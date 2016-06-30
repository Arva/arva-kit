import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/arrowdown2_rounded_thin.svg';
        
        export class Arrowdown2Icon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }