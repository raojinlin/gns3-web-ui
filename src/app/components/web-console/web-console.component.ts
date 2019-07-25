import { Component, OnInit, ViewEncapsulation, OnDestroy, Input, ElementRef, ViewChild } from '@angular/core';
import { Node } from '../../cartography/models/node';
import { Terminal } from 'xterm';
import { Server } from '../../models/server';
import { Project } from '../../models/project';
import { WebConsoleService } from '../../services/web-console.service';
import { Subscription, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { WebServiceMessage } from '../../handlers/project-web-service-handler';
import { ProjectService } from '../../services/project.service';
import { ToasterService } from '../../services/toaster.service';
import { delay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface NodeConsole {
    id: number,
    node: Node,
    webSocket: WebSocket
}

@Component({
    selector: 'app-web-console',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './web-console.component.html',
    styleUrls: ['./web-console.component.scss']
})
export class WebConsoleComponent implements OnInit, OnDestroy {
    @ViewChild('tab') matTab: ElementRef;
    @Input() server: Server;
    @Input() project: Project;

    public nodeConsoles: NodeConsole[] = [];
    private subscriptions: Subscription[] = [];
    private terminal: Terminal;
    private nodeCounter: number = 0;

    tabs = [];
    selected = new FormControl(0);
    
    constructor(
        private webConsoleService: WebConsoleService,
        private projectService: ProjectService,
        private toasterService: ToasterService
    ) {}

    ngOnInit() {
        const subscription = this.webConsoleService.startConsole.subscribe((node: Node) => {
            // this.terminal = new Terminal();
            // this.terminal.open(this.terminalDiv.nativeElement);
            // this.terminal.writeln(node.name + '>');

            let ws = new WebSocket(this.webConsoleService.telnetPath(this.server, this.project.project_id, node.node_id));

            ws.onopen = async (ev: Event) => {
                ws.send('message');
            };

            ws.onmessage = (ev: Event) => {
                console.log("Received message", ev);
            };

            ws.onerror = (ev: Event) => {
                this.toasterService.error('Connection to host lost.');
            };

            ws.onclose = (ev: Event) => {
                this.toasterService.success('Connection to host closed.');
            };

            this.nodeCounter++;
            let nodeConsole : NodeConsole = {
                id: this.nodeCounter,
                node: node,
                webSocket: ws
            }
            this.nodeConsoles.push(nodeConsole);
            this.openNewTab(node);
        });

        this.subscriptions.push(subscription);
    }

    openNewTab(node: Node) {
        this.tabs.push(node.name);
        this.selected.setValue(this.tabs.length - 1);
    }

    closeTab(index: number) {
        this.tabs.splice(index, 1);
        this.nodeConsoles[index].webSocket.close();
        this.nodeConsoles.splice(index, 1);

        if (this.tabs.length === 0) {
            this.webConsoleService.isConsoleOpen.emit(false);
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}
