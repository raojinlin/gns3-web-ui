import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Project } from '../../../models/project';
import { Server } from '../../../models/server';
import { ToolsService } from '../../../services/tools.service';
import { MapSettingsService } from '../../../services/mapsettings.service';
import { DrawingService } from '../../../services/drawing.service';
import { SymbolsDataSource } from '../../../cartography/datasources/symbols-datasource';
import * as svg from 'save-svg-as-png';
import { MapSymbolsDataSource } from '../../../cartography/datasources/map-datasource';
import { SymbolService } from '../../../services/symbol.service';


@Component({
    selector: 'app-project-map-menu',
    templateUrl: './project-map-menu.component.html',
    styleUrls: ['./project-map-menu.component.scss']
})
export class ProjectMapMenuComponent implements OnInit, OnDestroy {
    @Input() project: Project;
    @Input() server: Server;

    public selectedDrawing: string;
    public drawTools = {
        isRectangleChosen: false,
        isEllipseChosen: false,
        isLineChosen: false,
        isTextChosen: false
    };
    public isLocked: boolean = false;

    constructor(
        private toolsService: ToolsService,
        private mapSettingsService: MapSettingsService,
        private drawingService: DrawingService,
        private symbolsDataSource: SymbolsDataSource,
        private mapSymbolsDataSource: MapSymbolsDataSource,
        private symbolService: SymbolService
    ) {}

    ngOnInit() {}

