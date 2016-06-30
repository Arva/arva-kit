import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/location_angular_bold.svg';
        
        export class LocationIcon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }