import { BaseText } from "./BaseModel";


export class ScheduleTask extends BaseText {
    start?: Date;
    end?: Date;

    constructor(title?: string, content: string = "", start?: Date, end?: Date) {
        super(title, content);
        this.start = start;
        this.end = end;
    }
};

export default class Schedule extends BaseText {
    tasks?: Array<ScheduleTask>;

    constructor(title?: string, content?: string, tasks?: Array<ScheduleTask>) {
        super(title, content);
        this.tasks = tasks;
    }
};