    public takeScreenshot() {
        let splittedSvg = document.getElementsByTagName("svg")[0].outerHTML.split('image');
        let i = 1;
        let test = '';
        while (i < splittedSvg.length) {
            let splittedImage = splittedSvg[i].split("\"");
            let splittedUrl = splittedImage[1].split("/");

            this.symbolService.raw(this.server, splittedUrl[7]).subscribe((elem: string) => {
                let splittedElement = elem.split('-->');
                splittedSvg[i] = splittedElement[1];

                test = splittedElement[1];
                console.log(test);
            });

            i += 2;
        }
        let svgString = splittedSvg.join();
        svgString = test;

        // var parser = new DOMParser();
        // var doc = parser.parseFromString(document.getElementsByTagName("svg")[0].outerHTML, "text/html");

        var placeholder = document.createElement('div');
        placeholder.innerHTML = `
        <svg
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://web.resource.org/cc/"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        id="svg1998"
        sodipodi:version="0.32"
        inkscape:version="0.45"
        width="71.851372"
        height="32.285366"
        version="1.0"
        sodipodi:docname="sw_standard.svg"
        inkscape:output_extension="org.inkscape.output.svg.inkscape"
        sodipodi:modified="true">
       <metadata
          id="metadata2003">
         <rdf:RDF>
           <cc:Work
              rdf:about="">
             <dc:format>image/svg+xml</dc:format>
             <dc:type
                rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
             <dc:title>Switch</dc:title>
             <dc:creator>
               <cc:Agent>
                 <dc:title>Jeremy Grossmann</dc:title>
               </cc:Agent>
             </dc:creator>
             <dc:publisher>
               <cc:Agent>
                 <dc:title>GNS-3</dc:title>
               </cc:Agent>
             </dc:publisher>
             <dc:description>Created for the GNS-3 project (www.gns3.net)</dc:description>
             <cc:license
                rdf:resource="http://creativecommons.org/licenses/GPL/2.0/" />
           </cc:Work>
           <cc:License
              rdf:about="http://creativecommons.org/licenses/GPL/2.0/">
             <cc:permits
                rdf:resource="http://web.resource.org/cc/Reproduction" />
             <cc:permits
                rdf:resource="http://web.resource.org/cc/Distribution" />
             <cc:requires
                rdf:resource="http://web.resource.org/cc/Notice" />
             <cc:permits
                rdf:resource="http://web.resource.org/cc/DerivativeWorks" />
             <cc:requires
                rdf:resource="http://web.resource.org/cc/ShareAlike" />
             <cc:requires
                rdf:resource="http://web.resource.org/cc/SourceCode" />
           </cc:License>
         </rdf:RDF>
       </metadata>
       <defs
          id="defs2001">
         <linearGradient
            inkscape:collect="always"
            id="linearGradient6603">
           <stop
              style="stop-color:#506eaa;stop-opacity:1;"
              offset="0"
              id="stop6605" />
           <stop
              style="stop-color:#506eaa;stop-opacity:0;"
              offset="1"
              id="stop6607" />
         </linearGradient>
         <linearGradient
            id="linearGradient6587">
           <stop
              style="stop-color:#6e8caa;stop-opacity:1;"
              offset="0"
              id="stop6589" />
           <stop
              style="stop-color:#edeff3;stop-opacity:1;"
              offset="1"
              id="stop6591" />
         </linearGradient>
         <marker
            inkscape:stockid="Arrow2Lstart"
            orient="auto"
            refY="0"
            refX="0"
            id="Arrow2Lstart"
            style="overflow:visible">
           <path
              id="path11918"
              style="font-size:12px;fill-rule:evenodd;stroke-width:0.625;stroke-linejoin:round"
              d="M 8.7185878,4.0337352 L -2.2072895,0.016013256 L 8.7185884,-4.0017078 C 6.97309,-1.6296469 6.9831476,1.6157441 8.7185878,4.0337352 z "
              transform="matrix(1.1,0,0,1.1,1.1,0)" />
         </marker>
         <marker
            inkscape:stockid="Arrow1Send"
            orient="auto"
            refY="0"
            refX="0"
            id="Arrow1Send"
            style="overflow:visible">
           <path
              id="path11921"
              d="M 0,0 L 5,-5 L -12.5,0 L 5,5 L 0,0 z "
              style="fill-rule:evenodd;stroke:black;stroke-width:1pt;marker-start:none"
              transform="matrix(-0.2,0,0,-0.2,-1.2,0)" />
         </marker>
         <marker
            inkscape:stockid="Arrow1Lstart"
            orient="auto"
            refY="0"
            refX="0"
            id="Arrow1Lstart"
            style="overflow:visible">
           <path
              id="path11936"
              d="M 0,0 L 5,-5 L -12.5,0 L 5,5 L 0,0 z "
              style="fill-rule:evenodd;stroke:black;stroke-width:1pt;marker-start:none"
              transform="matrix(0.8,0,0,0.8,10,0)" />
         </marker>
         <linearGradient
            inkscape:collect="always"
            xlink:href="#linearGradient6587"
            id="linearGradient6593"
            x1="3.95626"
            y1="0.64267641"
            x2="-1.2664427"
            y2="0.62730032"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1.119123,0,0,1.09281,-7.833718e-3,-0.353953)" />
         <linearGradient
            inkscape:collect="always"
            xlink:href="#linearGradient6603"
            id="linearGradient6609"
            x1="2.2801981"
            y1="1.4519272"
            x2="-0.41311559"
            y2="1.4649135"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1.119124,0,0,1.09281,-7.8336875e-3,-0.353953)" />
         <linearGradient
            inkscape:collect="always"
            xlink:href="#linearGradient6587"
            id="linearGradient11856"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(15.191597,0,0,15.33747,-2.6428869,0.1648577)"
            x1="3.95626"
            y1="0.64267641"
            x2="-1.2664427"
            y2="0.62730032" />
       </defs>
       <sodipodi:namedview
          inkscape:window-height="979"
          inkscape:window-width="1400"
          inkscape:pageshadow="2"
          inkscape:pageopacity="0.0"
          guidetolerance="10.0"
          gridtolerance="10.0"
          objecttolerance="10.0"
          borderopacity="1.0"
          bordercolor="#666666"
          pagecolor="#ffffff"
          id="base"
          showguides="true"
          inkscape:guide-bbox="true"
          inkscape:zoom="15.791667"
          inkscape:cx="33.948451"
          inkscape:cy="19.90866"
          inkscape:window-x="0"
          inkscape:window-y="25"
          inkscape:current-layer="svg1998" />
       <path
          style="fill:#000000;fill-opacity:0.39215686;stroke:none;stroke-width:0.001"
          d="M 2.1663193,16.589602 L 2.1663193,32.285367 L 54.763443,32.285367 L 54.763443,16.589602 L 2.1663193,16.589602"
          id="path13703" />
       <path
          style="fill:#000000;fill-opacity:0.39215686;stroke:none;stroke-width:0.001"
          d="M 54.724715,18.919483 L 71.109211,3.1102265 L 71.109211,16.523256 L 54.724715,32.33251 L 54.724715,18.919483"
          id="path14592" />
       <path
          style="fill:#6e8296;fill-opacity:1;stroke:none;stroke-width:0.001"
          d="M 54.781867,16.528044 L 71.793065,0.13423853 L 71.793065,14.043216 L 54.781867,30.437021 L 54.781867,16.528044"
          id="path2009" />
       <path
          style="fill:#6e8caa;fill-opacity:1;stroke:none;stroke-width:0.00110589"
          d="M 0.21478248,16.474061 L 0.21478248,30.310372 L 55.069651,30.310372 L 55.069651,16.474061 L 0.21478248,16.474061"
          id="path2007" />
       <path
          style="fill:url(#linearGradient11856);fill-opacity:1;stroke:none;stroke-width:0.01505287;stroke-opacity:1"
          d="M 55.06494,16.770099 L 72.155489,0.17496232 L 16.934026,0.17496232 L -0.11094903,16.770099 L 55.06494,16.770099"
          id="path2013" />
       <path
          style="fill:#000000;stroke:none;stroke-width:0.001"
          d="M 34.445201,8.5762092 L 32.460781,10.520528 L 46.35171,10.520528 L 44.382325,13.007447 L 55.792729,10.038216 L 49.839474,7.5814414 L 48.336128,8.5762092 L 34.445201,8.5762092"
          id="path2017" />
       <path
          style="fill:#000000;stroke:none;stroke-width:0.001"
          d="M 41.390664,2.1403638 L 39.406245,4.1148268 L 53.312208,4.1148268 L 50.831684,6.5866738 L 62.738193,3.1502034 L 56.288834,0.64821244 L 55.326692,2.1403638 L 41.390664,2.1403638"
          id="path2019" />
       <path
          style="fill:#000000;stroke:none;stroke-width:0.001"
          d="M 29.469121,14.002214 L 31.49864,12.012679 L 17.066506,12.012679 L 19.562064,9.5408322 L 8.1065578,12.494991 L 14.08988,14.98191 L 15.097122,14.002214 L 29.469121,14.002214"
          id="path2021" />
       <path
          style="fill:#000000;stroke:none;stroke-width:0.001"
          d="M 35.948548,7.0539132 L 37.932966,5.1246667 L 24.027005,5.1246667 L 26.52256,2.6377476 L 14.585984,6.08929 L 21.035343,8.5762092 L 22.027552,7.0539132 L 35.948548,7.0539132"
          id="path2023" />
       <path
          style="fill:#ffffff;stroke:none;stroke-width:0.001"
          d="M 34.941305,9.028376 L 32.956886,11.017911 L 46.862849,11.017911 L 44.87843,13.489758 L 56.288834,10.520528 L 50.320547,8.0637529 L 48.847268,9.028376 L 34.941305,9.028376"
          id="path2025" />
       <path
          style="fill:#ffffff;stroke:none;stroke-width:0.001"
          d="M 41.901802,2.6377476 L 39.90235,4.5971384 L 53.808312,4.5971384 L 51.327789,7.0539132 L 63.249333,3.6023707 L 56.799974,1.1455961 L 55.792729,2.6377476 L 41.901802,2.6377476"
          id="path2027" />
       <path
          style="fill:#ffffff;stroke:none;stroke-width:0.001"
          d="M 29.965225,14.484526 L 31.949645,12.494991 L 17.577645,12.494991 L 20.028101,10.038216 L 8.6176958,13.007447 L 14.585984,15.479293 L 15.563159,14.484526 L 29.965225,14.484526"
          id="path2029" />
       <path
          style="fill:#ffffff;stroke:none;stroke-width:0.001"
          d="M 36.414585,7.5814414 L 38.429071,5.5919059 L 24.508076,5.5919059 L 27.003632,3.1502034 L 15.097122,6.5866738 L 21.546481,9.028376 L 22.508625,7.5814414 L 36.414585,7.5814414"
          id="path2031" />
     </svg>
        `;
        var element = placeholder.firstChild;
        svg.saveSvgAsPng(element, "plot.png");
    }

