import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MenuItem } from 'primeng/api';
import { TodoItem } from '../model/todo-item';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks: TodoItem[] = [];
  paginatedTasks: TodoItem[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  visible: boolean = false;
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  tableHeight: string = '450px';
  editDialogVisible = false;
  selectedTask: any = {
    title: '',
    description: '',
    completed: false
  };
  selectedAction: string | null = null;
  confirmationDialogVisible = false;
  taskIdToDelete: number | null = null;

  constructor(private taskService: TaskService, private authService: AuthService) { }

  ngOnInit() {
    this.loadTasks();
  }

  showDialog() {
    this.visible = true;
    this.newTaskTitle = '';
    this.newTaskDescription = '';
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.updatePaginatedTasks();
  }

  updatePaginatedTasks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTasks = this.tasks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        console.log(data);
        if (Array.isArray(data)) {
          this.tasks = data;
          this.totalItems = this.tasks.length;
        } else if (data.message === "Nenhuma tarefa encontrada.") {
          this.tasks = [];
          this.totalItems = 0;
        }
        this.updatePaginatedTasks();
      },
      error: (err) => {
        console.error('Error loading tasks', err);
      }
    });
  }

  getDropdownOptions(task: any): any[] {
    return [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        value: 'edit'
      },
      {
        label: 'Excluir',
        icon: 'pi pi-trash',
        value: 'delete'
      },
      {
        label: task.status ? 'Marcar como Pendente' : 'Marcar como Concluída',
        icon: task.status ? 'pi pi-times-circle' : 'pi pi-check-circle',
        value: 'toggle'
      }
    ];
  }

  handleDropdownChange(event: any, task: TodoItem) {
    this.selectedAction = event.value;

    switch (this.selectedAction) {
      case 'edit':
        this.editTask(task);
        this.selectedAction = null;
        break;
      case 'delete':
        this.deleteTask(task.id);
        this.selectedAction = null;
        break;
      case 'toggle':
        this.toggleTaskStatus(task);
        this.selectedAction = null;
        break;
    }
  }

  createTask() {
    const newTask: TodoItem = new TodoItem(0, this.newTaskTitle, this.newTaskDescription, false, 0);

    this.taskService.createTask(newTask).subscribe({
      next: (response) => {
        console.log('Tarefa criada com sucesso', response);
        this.visible = false;
        this.loadTasks();
      },
      error: (err) => {
        console.error('Erro ao criar a tarefa', err);
      }
    });
  }

  editTask(task: TodoItem) {
    this.editDialogVisible = true;
    this.selectedTask = { ...task };
  }

  updateTask() {
    if (this.selectedTask) {
      this.taskService.updateTask(this.selectedTask).subscribe({
        next: (response) => {
          console.log('Tarefa editada com sucesso', response);
          this.editDialogVisible = false;
          this.loadTasks();
        },
        error: (err) => {
          console.error('Erro ao editar a tarefa', err);
        }
      });
    }
  }

  showEditDialog(task: any) {
    this.selectedTask = { ...task };
    this.editDialogVisible = true;
  }

  confirmDelete() {
    if (this.taskIdToDelete !== null) {
      this.taskService.deleteTask(this.taskIdToDelete).subscribe({
        next: () => {
          this.loadTasks();
          this.confirmationDialogVisible = false;
        },
        error: (err) => {
          console.error(err);
          this.confirmationDialogVisible = false;
        }
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskIdToDelete = taskId;
    this.confirmationDialogVisible = true;
  }

  toggleTaskStatus(task: any) {
    task.status = !task.status;
  }

  setTableHeight() {
    if (this.paginatedTasks.length === 0) {
      this.tableHeight = '100px';
    } else if (this.paginatedTasks.length < this.itemsPerPage) {
      console.log("sexo")
      this.tableHeight = '600px';
    } else {
      this.tableHeight = 'auto';
    }
  }

  resetDropdown() {
    this.selectedAction = "Ações";
  }

  closeDialog() {
    this.editDialogVisible = false;
    this.selectedAction = "Ações";
  }

  resetConfirmationDialog() {
    this.taskIdToDelete = null;
    this.selectedAction = "Ações";
  }
}
