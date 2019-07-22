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

@Component({
    selector: 'app-web-console',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './web-console.component.html',
    styleUrls: ['./web-console.component.scss']
})
export class WebConsoleComponent implements OnInit, OnDestroy {
    @ViewChild('terminal') terminalDiv: ElementRef;
    @Input() server: Server;
    @Input() project: Project;
    public node: Node;

    private subscriptions: Subscription[] = [];
    private ws: Subject<any>;
    private terminal: Terminal;
    
    constructor(
        private webConsoleService: WebConsoleService,
        private projectService: ProjectService
    ){}

    ngOnInit() {
        const subscription = this.webConsoleService.startConsole.subscribe((node: Node) => {
            this.terminal = new Terminal();
            this.terminal.open(this.terminalDiv.nativeElement);
            this.terminal.writeln(node.name + '>');

            this.node = node;

            this.ws = webSocket(this.projectService.notificationsPath(this.server, this.project.project_id));
            console.log(this.projectService.notificationsPath(this.server, this.project.project_id));
            this.ws = webSocket(this.webConsoleService.telnetPath(this.server, this.project.project_id, this.node.node_id));
            console.log(this.webConsoleService.telnetPath(this.server, this.project.project_id, this.node.node_id));
            //this.ws = webSocket(this.projectService.notificationsPath(this.server, this.project.project_id));
            const telnetSubscription = this.ws.subscribe((message: any) => {
                console.log(message);
            });
            this.subscriptions.push(telnetSubscription);
        });

        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }
}