    public addDrawing(selectedObject: string) {
        switch (selectedObject) {
          case 'rectangle':
            this.drawTools.isTextChosen = false;
            this.drawTools.isEllipseChosen = false;
            this.drawTools.isRectangleChosen = !this.drawTools.isRectangleChosen;
            this.drawTools.isLineChosen = false;
            break;
          case 'ellipse':
            this.drawTools.isTextChosen = false;
            this.drawTools.isEllipseChosen = !this.drawTools.isEllipseChosen;
            this.drawTools.isRectangleChosen = false;
            this.drawTools.isLineChosen = false;
            break;
          case 'line':
            this.drawTools.isTextChosen = false;
            this.drawTools.isEllipseChosen = false;
            this.drawTools.isRectangleChosen = false;
            this.drawTools.isLineChosen = !this.drawTools.isLineChosen;
            break;
          case 'text':
            this.drawTools.isTextChosen = !this.drawTools.isTextChosen;
            this.drawTools.isEllipseChosen = false;
            this.drawTools.isRectangleChosen = false;
            this.drawTools.isLineChosen = false;
            this.toolsService.textAddingToolActivation(this.drawTools.isTextChosen);
            break;
        }
    
        this.selectedDrawing = this.selectedDrawing === selectedObject ? '' : selectedObject;
    }

    public onDrawingSaved() {
        this.resetDrawToolChoice();
      }

    public resetDrawToolChoice() {
        this.drawTools.isRectangleChosen = false;
        this.drawTools.isEllipseChosen = false;
        this.drawTools.isLineChosen = false;
        this.drawTools.isTextChosen = false;
        this.selectedDrawing = '';
        this.toolsService.textAddingToolActivation(this.drawTools.isTextChosen);
    }

    public changeLockValue() {
        this.isLocked = !this.isLocked;
        this.mapSettingsService.changeMapLockValue(this.isLocked);
    }

    public uploadImageFile(event) {
        this.readImageFile(event.target);
    }
    
    private readImageFile(fileInput) {
        let file: File = fileInput.files[0];
        let fileReader: FileReader = new FileReader();
        let imageToUpload = new Image();
    
        fileReader.onloadend = () => {
            let image = fileReader.result;
            let svg = this.createSvgFileForImage(image, imageToUpload);
            this.drawingService.add(this.server, this.project.project_id, -(imageToUpload.width/2), -(imageToUpload.height/2), svg).subscribe(() => {});
        }
            
        imageToUpload.onload = () => { fileReader.readAsDataURL(file) };
        imageToUpload.src = window.URL.createObjectURL(file);
    }

    private createSvgFileForImage(image: string|ArrayBuffer, imageToUpload: HTMLImageElement) {
        return `<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" height=\"${imageToUpload.height}\" 
                width=\"${imageToUpload.width}\">\n<image height=\"${imageToUpload.height}\" width=\"${imageToUpload.width}\" xlink:href=\"${image}\"/>\n</svg>`
    }

    ngOnDestroy() {}
}
