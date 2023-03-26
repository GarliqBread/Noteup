import { BaseText } from "./BaseModel";


export default class ProsCons extends BaseText {
    pros?: Array<string>;
    cons?: Array<string>;

    constructor(title: string, content: string = "", pros: Array<string> = [""], cons: Array<string> = [""]) {
        super(title, content);
        this.pros = pros;
        this.cons = cons;
    }

    private createNewMap(newMap: any, key: string, value: any): void {
        if (key === "pros" || key === "cons") {
            value = value.join()
        }
        newMap[key] = value;
    }

    public override getCreateData(): any {
        let createdData = {};
        Object.entries(this).forEach(([key, value]) => this.createNewMap(createdData, key, value));
        return createdData
    }
};
