export default function todoItem(title, description = null, due = null, priority = null) {
    return { title, description, due, priority };
}