import { Injectable, EventEmitter } from "@angular/core";
import { HttpServer } from './http-server.service';
import { Server } from '../models/server';
import { Node } from '../cartography/models/node';

@Injectable()
export class WebConsoleService {
    constructor(private httpServer: HttpServer){}

    isOpen = false;
    isConsoleOpen: EventEmitter<boolean> = new EventEmitter();
    startConsole: EventEmitter<Node> = new EventEmitter();

    startConsoleForNode(node: Node) {
        if(!this.isOpen) {
            this.toggle();
        }
        this.startConsole.emit(node);
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.isConsoleOpen.emit(this.isOpen);
    }

    telnetPath(server: Server, project_id: string, node_id: string): string {
        return `ws://${server.host}:${server.port}/v2/projects/${project_id}/nodes/${node_id}/telnet/ws`;
    }
}
