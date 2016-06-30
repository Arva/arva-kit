import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/arrowdown_angular_bold.svg';
        
        export class ArrowdownIcon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }