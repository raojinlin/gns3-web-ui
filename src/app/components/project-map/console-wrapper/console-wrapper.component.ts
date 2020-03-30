import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../../../models/project';
import { Server } from '../../../models/server';
import { ResizeEvent } from 'angular-resizable-element';
import { ThemeService } from '../../../services/theme.service';
import { FormControl } from '@angular/forms';
import { NodeConsoleService } from '../../../services/nodeConsole.service';
import { Node } from '../../../cartography/models/node';


@Component({
    selector: 'app-console-wrapper',
    templateUrl: './console-wrapper.component.html',
    styleUrls: ['./console-wrapper.component.scss']
})
export class ConsoleWrapperComponent implements OnInit {
    @Input() server: Server;
    @Input() project: Project;
    @Output() closeConsole =  new EventEmitter<boolean>();

    filters: string[] = ['all', 'errors', 'warnings', 'info', 'map updates', 'server requests'];
    selectedFilter: string = 'all';

    public style: object = {};
    public isDraggingEnabled: boolean = false;
    public isLightThemeEnabled: boolean = false;

    constructor(
        private consoleService: NodeConsoleService,
        private themeService: ThemeService
    ) {}

    nodes: Node[] = [];
    selected = new FormControl(0);
    
    ngOnInit() {
        this.themeService.getActualTheme() === 'light' ? this.isLightThemeEnabled = true : this.isLightThemeEnabled = false; 
        this.style = { bottom: '20px', left: '20px', width: `${this.consoleService.defaultConsoleWidth}px`, height: `${this.consoleService.defaultConsoleHeight + 48}px`};

        this.consoleService.nodeConsoleTrigger.subscribe((node) => {
            this.addTab(node, true);
        });

        this.consoleService.closeNodeConsoleTrigger.subscribe((node) => {
            let index = this.nodes.findIndex(n => n.node_id === node.node_id)
            this.removeTab(index);
        });
    }

    addTab(node: Node, selectAfterAdding: boolean) {
        this.nodes.push(node);

        if (selectAfterAdding) {
            this.selected.setValue(this.nodes.length);
        }
    }

    removeTab(index: number) {
        this.nodes.splice(index, 1);
    }

    toggleDragging(value: boolean) {
        this.isDraggingEnabled = value;
    }

    dragWidget(event) {
        let x: number = Number(event.movementX);
        let y: number = Number(event.movementY);

        let width: number = Number(this.style['width'].split('px')[0]);
        let height: number = Number(this.style['height'].split('px')[0]);
        let left: number = Number(this.style['left'].split('px')[0]) + x;
        if (this.style['top']) {
            let top: number = Number(this.style['top'].split('px')[0]) + y;
            this.style = {
                position: 'fixed',
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`
            };
        } else {
            let bottom: number = Number(this.style['bottom'].split('px')[0]) - y;
            this.style = {
                position: 'fixed',
                left: `${left}px`,
                bottom: `${bottom}px`,
                width: `${width}px`,
                height: `${height}px`
            };
        }
    }

    validate(event: ResizeEvent): boolean {
        // if (
        //     event.rectangle.width &&
        //     event.rectangle.height &&
        //     (event.rectangle.width < 720 ||
        //     event.rectangle.height < 456)
        // ) {
        //     return false;
        // }
        return true;
    }

    onResizeEnd(event: ResizeEvent): void {
        let width = Math.round(event.rectangle.width / this.consoleService.getLineWidth()) * this.consoleService.getLineWidth();
        let height = Math.round((event.rectangle.height - 48) / this.consoleService.getLineHeight()) * this.consoleService.getLineHeight();

        this.style = {
            position: 'fixed',
            left: `${event.rectangle.left}px`,
            top: `${event.rectangle.top}px`,
            width: `${width}px`,
            height: `${height}px`
        };

        this.consoleService.resizeTerminal({
            numberOfColumns: Math.round(event.rectangle.width / this.consoleService.getLineWidth()),
            numberOfRows: Math.round((event.rectangle.height - 48) / this.consoleService.getLineHeight())
        });
    }

    close() {
        this.closeConsole.emit(false);
    }
}
