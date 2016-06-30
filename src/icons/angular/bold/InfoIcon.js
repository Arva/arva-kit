import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/info_angular_bold.svg';
        
        export class InfoIcon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }