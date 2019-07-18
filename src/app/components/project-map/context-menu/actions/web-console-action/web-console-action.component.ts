import { Component, Input } from "@angular/core";
import { Node } from '../../../../../cartography/models/node';
import { WebConsoleService } from '../../../../../services/web-console.service';

@Component({
    selector: 'app-web-console-action',
    templateUrl: './web-console-action.component.html'
})
export class WebConsoleActionComponent {
    @Input() node: Node;

    constructor(
        private webConsoleService: WebConsoleService
    ) {}

    startConsoleForNode() {
        this.webConsoleService.startConsoleForNode(this.node);
    }
}
