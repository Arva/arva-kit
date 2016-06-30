import {BaseIcon}                  from '../../BaseIcon.js';
        import iconImage                   from '../../resources/download_rounded_bold.svg';
        
        export class DownloadIcon extends BaseIcon {
            constructor(options){
                super({...options, iconPath: iconImage});
            }
        }