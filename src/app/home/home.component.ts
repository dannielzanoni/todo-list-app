import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = [
    { id: 1, title: 'tarefa1', description: 'testedescricao 1 ', status: true },
    { id: 2, title: 'tarefa2', description: 'descricao 2 ', status: false },
    { id: 3, title: 'Tarefa 3', description: 'descricao 3', status: true }
  ];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  visible: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks(this.currentPage, this.itemsPerPage).subscribe((data: any) => {
      this.tasks = data.items;
      this.totalItems = data.totalItems;
    });
  }

  showDialog() {
    this.visible = true;
  }

  onPageChange(event: any) {
    this.currentPage = Math.floor(event.first / this.itemsPerPage) + 1;
    this.loadTasks();
  }


  getMenuItems(task: any): MenuItem[] {
    return [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.editTask(task)
      },
      {
        label: 'Excluir',
        icon: 'pi pi-trash',
        command: () => this.deleteTask(task.id)
      },
      {
        label: task.status ? 'Marcar como Pendente' : 'Marcar como Concluída',
        icon: task.status ? 'pi pi-times-circle' : 'pi pi-check-circle',
        command: () => this.toggleTaskStatus(task)
      }
    ];
  }

  //todo
  editTask(task: any) {
  }

  deleteTask(taskId: number) {
  }

  toggleTaskStatus(task: any) {
    task.status = !task.status;
  }
}
