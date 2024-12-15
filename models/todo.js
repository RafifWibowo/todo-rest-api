class Todo {
  constructor(
    id,
    title,
    description,
    finished_at,
    created_at,
    updated_at,
    deleted_at
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.finished_at = finished_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

module.exports = Todo;
