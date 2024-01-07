export class Notice {
  title: string;
  notice: string;
  createdAt: string;
  editedAt: string;
  done: boolean;
  customerId: string;
  id: string;

  constructor(obj?: any) {
    this.title = obj ? obj.title : '';
    this.notice = obj ? obj.notice : '';
    this.createdAt = obj ? obj.createdAt : '';
    this.editedAt = obj ? obj.editedAt : '';
    this.done = obj ? obj.done : '';
    this.customerId = obj ? obj.customerId : '';
    this.id = obj ? obj.id : '';
  }

  public toJSON() {
    return {
      title: this.title,
      notice: this.notice,
      createdAt: this.createdAt,
      editedAt: this.editedAt,
      done: this.done,
      customerId: this.customerId,
      id: this.id,
    };
  }
}
