export class ComponentTab {
    private static _count: number = 0;

    id: number;
    component: any;
    name: string;
    restrictToSingleComponent: boolean = false;

    constructor() {
        this.id = ComponentTab._count;
        ComponentTab._count += 1;
    }

    get isVisible(): boolean {
        return this.component.isVisible;
    }
}