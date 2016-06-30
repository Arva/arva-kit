import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/minus_angular_bold.svg';
        
        export class MinusIcon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }