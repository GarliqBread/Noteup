import BaseModel, { BaseText } from "./BaseModel";
import { invoke } from '@tauri-apps/api/tauri';
import { FileResult } from "../types/Files";


export default class Alias extends BaseText {
    category?: AliasCategory;

    constructor(title?: string, content?: string, category?: AliasCategory) {
        super(title, content);
        this.category = category;
    }

    getAll(): Promise<Array<FileResult>> {
        return invoke('show_files', { directory: "/home/lucas/BashFast" })
    }
};

export class AliasCategory extends BaseModel {
    title: string;

    constructor(title: string) {
        super();
        this.title = title;
    }
};