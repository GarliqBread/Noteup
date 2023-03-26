import { BaseText } from "./BaseModel";

export default class Task extends BaseText {
    taskStatus?: string;

    constructor(
        title?: string,
        content: string = "",
        taskStatus?: string,
    ) {
        super(
            title, content
        );
        this.taskStatus = taskStatus;
    }
};
