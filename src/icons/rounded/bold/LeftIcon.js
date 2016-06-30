import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/left_rounded_bold.svg';
        
        export class LeftIcon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }