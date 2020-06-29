export class Book {
    id: string;
    name: string;
    edition: string;
    authorId: string;

    get isValidName(): boolean {
        return this.name != null && this.name != '';
    }

    get isValidEdition(): boolean {
        return this.edition != null && this.edition != '';
    }

    get isValidAuthor(): boolean {
        return this.authorId != null && this.authorId != '';
    }
}