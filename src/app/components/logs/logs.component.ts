import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogService } from '../../services/log.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logs-container">
      <h2>Logs em Tempo Real</h2>
      <div class="log" *ngFor="let log of logs">
        {{ log }}
      </div>
    </div>
  `,
  styles: [
    `
      .logs-container {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: 20px;
        border-radius: 10px;
        max-height: 500px;
        overflow-y: auto;
      }
      .log {
        border-bottom: 1px solid #444;
        padding: 5px;
        font-family: monospace;
      }
    `,
  ],
})
export class LogsComponent implements OnInit, OnDestroy {
  logs: string[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.logService.onMessage((message) => {
      this.logs.push(message);
    });
  }

  ngOnDestroy() {
    this.logService.close();
  }
}
