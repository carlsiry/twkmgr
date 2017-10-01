
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MdIconRegistry, ds: DomSanitizer) => {
    const imgDir = 'assets/img';
    const sidebarDir = `${imgDir}/sidebar`;
    const daysDir = `${imgDir}/days`;
    ir.addSvgIcon('pen', ds.bypassSecurityTrustResourceUrl('assets/write.svg'));
    ir.addSvgIcon('day', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
    ir.addSvgIcon('month', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
    ir.addSvgIcon('project', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
    ir.addSvgIcon('projects', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
    ir.addSvgIcon('week', ds.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));
    for (let i = 1; i <= 31; i++ ) {
        ir.addSvgIcon(`day${i}`, ds.bypassSecurityTrustResourceUrl(`${daysDir}/day${i}.svg`));
    }
}
