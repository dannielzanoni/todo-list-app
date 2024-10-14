export class TodoItem {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public isFinished: boolean,
        public UserId: number
    ) { }
}
